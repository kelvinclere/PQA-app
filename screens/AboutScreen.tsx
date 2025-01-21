import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>About Us</Text>
        <View style={styles.line} />
        <Text style={styles.content}>
          Welcome to the Parliamentary Q&A App, your comprehensive platform for accessing and managing parliamentary questions and answers.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Purpose</Text>
        <View style={styles.line} />
        <Text style={styles.content}>
          This app is designed to streamline the process of handling parliamentary questions, providing members of parliament, researchers, and the public with easy access to the information they need. Our goal is to enhance transparency, accountability, and the efficiency of parliamentary processes.
        </Text>
      </View>

       <View style={styles.section}>
        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.line} />
        <Text style={styles.content}>
         For any inquiries, feedback, or support, please contact us at support@parliamentqaapp.com.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  line: {
    height: 2,
    backgroundColor: '#ff7900',
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    lineHeight: 22,
  },
});

export default AboutScreen;
