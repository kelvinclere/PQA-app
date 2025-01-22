import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import MainQuestion from './MainQuestion';

const UnAssignedQuestions: React.FC = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ['unassignedQuestions', selectedQuestionId],
    queryFn: async () => {
     
      const response = await axios.get('https://58fc-105-163-157-51.ngrok-free.app/api/Question/unassigned');
      return response?.data?.data || [];
    },
  });

  const handleToggleView = (questionId: number) => {
    setSelectedQuestionId(questionId);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    Alert.alert('Error', 'Something went wrong while fetching data.');
    return null;
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => handleToggleView(item.id)}
    >
      <Text style={styles.cell}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.cell}>{item.questionOrigin}</Text>
      <Text style={styles.cell}>{item.dateDue}</Text>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unassigned Questions</Text>
      {selectedQuestionId ? (
        <MainQuestion selectedQuestionId={selectedQuestionId} handleToggleView={handleToggleView} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerCell}>Date Created</Text>
              <Text style={styles.headerCell}>Question Origin</Text>
              <Text style={styles.headerCell}>Due Date</Text>
              <Text style={styles.headerCell}>Question Statement</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default UnAssignedQuestions;
