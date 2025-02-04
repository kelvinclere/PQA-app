import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
    const response = await axios.get('https://407e-41-76-168-3.ngrok-free.app/api/Question');
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
      style={styles.emailCard}
      onPress={() => handleQuestionPress(item.id)}
    >
      <Text style={styles.sender} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.subject} numberOfLines={1} ellipsizeMode="tail">
        {item.subQuestion}
      </Text>
      <Text style={styles.snippet} numberOfLines={2} ellipsizeMode="tail">
        {item.questionOrigin}
      </Text>
      <Text style={styles.time}>Due Date: {item.dateDue}</Text>
      {expanded === item.id && (
        <Text style={styles.details}>
          <Text style={styles.infoTitle}>Serial No: </Text>
          <Text style={styles.infoBlue}>{item.serialNumber}</Text>
          {'\n'}
          <Text style={styles.infoTitle}>Answer: </Text>
          <Text style={styles.infoValue}>{item.answer || 'No answer yet'}</Text>
          {'\n'}
          <Text style={styles.infoTitle}>File: </Text>
          <Text style={styles.infoValue}>{item.fileName || 'No file attached'}</Text>
          {'\n'}
          <Text style={styles.infoTitle}>Edits: </Text>
          <Text style={styles.infoValue}>{item.edits || 'No edits'}</Text>
        </Text>
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
        <TextInput placeholder="Search Question" style={styles.searchInput} />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.emailList}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewQuestion')}
      >
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
  infoTitle: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 12,
    color: '#666',
  },
  infoBlue: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: 'bold',
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