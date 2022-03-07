import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setGroups} from '../@redux/app/actions';
import axios from 'axios';
import {apiUrl} from '../apis';

const ChatMainScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.app.userToken);
  const groups = useSelector(state => state.app.groups);
  console.log('groups: ', groups);

  function getGroupList() {
    var config = {
      method: 'get',
      url: `${apiUrl}:3000/api/groups`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(setGroups(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getGroupList();
  }, []);

  function createChat() {
    navigation.navigate('CreateChat');
  }
  function createGroupChat() {
    navigation.navigate('CreateGroupChat');
  }

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={'lightblue'} />
      <View style={styles.chatContainer}>
        <ScrollView>
          {groups?.map((item, index) => (
            <View key={index} style={styles.chatSubContainer}>
              <View style={styles.imgView}>
                <Image source={require('../assets/images/orangeCircle.png')} />
              </View>
              <View style={styles.msgView}>
                <Text style={styles.msgTxt}>{item.groupName}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={createChat}>
          <View style={styles.btnView}>
            <Text style={styles.btnTxt}>Create Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={createGroupChat}>
          <View style={styles.btnView}>
            <Text style={styles.btnTxt}>Create Group</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatMainScreen;

const styles = StyleSheet.create({
  screen: {},
  chatContainer: {
    backgroundColor: '#ECECEC',
    padding: 20,
    margin: 20,
    height: '94%',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  chatSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {},
  msgView: {
    width: '50%',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
  },
  msgTxt: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  btnContainer: {
    position: 'absolute',
    marginLeft: 275,
    marginTop: 22,
  },
  btnView: {
    backgroundColor: 'lightblue',
    height: 50,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginTop: 5,
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
  },
});
