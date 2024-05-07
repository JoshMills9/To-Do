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

const SignUp = ({ navigation }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 const handleSignUp = () => {
    console.log("Signup success!")
 }
 return (
    <View style={styles.container}>
      <SafeAreaView>
        <Image source={require('../images/signup.png')} style={styles.logo} />
        <View style={styles.account}>
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: '#2F2E41' }]}
              placeholder="Enter your gmail"
              placeholderTextColor={'#2F2E41'}
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={[styles.input, { color: '#2F2E41' }]}
              placeholder="Enter your password"
              placeholderTextColor={'#2F2E41'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.customBotton}
              onPress={handleSignUp}
            >
              <Text style={styles.textt}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.signText}>Do you have an account? </Text>

              <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={[styles.signText, styles.signupLink]}>
                 Login Here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
 );
};

export default SignUp;