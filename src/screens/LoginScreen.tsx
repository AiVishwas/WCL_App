// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type User = {
  username: string;
  password: string;
  name: string;
};

const dummyUsers: User[] = [
  { username: 'user1', password: 'pass1', name: 'User One' },
  { username: 'user2', password: 'pass2', name: 'User Two' },
];

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    const user = dummyUsers.find(user => user.username === username && user.password === password);
    if (user) {
      navigation.navigate('TaskList', { officerName: user.name }); 
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }  
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      >
        <View style={styles.inner}>
          <Image source={require('../assets/images/new_logo_1.png')} style={styles.logo} />
          <Text style={styles.label}>पेंटर कोड</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#000"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <Text style={styles.label}>पासवर्ड</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#000"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>पासवर्ड भूल गए?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>लॉग इन करें</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/images/clean.png')} style={styles.bottomRightImage} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 5,
    marginTop: 25,
  },
  label: {
    width: '90%',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'left',
  },
  input: {
    width: '95%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#CCC',
  },
  forgotPasswordText: {
    color: 'red',
    alignSelf: 'flex-end',
    marginBottom: 20,
    fontSize: 17,
  },
  loginButton: {
    width: '35%',
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomRightImage: {
    position: 'absolute',
    resizeMode: "contain",
    bottom: 20,
    right: 20,
    width: 170,
    height: 170,
    opacity: 0.0,
  },
});

export default LoginScreen;
