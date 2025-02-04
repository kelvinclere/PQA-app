import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem("user");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } catch (error) {
        console.log("Error logging out:", error);
      }
    };

    logout();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff7900" />
      <Text style={styles.text}>Logging out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#ff7900",
  },
});
