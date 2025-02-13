import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';  

const DashboardScreen = () => {
  const { user } = useAuth();  

  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#555"
        />
      </View>

 
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>
          Welcome Back, <Text style={styles.username}>{user ? `${user.firstName} ${user.lastName}` : 'User'}</Text>
        </Text>
        <Text style={styles.totalUsers}>
          Total Users: <Text style={styles.userCount}>18</Text>
        </Text>
      </View>

      
      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.card}>
          <MaterialIcons name="question-answer" size={40} color="#ff7900" />
          <Text style={styles.cardText}>Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <MaterialIcons name="question-answer" size={40} color="#ff7900" />
          <Text style={styles.cardText}>Unassigned Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <FontAwesome5 name="clipboard-check" size={40} color="#ff7900" />
          <Text style={styles.cardText}>Answered</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <MaterialIcons name="pending-actions" size={40} color="#ff7900" />
          <Text style={styles.cardText}>Pending Responses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <MaterialIcons name="history" size={40} color="#ff7900" />
          <Text style={styles.cardText}>Overdue Responses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <FontAwesome5 name="chart-bar" size={40} color="#ff7900" />
          <Text style={styles.cardText}>Assigned Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <FontAwesome5 name="users" size={40} color="#ff7900" />
          <Text style={styles.cardText}>Approved Responses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <FontAwesome5 name="users" size={40} color="#ff7900" />
          <Text style={styles.cardText}>Users</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '90%',
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  welcomeCard: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    color: '#ff7900',
  },
  totalUsers: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  userCount: {
    fontWeight: 'bold',
    color: '#ff7900',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    width: 160,
    height: 120,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: '#555',
    marginTop: 5,
  
  },
});

export default DashboardScreen;
