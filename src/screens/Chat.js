import {
  Button,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  EventEmitter,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {io} from 'socket.io-client';
import ChatCamIcon from '../assets/icons/ChatCamIcon';
import ChatPhoneIcon from '../assets/icons/ChatPhoneIcon';

const Chat = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={'lightblue'} />
        <View style={{flex: 1}}>
          <Button
            title="HOME"
            color={'lightblue'}
            onPress={() => navigation.navigate('Home')}
          />
          <View
            style={{
              backgroundColor: 'lightblue',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 50,
              borderColor: 'grey',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Video')}>
              <View
                style={{
                  width: 50,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ChatCamIcon />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  width: 50,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ChatPhoneIcon />
              </View>
            </TouchableOpacity>
          </View>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Chat;

const styles = StyleSheet.create({});
