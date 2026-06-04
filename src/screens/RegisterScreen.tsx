import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";

import { auth, db } from "../firebase/config";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSignup = async () => {
    try {
      if (
        !name ||
        !mobile ||
        !whatsapp ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        Alert.alert(
          "Missing Information",
          "Please fill all fields"
        );
        return;
      }

      if (mobile.length !== 10) {
        Alert.alert(
          "Invalid Mobile Number",
          "Enter a valid 10-digit mobile number"
        );
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert(
          "Password Error",
          "Passwords do not match"
        );
        return;
      }

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      //const user = userCredential.user;

      //await setDoc(doc(db, "users", user.uid), {
       // uid: user.uid,
       // name,
       // mobile,
       // whatsapp,
       // email,
       // createdAt: new Date().toISOString(),
      //});

      Alert.alert(
        "Success",
        "Account Created Successfully"
      );

      router.replace("/login");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.message
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>
        Student Registration
      </Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        style={styles.input}
        value={mobile}
        onChangeText={setMobile}
      />

      <TextInput
        placeholder="WhatsApp Number"
        keyboardType="phone-pad"
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>
          Create Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});