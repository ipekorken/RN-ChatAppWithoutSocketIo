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
  const userInfo = useSelector(state => state.app.userInfo);
  const groups = useSelector(state => state.app.groups);

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
        //console.log(JSON.stringify(response.data));
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
  function goConversation(id) {
    navigation.navigate('Conversation', {
      groupId: id,
    });
  }
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={'lightblue'} />
      <View style={styles.chatContainer}>
        <ScrollView>
          {groups?.map((item, index) => (
            <View key={index}>
              {item.members.includes(userInfo._id) ? (
                <View style={styles.chatSubContainer}>
                  <View style={styles.imgView}>
                    <Image
                      source={require('../assets/images/orangeCircle.png')}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.msgView}
                    onPress={() => goConversation(item._id)}>
                    <View>
                      <Text style={styles.msgTxt}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
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
          <View style={[styles.btnView, {marginTop: 10}]}>
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
    width: '35%',
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
    marginLeft: 230,
    marginTop: 22,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnView: {
    backgroundColor: 'lightblue',
    height: 50,
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  btnTxt: {
    color: 'white',
    fontSize: 16,
  },
});
