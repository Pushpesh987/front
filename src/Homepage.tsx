// Homepage.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const Homepage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>(); // Specify the type explicitly

  const handleLogout = () => {
    // Implement logout logic if needed
    // For this example, we'll just navigate back to the login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
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
});

export default Homepage;
