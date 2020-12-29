/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from '../styles/RegistrationLogin.style';
import { firebase } from '../firebase/config';

export default function Registration({ navigation }) {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  }

  const onRegisterPress = () => {
    if (password !== confirmPassword) { //alert password doesn't match
      alert("Passwords do not match!");
    } 
    else {

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: fullName,
          })

          //Send verification email
          //Disble for now as it is a bit hassle for testing
          firebase.auth().currentUser.sendEmailVerification().then(() => {
            console.log('Email sent');
            //console.log(user);
          });
          

          console.log(res); //output user
          alert('Registration successful. Please verify your email to login');

          const uid = res.user.uid; //get unique uid
          console.log(uid);
          const data = { //data for user node
            uid,
            email,
            fullName,
            password
          };

          firebase.database().ref('users/' + uid).set({
            profile: data,
          }).then(() => {

          }
          );
        })
        .catch((error) => {
          console.log(error.toString(error))
        });

        navigation.navigate('Login');
      }
    }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollView} keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../assets/favicon.png')}
        />
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Already got an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>Login</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}