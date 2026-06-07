import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showMessage = (
    title: string,
    message: string
  ) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        showMessage(
          "Error",
          "Please enter email and password"
        );
        return;
      }

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      showMessage(
        "Success 🎉",
        "Login Successful"
      );

      router.replace("/dashboard");
    } catch (error: any) {
      console.log("Login Error:", error);

      showMessage(
        "Login Failed",
        error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Student Login
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});