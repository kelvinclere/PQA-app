import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="orange" />
      <Text style={styles.text}>Parliament Of Kenya</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', 
  },
});
