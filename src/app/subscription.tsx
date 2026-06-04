import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function SubscriptionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Subscription Plans
      </Text>

      <View style={styles.card}>
        <Text style={styles.plan}>Basic</Text>
        <Text>₹199 / Month</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.plan}>Premium</Text>
        <Text>₹499 / Month</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.plan}>Pro</Text>
        <Text>₹999 / Month</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },

  plan: {
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});