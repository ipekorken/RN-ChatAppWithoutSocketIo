import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedUsers, setUsers} from '../@redux/app/actions';
import {apiUrl} from '../apis';
import {GreenCheck, GreyCheck} from '../components';

const CreateGroup = ({navigation}) => {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.app.userToken);
  const selectedUsers = useSelector(state => state.app.selectedUsers);
  const users = useSelector(state => state.app.users);
  const [selectList, setSelectList] = useState([]);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  const showAlert = (errTitle, errInfo) => {
    Alert.alert(errTitle, errInfo, [{text: 'OK'}]);
  };

  const registerAlert = (errTitle, errInfo) => {
    Alert.alert(errTitle, errInfo, [
      {
        text: 'OK',
        onPress: () =>
          setTimeout(() => {
            navigation.navigate('ChatMainScreen');
          }, 500),
      },
    ]);
  };

  function createGroup() {
    if (name !== '') {
      var data = JSON.stringify({
        groupName: name,
        members: selectedUsers,
      });
      `${apiUrl}:3000/api/groups/addGroup`;
      var config = {
        method: 'post',
        url: `${apiUrl}:3000/api/groups/addGroup`,
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setTimeout(() => {
            navigation.navigate('ChatMainScreen');
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      showAlert('Creating group is failed', 'Please fill the blanks!');
    }
  }

  function goChatMainScreen() {
    navigation.navigate('ChatMainScreen');
  }

  const addUserToGroup = id => {
    getUserList();
    if (!selectedUsers.includes(id)) {
      selectList.push(id);
      dispatch(setSelectedUsers(selectList));
    } else {
      for (var i = 0; i < selectList.length; i++) {
        if (selectList[i] === id) {
          selectList.splice(i, 1);
          dispatch(setSelectedUsers(selectList));
          getUserList();
        }
      }
    }
  };

  function getUserList() {
    var config = {
      method: 'get',
      url: `${apiUrl}:3000/api/users`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        dispatch(setUsers(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserList();
  }, []);

  const renderUsers = ({item}) => {
    return (
      <View style={styles.renderUserScreen}>
        <View style={styles.userImgView}>
          <Image
            style={styles.userImg}
            source={require('../assets/images/orangeCircle.png')}
          />
        </View>
        <View style={styles.userNameView}>
          <Text style={styles.userNameTxt}>
            {item.name} {item.surname}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setUserId(item._id);
            addUserToGroup(item._id);
          }}>
          {!selectedUsers.includes(item._id) ? <GreyCheck /> : <GreenCheck />}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={'lightblue'} />

      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Group Name"
            onChangeText={text => setName(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      <View style={styles.flatView}>
        <FlatList
          data={users}
          keyExtractor={(item, index) => item._id}
          renderItem={renderUsers}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={createGroup} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Create Group</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goChatMainScreen} style={styles.btnTouch}>
          <Text style={[styles.btnTxt, {color: 'red'}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  inputContainer: {
    padding: 20,
    margin: 20,
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: 'lightblue',
    opacity: 0.7,
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 50,
    width: '100%',
  },
  input: {
    color: 'black',
    fontSize: 20,
  },
  flatView: {
    height: 350,
    backgroundColor: '#ECECEC',
    padding: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
  },
  btnContainer: {
    alignItems: 'center',
  },
  btnTouch: {
    marginTop: 10,
  },
  btnTxt: {
    fontSize: 20,
  },
  renderUserScreen: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  userImgView: {},
  userImg: {},
  userNameView: {
    marginLeft: 10,
    width: 240,
    height: 50,
    justifyContent: 'center',
  },
  userNameTxt: {},
  checkBoxTouch: {
    borderWidth: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  checkBoxView: {
    width: 20,
    height: 20,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
