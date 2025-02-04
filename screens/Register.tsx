import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons"; // You can use any icon library
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigation = useNavigation();
  const { register } = useAuth();

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

const handleSubmit = async () => {
  setError(null);
  setIsLoadingRegister(true);

  try {
    await register(formData);
    await AsyncStorage.setItem("user", JSON.stringify(formData)); 

    Alert.alert(
      "Registration Successful",
      "Please log in to continue.",
      [{ text: "OK", onPress: () => navigation.navigate("Login") }]
    );
  } catch (err) {
    console.error("Registration failed:", err);
    setError("Registration failed. Please check your input.");
  } finally {
    setIsLoadingRegister(false);
  }
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Your Account</Text>
        <Image source={require('../assets/moe-new.png')} style={styles.logo} />

        {error && <Text style={styles.errorText}>{error}</Text>}

        
        <Text style={styles.label}>User Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="JohnDoe"
            value={formData.userName}
            onChangeText={(text) => handleChange("userName", text)}
          />
          <FontAwesome name="user" size={20} color="#ff7900" style={styles.icon} />
        </View>

        {/* First Name */}
        <Text style={styles.label}>First Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="John"
            value={formData.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
          />
          <FontAwesome name="user" size={20} color="#ff7900" style={styles.icon} />
        </View>

        {/* Last Name */}
        <Text style={styles.label}>Last Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Doe"
            value={formData.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
          />
          <FontAwesome name="user" size={20} color="#ff7900" style={styles.icon} />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Johndoe@gmail.com"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <FontAwesome name="envelope" size={20} color="#ff7900" style={styles.icon} />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <FontAwesome name="lock" size={20} color="#ff7900" style={styles.icon} />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <FontAwesome
              name={passwordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#ff7900"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry={!confirmPasswordVisible}
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
          <FontAwesome name="lock" size={20} color="#ff7900" style={styles.icon} />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <FontAwesome
              name={confirmPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#ff7900"
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.button, isLoadingRegister && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoadingRegister}
        >
          {isLoadingRegister ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>REGISTER</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, 
  },
    label: {
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingLeft: 40, 
    backgroundColor: "white",
    flex: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ff7900",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#a5d6a7",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    textAlign: "center",
    color: "blue",
    marginTop: 20,
    fontSize: 14,
  },
});
