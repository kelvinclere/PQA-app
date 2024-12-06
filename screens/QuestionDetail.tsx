import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuestionDetail = ({ route }: any) => {
  const { questionId } = route.params;

  
  const question = {
    title: 'What is the capital of Kenya?',
    body: 'Can you tell me the capital city of Kenya?',
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.body}>{question.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#333',
  },
});

export default QuestionDetail;
