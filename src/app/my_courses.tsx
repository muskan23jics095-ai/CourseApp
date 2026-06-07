import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export default function MyCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyCourses();
  }, []);

  const loadMyCourses = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "enrollments"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const rawData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Remove duplicate courses
      const uniqueCourses = rawData.filter(
        (course, index, self) =>
          index ===
          self.findIndex(
            (c) => c.courseId === course.courseId
          )
      );

      setCourses(uniqueCourses);

      console.log("My Courses:", uniqueCourses);
    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading My Courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Courses</Text>

      <Text style={styles.subtitle}>
        Enrolled Courses: {courses.length}
      </Text>

      {courses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No Courses Enrolled Yet 📚
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/courses")}
          >
            <Text style={styles.buttonText}>
              Browse Courses
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.courseTitle}>
                {item.courseTitle}
              </Text>

              <Text style={styles.price}>
                ₹{item.price}
              </Text>

              <Text style={styles.status}>
                Status: {item.status}
              </Text>

              <Text style={styles.date}>
                Enrolled On:
              </Text>

              <Text style={styles.dateValue}>
                {new Date(
                  item.enrolledAt
                ).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
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
  },

  subtitle: {
    color: "#64748B",
    marginBottom: 20,
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    width: 220,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  price: {
    color: "#16A34A",
    fontSize: 16,
    marginTop: 5,
  },

  status: {
    color: "green",
    marginTop: 10,
  },

  date: {
    marginTop: 10,
    fontWeight: "600",
  },

  dateValue: {
    color: "#555",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});