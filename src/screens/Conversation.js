import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setUsers, setMessages} from '../@redux/app/actions';
import {apiUrl} from '../apis';

const Conversation = ({navigation, route}) => {
  const flatListRef = useRef();
  const {groupId} = route.params;
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.app.userToken);
  const userInfo = useSelector(state => state.app.userInfo);
  const users = useSelector(state => state.app.users);
  const messages = useSelector(state => state.app.messages);
  const [inputMsg, setInputMsg] = useState('');

  //getMessageList fonksiyonunu sürekli yeniliyor.
  useEffect(() => {
    const interval = setInterval(getMessageList, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const showAlert = (errTitle, errInfo) => {
    Alert.alert(errTitle, errInfo, [{text: 'OK'}]);
  };

  function sendMsg() {
    if (inputMsg !== '') {
      var data = JSON.stringify({
        groupId: groupId,
        userId: userInfo._id,
        message: inputMsg,
      });

      var config = {
        method: 'post',
        url: `${apiUrl}:3000/api/messages/sendMessage`,
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));
          setInputMsg('');
          getMessageList();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      showAlert('Mesaj gönderilemedi', 'Please fill the blanks!');
    }
  }

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
  function getMessageList() {
    var config = {
      method: 'get',
      url: `${apiUrl}:3000/api/messages`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        dispatch(setMessages(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserList();
    getMessageList();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'lightblue'} />
      <View style={styles.screen}>
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => item._id}
            ref={flatListRef}
            renderItem={({item}) => {
              return (
                <View>
                  {groupId == item.groupId ? (
                    <View style={styles.chatSubContainer}>
                      <View style={styles.imgView}>
                        <Image source={item.img} />
                      </View>
                      <View
                        style={[
                          styles.msgView,
                          users.find(u => u._id == item.userId).name ==
                          userInfo.name
                            ? {marginLeft: '50%'}
                            : {marginLeft: 0},
                        ]}>
                        <Text
                          style={[
                            styles.userNameTxt,
                            users.find(u => u._id == item.userId).name ==
                            userInfo.name
                              ? {
                                  color: '#B64A1D',
                                }
                              : {color: '#D12C0D'},
                          ]}>
                          {users.find(u => u._id == item.userId).name}{' '}
                          {users.find(u => u._id == item.userId).surname}
                        </Text>
                        <Text style={styles.msgTxt}>{item.message}</Text>
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              );
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Mesaj girin..."
              value={inputMsg}
              onChangeText={inputMsg => setInputMsg(inputMsg)}
            />
          </View>
          <TouchableOpacity onPress={sendMsg}>
            <View style={styles.btnView}>
              <Text style={styles.btnTxt}>Gönder</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.pop()}>
          <Text style={styles.backBtnTxt}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  screen: {},
  chatContainer: {
    height: 300,
    backgroundColor: '#ECECEC',
    padding: 20,
    margin: 20,
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
  userNameTxt: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  msgTxt: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    width: '100%',
  },
  inputView: {
    backgroundColor: '#ECECEC',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 50,
    width: '78%',
  },
  input: {},
  btnView: {
    backgroundColor: 'lightblue',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  btnTxt: {},
  backBtn: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  backBtnTxt: {
    fontSize: 20,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey',
  },
});
