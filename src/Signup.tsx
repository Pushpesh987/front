// Signup.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<any>>();

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);

        // Log the token in the console
        console.log('User Token:', data.token);

        // Store the user token locally using AsyncStorage from @react-native-async-storage/async-storage
        await AsyncStorage.setItem('userToken', data.token);

        // After successful signup, navigate to the login screen or perform other actions
        navigation.navigate('Login');
      } else {
        console.error('Signup failed:', data);
        // Handle error scenario, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <Button title={loading ? 'Signing up...' : 'Signup'} onPress={handleSignup} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default Signup;
