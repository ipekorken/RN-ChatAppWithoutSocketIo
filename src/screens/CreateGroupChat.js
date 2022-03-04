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
//import {useDispatch, useSelector} from 'react-redux';
//import {setSelectedUsers} from '../@redux/app/actions';
import {apiUrl} from '../apis';
import {GreenCheck, GreyCheck} from '../components';

const CreateGroup = ({navigation}) => {
  //const dispatch = useDispatch();
  //const selectedUsers = useSelector(state => state.app.selectedUsers);
  const [name, setName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [addButtonView, setAddButtonView] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      userName: 'user1',
      img: require('../assets/images/orangeCircle.png'),
    },
    {
      id: 2,
      userName: 'user2',
      img: require('../assets/images/orangeCircle.png'),
    },
    {
      id: 3,
      userName: 'user3',
      img: require('../assets/images/orangeCircle.png'),
    },
    {
      id: 4,
      userName: 'user4',
      img: require('../assets/images/orangeCircle.png'),
    },
    {
      id: 5,
      userName: 'user5',
      img: require('../assets/images/orangeCircle.png'),
    },
  ]);

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
      let data = JSON.stringify({
        name: name,
        img: require('../assets/images/greenCircle.png'),
        users: selectedUsers,
      });

      let config = {
        method: 'post',
        url: `${apiUrl}:3000/api/users/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(response => {
          //console.log(JSON.stringify(response.data));
          if (response.data.message == undefined) {
            registerAlert('You created a group successfully', '');
          } else {
            showAlert('Creating group is failed', response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      showAlert('Creating group is failed', 'Please fill the blanks!');
    }
  }

  function goChatMainScreen() {
    navigation.navigate('ChatMainScreen');
  }

  function saveSelectedUser(id) {
    console.log(selectedUsers);
    if (!selectedUsers.includes(id)) {
      selectedUsers.push(id);
      console.log('ekleme', selectedUsers);
    } else {
      for (var i = 0; i < selectedUsers.length; i++) {
        if (selectedUsers[i] === id) {
          selectedUsers.splice(i, 1);
          console.log('çıkarma', selectedUsers);
        }
      }
    }
    console.log(selectedUsers);
  }

  // useEffect(userId => {
  //   const selectedList = [];
  //   setAddButtonView([]);
  //   if (!selectedUsers.includes(userId)) {
  //     selectedList.push(userId);
  //   }
  //   setAddButtonView(selectedList);
  // }, []);

  // const changeAddButton = button => {
  //   if (addButtonView.includes(button)) {
  //     //çıkarma
  //     //setAddButtonView([]);
  //     let array = addButtonView;
  //     for (var i = 0; i < array.length; i++) {
  //       if (array[i] === button) {
  //         array.pop(i);
  //       }
  //     }
  //     setAddButtonView(array);
  //   } else {
  //     //ekleme
  //     const buttons = [...addButtonView, button];
  //     setAddButtonView(buttons);
  //   }
  // };

  useEffect(() => {
    const a = [];
    for (var i = 0; i < users.length; i++) {
      a.push(false);
    }
    setSelectedState(a);
  }, []);

  const renderUsers = ({item}) => {
    return (
      <View style={styles.renderUserScreen}>
        <View style={styles.userImgView}>
          <Image style={styles.userImg} source={item.img} />
        </View>
        <View style={styles.userNameView}>
          <Text style={styles.userNameTxt}>{item.userName}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            //saveSelectedUser(item.id);
            console.log(users.indexOf(item));
            //changeAddButton(item.id);
            //setUserId(item.id);
          }}>
          <Text>dsads</Text>
          {/* {!addButtonView.includes(item.id) ? <GreyCheck /> : <GreenCheck />} */}
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
      <View>
        <FlatList
          data={users}
          keyExtractor={(item, index) => item.id}
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
    backgroundColor: '#ECECEC',
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
  },
  inputContainer: {},
  inputView: {
    backgroundColor: 'lightblue',
    opacity: 0.7,
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 50,
    width: '100%',
    marginTop: 10,
  },
  input: {
    color: 'black',
    fontSize: 20,
  },
  btnContainer: {
    marginTop: 20,
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
