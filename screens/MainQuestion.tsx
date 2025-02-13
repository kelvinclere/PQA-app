import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import axios from 'axios';

import { BASE_URL } from '@env';
import Picker from 'react-native-picker-select';

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

type MainQuestionProps = {
  selectedQuestionId: string;
  handleToggleView: () => void;
};

const MainQuestion: React.FC<MainQuestionProps> = ({
  selectedQuestionId,
  handleToggleView,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isOpenAssign, setIsAssign] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchQuestionData();
    fetchUsersData();
  }, []);

  const fetchQuestionData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Question/${selectedQuestionId}`,
        {
          headers: DEFAULT_HEADERS,
        }
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Users`, {
        headers: DEFAULT_HEADERS,
      });
      setUsers(response.data.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch users.');
    }
  };

  const assignLiaison = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/Question/assign/${selectedUser}`,
        { liaisonId: selectedQuestionId },
        {
          headers: DEFAULT_HEADERS,
        }
      );
      Alert.alert('Success', 'Liaison assigned successfully.');
    } catch (err) {
      Alert.alert('Error', 'Failed to assign liaison.');
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading question data.</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleView}>
        <Text style={styles.backButton}>{'< Back'}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Origin: {data.questionOrigin}</Text>
        <Text>Created at: {new Date(data.createdAt).toLocaleDateString()}</Text>
        <Text>Due date: {new Date(data.dateDue).toLocaleDateString()}</Text>
        <Text style={styles.sectionTitle}>Main question</Text>
        <Text>{data.title}</Text>
        <Text style={styles.sectionTitle}>Sub question</Text>
        <Text>{data.subQuestion}</Text>
        <Text>Serial Number: {data.serialNumber}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsAssign(!isOpenAssign)}
        >
          <Text style={styles.buttonText}>Assign liaison</Text>
        </TouchableOpacity>
      </View>

      {isOpenAssign && (
        <View style={styles.card}>
          <Text style={styles.title}>Assign liaison officer</Text>
          <Text>Select a liaison officer to assign to this question</Text>
          <Picker
            selectedValue={selectedUser}
            onValueChange={(itemValue) => setSelectedUser(itemValue)}
          >
            {users.map((user) => (
              <Picker.Item
                key={user.id}
                label={`${user.firstName} ${user.lastName} (${user.email})`}
                value={user.id.toString()}
              />
            ))}
          </Picker>
          {selectedUser && (
            <TouchableOpacity style={styles.button} onPress={assignLiaison}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
  },
  card: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ff7900',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MainQuestion;
