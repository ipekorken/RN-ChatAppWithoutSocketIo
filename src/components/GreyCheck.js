import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CheckIcon} from '../assets/icons';

const GreyCheck = () => {
  return (
    <View style={styles.checkBoxContainer}>
      <View style={styles.checkBoxView}>
        <CheckIcon size={14} color={'grey'} />
      </View>
    </View>
  );
};

export default GreyCheck;

const styles = StyleSheet.create({
  checkBoxContainer: {
    borderWidth: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: 'grey',
  },
  checkBoxView: {
    width: 20,
    height: 20,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
