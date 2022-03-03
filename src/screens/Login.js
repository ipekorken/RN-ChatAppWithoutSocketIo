import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUserToken, setUserInfo} from '../@redux/app/actions';
import {apiUrl} from '../apis';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showAlert = (errTitle, errInfo) => {
    Alert.alert(errTitle, errInfo, [{text: 'OK'}]);
  };

  const loginAlert = (errTitle, errInfo) => {
    Alert.alert(errTitle, errInfo, [
      {
        text: 'OK',
        onPress: () =>
          setTimeout(() => {
            navigation.navigate('ChatMainScreen');
          }, 400),
      },
    ]);
  };

  function login() {
    if (email != '' || password != '') {
      var data = JSON.stringify({
        email: email,
        password: password,
      });
      var config = {
        method: 'post',
        url: `${apiUrl}:3000/api/users/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          if (response.data.token) {
            dispatch(setUserToken(response.data.token));
            dispatch(setUserInfo(response.data.user));
            loginAlert('Login Successful', '');
          } else {
            showAlert('Login Failed', response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      showAlert('Login Failed', 'Please fill the blanks!');
    }
  }

  function goRegister() {
    navigation.navigate('Register');
  }

  function goForgot() {
    navigation.navigate('Forgot');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={'lightblue'} />
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={login} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goRegister} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  btnTouch: {
    marginRight: 10,
    marginLeft: 10,
  },
  btnTxt: {
    fontSize: 20,
  },
});
