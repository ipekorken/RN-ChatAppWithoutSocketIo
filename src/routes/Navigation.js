import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  Chat,
  Forgot,
  Register,
  Login,
  Video,
  Conversation,
  ChatMainScreen,
  CreateChat,
  CreateGroupChat,
} from '../screens';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={Forgot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatMainScreen"
          component={ChatMainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Conversation"
          component={Conversation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateChat"
          component={CreateChat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateGroupChat"
          component={CreateGroupChat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Video"
          component={Video}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
