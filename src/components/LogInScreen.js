import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';

import styles from '../styles/signupStyles';

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image source={require('../images/login.png')} style={styles.logo} />
        <View style={styles.account}>
          <Text style={styles.title}>Log In</Text>
          <View style={styles.inputConLogIn}>
            <TextInput
              style={[styles.input, { color: 'black' }]}
              placeholder="Enter your gmail"
              placeholderTextColor={'black'}
              value={email}
              onChangeText={text => setEmail(text)}
            />

            <TextInput
              style={[styles.input, { color: 'black' }]}
              placeholder="Enter your password"
              placeholderTextColor={'black'}
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.customBotton}
            >
              <Text style={styles.textt}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.signText}>Don't have an account? </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={[styles.signText, styles.signupLink]}>
                  SignUp Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LogInScreen;