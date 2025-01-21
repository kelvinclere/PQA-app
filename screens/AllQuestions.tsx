import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@env';

interface Question {
  id: string;
  title: string;
  subQuestion: string;
  questionOrigin: string;
  serialNumber: string;
  fileName: string;
  answer: string | null;
  status: boolean;
  edits: string | null;
  dateDue: string;
  createdAt: string;
  updatedAt: string;
  postedBy: object;
}

const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const response = await axios.get('https://9b5a-41-76-168-3.ngrok-free.app/api/Question');
    return response.data.data || [];
  } catch (error) {
    throw new Error('Failed to fetch questions');
  }
};

const AllQuestionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { isLoading, error, data } = useQuery<Question[], Error>({
    queryKey: ['allQuestions'],
    queryFn: fetchQuestions,
  });

  const [expanded, setExpanded] = useState<string | null>(null);

  const handleQuestionPress = (questionId: string) => {
    setExpanded(expanded === questionId ? null : questionId); // Toggle expanded state
  };

  const renderItem = ({ item }: { item: Question }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleQuestionPress(item.id)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subQuestion}>
        {item.subQuestion.length > 50
          ? `${item.subQuestion.slice(0, 50)}...`
          : item.subQuestion}
      </Text>
      <Text style={styles.dueDate}>Due Date: {item.dateDue}</Text>
      <Text style={styles.status}>Status: {item.status ? 'Answered' : 'Pending'}</Text>

      {/* Expandable content */}
      {expanded === item.id && (
        <View style={styles.expandedContent}>
          <Text style={styles.info}>Origin: {item.questionOrigin}</Text>
          <Text style={styles.info}>Serial No: {item.serialNumber}</Text>
          {item.answer && <Text style={styles.answer}>Answer: {item.answer}</Text>}
          {item.fileName && <Text style={styles.file}>File: {item.fileName}</Text>}
          {item.edits && <Text style={styles.edits}>Edits: {item.edits}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching questions: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/moe-new.png')} style={styles.logo} />
        <Text style={styles.headerText}>View Questions</Text>
      </View>
      <FlatList
        data={data}
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
    height: 70,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subQuestion: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 14,
    color: '#d9534f',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: '#17a2b8',
    marginBottom: 5,
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 5,
  },
  file: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 5,
  },
  edits: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 5,
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
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#f00',
    textAlign: 'center',
  },
});

export default AllQuestionsScreen;
