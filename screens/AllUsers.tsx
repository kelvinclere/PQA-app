import useUsersData from 'hooks/useUsersData';
import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';


const AllUsers = () => {
  const { data, isLoading, error } = useUsersData();

  if (isLoading) {
    return <ActivityIndicator size="large" color="orange" style={styles.loader} />;
  }

  if (error) {
    console.error("Error fetching users:", error.message);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching users data</Text>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.userRow}>
      <Text style={styles.userText}>{item.username}</Text>
      <Text style={styles.userText}>{item.firstName}</Text>
      <Text style={styles.userText}>{item.lastName}</Text>
      <Text style={styles.userText}>{item.email}</Text>
      <Text style={styles.userText}>{item.role}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <Text style={styles.subtitle}>Total system users</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  list: {
    paddingBottom: 20,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default AllUsers;
