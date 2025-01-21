import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterScreen = ({ navigation }) => {
  const { register, loading } = useAuth();

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await register(values);
      navigation.navigate("Home");
    } catch (err) {
      setErrors({ general: err.message || "Registration failed. Please try again." });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/moe-new.png')} style={styles.logo} />

        <Text style={styles.title} accessibilityRole="header">Create Your Account</Text>

        <Formik
          initialValues={{
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmpassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
            <>
              {errors.general && <Text style={styles.error} accessibilityRole="alert">{errors.general}</Text>}

              <TextInput
                style={[styles.input, touched.userName && errors.userName ? styles.inputError : null]}
                placeholder="Username"
                value={values.userName}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                autoCapitalize="none"
              />
              {touched.userName && errors.userName && <Text style={styles.error}>{errors.userName}</Text>}

              <TextInput
                style={[styles.input, touched.firstName && errors.firstName ? styles.inputError : null]}
                placeholder="First Name"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
              />
              {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

              <TextInput
                style={[styles.input, touched.lastName && errors.lastName ? styles.inputError : null]}
                placeholder="Last Name"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
              />
              {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

              <TextInput
                style={[styles.input, touched.email && errors.email ? styles.inputError : null]}
                placeholder="Email"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
                placeholder="Password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <TextInput
                style={[styles.input, touched.confirmpassword && errors.confirmpassword ? styles.inputError : null]}
                placeholder="Confirm Password"
                secureTextEntry
                value={values.confirmpassword}
                onChangeText={handleChange("confirmpassword")}
                onBlur={handleBlur("confirmpassword")}
              />
              {touched.confirmpassword && errors.confirmpassword && <Text style={styles.error}>{errors.confirmpassword}</Text>}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>REGISTER</Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>Already have an account? Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#343a40",
  },
  error: {
    color: "#dc3545",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#dc3545",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    textAlign: "center",
    color: "#007BFF",
    marginTop: 15,
    fontSize: 16,
  },
});
