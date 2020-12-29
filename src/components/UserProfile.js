import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { firebase } from '../firebase/config';
import styles from '../styles/UserProfile.style';

function ChangePasswordTextInputs() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const onResetPasswordPress = () => {
    const currentPassword = firebase.auth().currentUser.password;
    console.log(currentPassword);
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match!');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='New Password'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm New Password'
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setConfirmNewPassword(text)}
        value={confirmNewPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onResetPasswordPress()}
      >
        <Text style={styles.buttonTitle}>Reset Password</Text>
      </TouchableOpacity>
    </View >
  )
}

export default function UserProfile() {
  const [user, setUser] = useState(null); //to store current logged in user
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      setUser(user);
    }
    console.log(user);
    setHidden(true);
  }, [user === null]);

  return (
    <View style={styles.container}>
      {hidden ?
        <TouchableOpacity
          onPress={() => setHidden(false)}
          style={styles.button}
        >
          <Text style={styles.buttonTitle}>Reset Password</Text>
        </TouchableOpacity>
        : <ChangePasswordTextInputs />
      }
    </View >
  )
}
