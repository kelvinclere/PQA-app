import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../context/AuthContext';
import MainAnswerQuestion from '../screens/MainAnswerQuestion';

const AssignedQuestions: React.FC = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const { user } = useAuth();
  const liaisonId = user?.id;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['assigned', selectedQuestionId],
    queryFn: async () => {
      const response = await axios.get(`https://ff09-41-76-168-3.ngrok-free.app/api/Question/my-questions/{liasonId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response?.data?.data || [];
    },
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="orange" />;
  }

  if (error) {
    Alert.alert('Error', 'Something went wrong while fetching data.');
    return null;
  }

  const handleToggleView = (questionId: number) => {
    setSelectedQuestionId(questionId);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => handleToggleView(item.id)}
    >
      <Text style={styles.cell}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.cell}>{item.serialNumber}</Text>
      <Text style={styles.cell}>{item.questionOrigin}</Text>
      <Text style={styles.cell}>{item.dateDue}</Text>
      <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedQuestionId ? (
        <MainAnswerQuestion
          refetch={refetch}
          handleToggleView={handleToggleView}
          selectedQuestionId={selectedQuestionId}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerCell}>Date Created</Text>
              <Text style={styles.headerCell}>Serial Number</Text>
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

export default AssignedQuestions;
