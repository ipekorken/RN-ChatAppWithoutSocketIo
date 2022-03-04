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

const ChatMainScreen = ({navigation}) => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      img: require('../assets/images/orangeCircle.png'),
      conversationName: 'conversationName1',
    },
    {
      id: 2,
      img: require('../assets/images/greyCircle.png'),
      conversationName: 'conversationName2',
    },
    {
      id: 3,
      img: require('../assets/images/greenCircle.png'),
      conversationName: 'conversationName3',
    },
    {
      id: 4,
      img: require('../assets/images/orangeCircle.png'),
      conversationName: 'conversationName4',
    },
    {
      id: 5,
      img: require('../assets/images/greyCircle.png'),
      conversationName: 'conversationName5',
    },
    {
      id: 6,
      img: require('../assets/images/greenCircle.png'),
      conversationName: 'conversationName6',
    },
  ]);

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
          {conversations.map((item, index) => (
            <View key={index} style={styles.chatSubContainer}>
              <View style={styles.imgView}>
                <Image source={item.img} />
              </View>
              <View style={styles.msgView}>
                <Text style={styles.msgTxt}>{item.conversationName}</Text>
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
