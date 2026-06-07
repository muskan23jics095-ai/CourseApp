import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";
import { auth, db } from "../firebase/config";
import { showMessage } from "../utils/showMessage";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const handleRegister = async () => {
  try {
    if (
      !name ||
      !mobile ||
      !whatsapp ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      showMessage(
        "Error",
        "Please fill all fields"
      );
      return;
    }

    if (password !== confirmPassword) {
      showMessage(
        "Error",
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

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      mobile,
      whatsapp,
      email,
      createdAt: new Date().toISOString(),
    });

    showMessage(
      "Success 🎉",
      "Account Created Successfully"
    );

    router.replace("/login");
  } catch (error: any) {
    console.log("Registration Error:", error);

    showMessage(
      "Registration Failed",
      error.message
    );
  }
};

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingTop: 60,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Create Account
      </Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
        style={styles.input}
      />

      <TextInput
        placeholder="WhatsApp Number"
        keyboardType="phone-pad"
        value={whatsapp}
        onChangeText={setWhatsapp}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#16A34A",
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },
};