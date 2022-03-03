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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Conversation = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      msg: 'msg1',
      img: require('../assets/images/orangeCircle.png'),
      userName: 'user1',
    },
    {
      id: 2,
      msg: 'msg2',
      img: require('../assets/images/greyCircle.png'),
      userName: 'user2',
    },
    {
      id: 3,
      msg: 'msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3msg3',
      img: require('../assets/images/greenCircle.png'),
      userName: 'user3',
    },
    {
      id: 4,
      msg: 'msg4',
      img: require('../assets/images/orangeCircle.png'),
      userName: 'user4',
    },
    {
      id: 5,
      msg: 'msg5',
      img: require('../assets/images/greyCircle.png'),
      userName: 'user5',
    },
    {
      id: 6,
      msg: 'msg6msg6msg6msg6',
      img: require('../assets/images/greenCircle.png'),
      userName: 'user6',
    },
    {
      id: 7,
      msg: 'msg7',
      img: require('../assets/images/orangeCircle.png'),
      userName: 'user7',
    },
    {
      id: 8,
      msg: 'msg8',
      img: require('../assets/images/greyCircle.png'),
      userName: 'user8',
    },
    {
      id: 9,
      msg: 'msg9msg9msg9msg9',
      img: require('../assets/images/greenCircle.png'),
      userName: 'user9',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  function sendMsg() {
    setInputMsg('');
    console.log('send msg');
  }

  const colors = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
  ];

  return (
    <>
      <KeyboardAwareScrollView>
        <StatusBar backgroundColor={'lightblue'} />
        <View style={styles.screen}>
          <View style={styles.chatContainer}>
            <ScrollView>
              {messages.map((item, index) => (
                <View key={index} style={styles.chatSubContainer}>
                  <View style={styles.imgView}>
                    <Image source={item.img} />
                  </View>
                  <View style={styles.msgView}>
                    <Text
                      style={[
                        styles.userNameTxt,
                        {
                          color:
                            colors[Math.floor(Math.random() * colors.length)],
                        },
                      ]}>
                      {item.userName}
                    </Text>
                    <Text style={styles.msgTxt}>{item.msg}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
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
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  screen: {},
  chatContainer: {
    height: 500,
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
});
