/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
//handle keyboard appearance and automatically scrolls to focused <TextInput>
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/RegistrationLogin.style';
import { firebase } from '../firebase/config';

export default function Login({ navigation
}) {
  const [email, setEmail] = React.useState(''); //initial state null
  const [password, setPassword] = React.useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Registration') //navigate to Registration screen
  }

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        /* Disable for now
        if (!res.user.emailVerified) {
          alert("Please verify your email first!");
        } else {
          console.log(res.user)
          alert(`Hi ${res.user}. Welcome back 😄`);
        }
        */

        alert(`Hi ${res.user.displayName}. Welcome back 😄`);

        WriteAsyncStorage('Login');

        console.log(ReadAsyncStorage());

      })
      .catch((error) => alert(error));
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView}
        keyboardShouldPersistTaps='always'>
        <Image
          style={styles.logo}
          source={require('../../assets/favicon.png')} />
        <TextInput //email
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput //password
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Don't have an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign Up</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}