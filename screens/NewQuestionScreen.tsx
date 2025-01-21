import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const NewQuestionScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      title: '',
      subQuestion: '',
      questionOrigin: '', // initially empty
      serialNumber: '',
      fileName: '',
      date: '',
    },

    validationSchema: Yup.object({
      title: Yup.string().required('Question title is required'),
      subQuestion: Yup.string().required('Sub-question is required'),
      questionOrigin: Yup.string().required('Question origin is required'),
      serialNumber: Yup.string().required('Serial number is required'),
      fileName: Yup.string().required('File name is required'),
      date: Yup.string().required('Date is required'),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post('https://9b5a-41-76-168-3.ngrok-free.app/api/Question', values);

        setLoading(false);
        setIsSuccess(true);
        navigation.goBack();
      } catch (error) {
        setLoading(false);
        console.error(error?.message || 'Something went wrong');
      }
    },
  });

  const resetState = () => {
    setIsSuccess(false);
    formik.resetForm();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/moe-new.png')} style={styles.logo} />
        <Text style={styles.title}>Submit a New Question</Text>
      </View>

      {isSuccess ? (
        <View style={styles.successContainer}>
          <Text style={styles.successMessage}>Question submitted successfully!</Text>
          <TouchableOpacity style={styles.button} onPress={resetState}>
            <Text style={styles.buttonText}>Submit another question</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Question Title"
            value={formik.values.title}
            onChangeText={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
          />
          {formik.touched.title && formik.errors.title && (
            <Text style={styles.errorText}>{formik.errors.title}</Text>
          )}

          <Text style={styles.label}>Sub-Question</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Sub-Question"
            value={formik.values.subQuestion}
            onChangeText={formik.handleChange('subQuestion')}
            onBlur={formik.handleBlur('subQuestion')}
          />
          {formik.touched.subQuestion && formik.errors.subQuestion && (
            <Text style={styles.errorText}>{formik.errors.subQuestion}</Text>
          )}

          <Text style={styles.label}>Question Origin</Text>
          <Picker
            selectedValue={formik.values.questionOrigin}
            onValueChange={(itemValue) => formik.setFieldValue('questionOrigin', itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Select Question Origin" value="" />
            <Picker.Item label="Senate" value="Senate" />
            <Picker.Item label="National Assembly" value="National Assembly" />
          </Picker>
          {formik.touched.questionOrigin && formik.errors.questionOrigin && (
            <Text style={styles.errorText}>{formik.errors.questionOrigin}</Text>
          )}

          <Text style={styles.label}>Serial Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Serial Number"
            value={formik.values.serialNumber}
            onChangeText={formik.handleChange('serialNumber')}
            onBlur={formik.handleBlur('serialNumber')}
          />
          {formik.touched.serialNumber && formik.errors.serialNumber && (
            <Text style={styles.errorText}>{formik.errors.serialNumber}</Text>
          )}

          <Text style={styles.label}>File Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter File Name"
            value={formik.values.fileName}
            onChangeText={formik.handleChange('fileName')}
            onBlur={formik.handleBlur('fileName')}
          />
          {formik.touched.fileName && formik.errors.fileName && (
            <Text style={styles.errorText}>{formik.errors.fileName}</Text>
          )}

          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Date"
            value={formik.values.date}
            onChangeText={formik.handleChange('date')}
            onBlur={formik.handleBlur('date')}
          />
          {formik.touched.date && formik.errors.date && (
            <Text style={styles.errorText}>{formik.errors.date}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    height: 60,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 5,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
    fontSize: 15,
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
    fontSize: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ff7900',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
});

export default NewQuestionScreen;
