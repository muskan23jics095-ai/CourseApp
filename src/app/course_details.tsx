import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams, router } from "expo-router";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export default function CourseDetails() {
  const { id } = useLocalSearchParams();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    try {
      const docRef = doc(db, "courses", String(id));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCourse({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleEnroll = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert(
          "Login Required",
          "Please login first"
        );
        return;
      }

      const q = query(
        collection(db, "enrollments"),
        where("userId", "==", user.uid),
        where("courseId", "==", id)
      );

      const existingEnrollment = await getDocs(q);

      if (!existingEnrollment.empty) {
        Alert.alert(
          "Already Enrolled",
          `You are already enrolled in ${course?.title}`
        );
        return;
      }

      await addDoc(
        collection(db, "enrollments"),
        {
          userId: user.uid,
          userEmail: user.email,
          courseId: id,
          courseTitle: course.title,
          price: course.price,
          enrolledAt: new Date().toISOString(),
          status: "active",
        }
      );

      Alert.alert(
        "Success",
        `Enrolled in ${course.title}`
      );

      router.replace("/my_courses");
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Enrollment Failed",
        error.message
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.container}>
        <Text>Course not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {course.title}
      </Text>

      <Text style={styles.price}>
        ₹{course.price}
      </Text>

      <Text style={styles.description}>
        {course.description}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleEnroll}
      >
        <Text style={styles.buttonText}>
          Enroll Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  price: {
    fontSize: 22,
    color: "#16A34A",
    marginTop: 10,
  },

  description: {
    marginTop: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});