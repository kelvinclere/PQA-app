import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigation = useNavigation();
  const { login } = useAuth();

  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          console.log("User already logged in, navigating to Home...");
          navigation.replace("Home");
        }
      } catch (err) {
        console.log("Error checking stored user:", err);
      }
    };
    checkUser();
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [key]: value,
      };
      console.log("Updated Form Data:", updatedFormData);
      return updatedFormData;
    });
  };

  const handleSubmit = async () => {
    setError(null);
    setIsLoadingLogin(true);
    try {
      const user = await login(formData);
      console.log("User data:", user);

      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        navigation.replace("Home"); 
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Parliamentary Q&A Tracking System</Text>
        <Image source={require("../assets/moe-new.png")} style={styles.logo} />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#ff7900" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="JohnDoe"
            value={formData.userName}
            onChangeText={(text) => handleChange("userName", text)}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#ff7900" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Johndoe@gmail.com"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#ff7900" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesome name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#ff7900" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, isLoadingLogin && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoadingLogin}
        >
          {isLoadingLogin ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>LOGIN</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#ff7900"
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: "auto",
  },
  input: {
    flex: 1,
    height: 50,
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
