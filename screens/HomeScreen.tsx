import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const emails = [
    { id: 1, sender: 'John Doe', subject: 'Education Budget Allocation', snippet: 'Hey, just a reminder about our meeting tomorrow...', time: '2:30 PM', details: 'Detailed info about the meeting, including key points and agenda.' },
    { id: 2, sender: 'Jane Smith', subject: 'Project update', snippet: 'The latest update on the project...', time: '1:15 PM', details: 'This includes the latest figures and project milestones.' },
    { id: 3, sender: 'Mark Johnson', subject: 'Digital Learning Initiative', snippet: 'Please find attached the invoice for services rendered...', time: '12:45 PM', details: 'A breakdown of costs and next steps for the initiative.' },
    { id: 4, sender: 'Kelvin Clere', subject: 'Teachers Training Program', snippet: 'Please find attached the invoice for services rendered...', time: '13:45 PM', details: 'Detailed explanation of the training program and its schedule.' },
    { id: 5, sender: 'Kelvin Clere', subject: 'Teachers Training Program', snippet: 'Please find attached the invoice for services rendered...', time: '13:45 PM', details: 'Detailed explanation of the training program and its schedule.' },
    { id: 6, sender: 'Kelvin Clere', subject: 'Teachers Training Program', snippet: 'Please find attached the invoice for services rendered...', time: '13:45 PM', details: 'Detailed explanation of the training program and its schedule.' },
    { id: 7, sender: 'Jane Smith', subject: 'Project update', snippet: 'The latest update on the project...', time: '1:15 PM', details: 'This includes the latest figures and project milestones.' },
  ];

  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardPress = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/moe-new.png')} style={styles.logo} />
        <TextInput placeholder="Search Question" style={styles.searchInput} />
      </View>

      <ScrollView contentContainerStyle={styles.emailList}>
        {emails.map((email) => (
          <TouchableOpacity key={email.id} onPress={() => handleCardPress(email.id)}>
            <View style={styles.emailCard}>
              <Text style={styles.sender}>{email.sender}</Text>
              <Text style={styles.subject}>{email.subject}</Text>
              <Text style={styles.snippet}>{email.snippet}</Text>
              <Text style={styles.time}>{email.time}</Text>
              {expandedCard === email.id && (
                <Text style={styles.details}>{email.details}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewQuestion')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 40,
    height: 40,
  },
  searchInput: {
    marginLeft: 20,
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingLeft: 20,
  },
  emailList: {
    padding: 10,
  },
  emailCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subject: {
    fontSize: 14,
    color: '#007bff',
    marginVertical: 5,
  },
  snippet: {
    fontSize: 12,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  details: {
    fontSize: 12,
    color: '#444',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#ff7900',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
