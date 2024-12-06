import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AllQuestionsScreen = () => {
  const navigation = useNavigation();

  // Simulated list of questions
  const questions = [
    { id: '1', title: 'What is the capital of Kenya?', body: 'Can you tell me the capital city of Kenya?' },
    { id: '2', title: 'What is the population of Nairobi?', body: 'What is the current population of Nairobi?' },
    { id: '3', title: 'What is React Native?', body: 'Can you explain what React Native is and its benefits?' },
    { id: '4', title: 'How does JavaScript work?', body: 'What is the internal mechanism of JavaScript and how does it run code?' },
   
  ];

  const handleQuestionPress = (questionId: string) => {
    
    navigation.navigate('QuestionDetail', { questionId });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => handleQuestionPress(item.id)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Questions</Text>
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default AllQuestionsScreen;
