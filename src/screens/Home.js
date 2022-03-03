import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {baseUrl} from '../apis/apiUrl';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../@redux/app/actions';

const Home = ({navigation}) => {
  const [email, seteMail] = useState('asd@mail.com');
  const [password, setPassword] = useState('asdPsw');
  const user = useSelector(state => state.app.user);
  const dispatch = useDispatch();

  useEffect(() => {
    var data = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: 'post',
      url: `${baseUrl}:3000/api/users/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        dispatch(setUser(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <StatusBar backgroundColor={'lightblue'} />
      <Button
        title="CHAT"
        color={'lightblue'}
        onPress={() => navigation.navigate('Chat')}
      />
      <View
        style={{
          backgroundColor: 'lightblue',
          height: 50,
          borderBottomWidth: 1,
          borderColor: 'grey',
        }}></View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
