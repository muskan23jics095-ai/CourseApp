import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { router } from "expo-router";

export default function Dashboard() {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>
        Welcome 👋
      </Text>

      <Text style={styles.email}>
        {user?.email}
      </Text>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Subscription Status
        </Text>
        <Text style={styles.value}>
          Inactive
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          My Courses
        </Text>
        <Text style={styles.value}>
          0 Courses Enrolled
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>
          Available Courses
        </Text>

        <Text>📚 DSA Mastery</Text>
        <Text>📚 Web Development</Text>
        <Text>📚 AI & ML</Text>
      </View>

      {/* Browse Courses Button */}
      <TouchableOpacity
        style={styles.courseButton}
        onPress={() => router.push("/courses")}
      >
        <Text style={styles.buttonText}>
          Browse Courses
        </Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.courseButton}
  onPress={() => router.push("/my_courses")}
>
  <Text style={styles.buttonText}>
    My Courses
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.courseButton}
  onPress={() => router.push("/subscription")}
>
  <Text style={styles.buttonText}>
    Subscription Plans
  </Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },

  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
  },

  email: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  value: {
    fontSize: 16,
    color: "#16A34A",
  },

  courseButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 40,
  },

  logoutText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});