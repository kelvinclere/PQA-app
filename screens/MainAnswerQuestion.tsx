import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from '@env';
import Icon from "react-native-vector-icons/Feather";

type MainAnswerQuestionProps = {
  handleToggleView: (questionId: number) => void;
  selectedQuestionId: string;
  refetch: () => void;
};

const MainAnswerQuestion = ({
  selectedQuestionId,
  handleToggleView,
}: MainAnswerQuestionProps) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["assigned", selectedQuestionId],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/api/Question/${selectedQuestionId}`,
        {
          
        }
      );
      return response?.data?.data || [];
    },
  });

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
        <Text style={styles.errorText}>{`An error has occurred: ${error}`}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => handleToggleView(Number(selectedQuestionId))}
      >
        <Icon name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Origin: {data?.questionOrigin}</Text>
          <View style={styles.cardDescription}>
            <Text style={styles.cardText}>
              Created at: {new Date(data?.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.cardText}>
              Due date: {new Date(data?.dateDue).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.sectionTitle}>Main question</Text>
          <TextInput
            style={styles.textArea}
            value={data?.title}
            editable={false}
            multiline
          />

          <Text style={styles.sectionTitle}>Sub question</Text>
          <TextInput
            style={styles.textArea}
            value={data?.subQuestion}
            editable={false}
            multiline
          />
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>
            Serial Number: {data?.serialNumber}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        {/* Replace this with your editor implementation */}
        <Text style={styles.editorPlaceholder}>Editor Component Placeholder</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  backButton: {
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 14,
    color: "#6c757d",
  },
  cardContent: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    textAlignVertical: "top",
    height: 80,
    marginBottom: 16,
  },
  cardFooter: {
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#6c757d",
  },
  editorPlaceholder: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    padding: 16,
  },
});

export default MainAnswerQuestion;
