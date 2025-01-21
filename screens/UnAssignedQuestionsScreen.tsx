import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@env';
import MainQuestion from './MainQuestion';

const UnassignedQuestionsScreen = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ['unassignedQuestions'],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/api/Question/unassigned`);
      return response?.data?.data || [];
    },
  });

  const handleToggleView = (questionId: number) => {
    setSelectedQuestionId(questionId);
  };

  const renderQuestion = ({ item }) => (
    <TouchableOpacity
      style={styles.questionContainer}
      onPress={() => handleToggleView(item.id)}
    >
      <Text style={styles.questionText}>{item.title}</Text>
      <Text style={styles.questionDetails}>Origin: {item.questionOrigin}</Text>
      <Text style={styles.questionDetails}>Due: {item.dateDue}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff7900" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unassigned Questions</Text>
      {selectedQuestionId ? (
        <MainQuestion
          selectedQuestionId={selectedQuestionId}
          handleToggleView={() => setSelectedQuestionId(null)}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={renderQuestion}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#ff7900',
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  questionDetails: {
    fontSize: 14,
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default UnassignedQuestionsScreen;
