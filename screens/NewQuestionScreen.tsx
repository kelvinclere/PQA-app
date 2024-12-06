import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Import the dropdown picker
import { useNavigation } from '@react-navigation/native';

const NewQuestionScreen = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [from, setFrom] = useState('');
  const [directorate, setDirectorate] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigation = useNavigation();

  // Simulating directorate options for the dropdown
  const directorateOptions = [
    { label: 'Directorate 1', value: 'directorate1' },
    { label: 'Directorate 2', value: 'directorate2' },
    { label: 'Directorate 3', value: 'directorate3' },
    { label: 'Directorate 4', value: 'directorate4' },
  ];

  const handleSubmit = () => {
    console.log('Submitting new question:', {
      questionTitle,
      questionBody,
      from,
      directorate,
      trackingNumber,
    });

    // Navigate back to Home or another screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit a New Question</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Question Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Question Title"
          value={questionTitle}
          onChangeText={setQuestionTitle}
        />

        <Text style={styles.label}>Question Body</Text>
        <TextInput
          style={[styles.input, { height: 100 }]} // Adjust height for larger input area
          placeholder="Enter Question Body"
          value={questionBody}
          onChangeText={setQuestionBody}
          multiline
        />

        <Text style={styles.label}>From</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name or department"
          value={from}
          onChangeText={setFrom}
        />

        {/* Directorate Dropdown */}
        <Text style={styles.label}>Directorate</Text>
        <RNPickerSelect
          onValueChange={(value) => setDirectorate(value)}
          items={directorateOptions}
          value={directorate}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select Directorate...', value: null }}
        />

        <Text style={styles.label}>Tracking Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChangeText={setTrackingNumber}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background for contrast
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Center the title
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Styling for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  inputIOS: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
});

export default NewQuestionScreen;
