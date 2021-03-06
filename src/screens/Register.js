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
} from 'react-native';
import axios from 'axios';
import {apiUrl} from '../apis';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const showAlert = (errTitle, errInfo) => {
    Alert.alert(errTitle, errInfo, [{text: 'OK'}]);
  };

  const registerAlert = (errTitle, errInfo) => {
    Alert.alert(errTitle, errInfo, [
      {
        text: 'OK',
        onPress: () =>
          setTimeout(() => {
            navigation.navigate('Login');
          }, 500),
      },
    ]);
  };

  function register() {
    if (email !== '' || password !== '' || name !== '' || surname !== '') {
      let data = JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        password: password,
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
            registerAlert('Register Successful', '');
          } else {
            showAlert('Register Failed', response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      showAlert('Register Failed', 'Please fill the blanks!');
    }
  }

  function goLogin() {
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={'lightblue'} />
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={text => setName(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Surname"
            onChangeText={text => setSurname(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={register} style={styles.btnTouch}>
          <Text style={styles.btnTxt}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goLogin} style={styles.btnTouch}>
          <Text style={[styles.btnTxt, {color: 'red'}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;

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
});
