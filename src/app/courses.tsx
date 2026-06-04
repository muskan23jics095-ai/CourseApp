import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function CoursesScreen() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "courses"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCourses(data);
    } catch (error) {
      console.log("Firestore Error:", error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading Courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Courses</Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
  style={styles.card}
  onPress={() =>
    router.push(`/course_details?id=${item.id}`)
  }
>
            <Text style={styles.courseTitle}>
              {item.title}
            </Text>

            <Text style={styles.price}>
              ₹{item.price}
            </Text>

            <Text>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
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
    borderRadius: 12,
    marginBottom: 15,
  },

  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    color: "green",
    marginTop: 5,
    marginBottom: 5,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});