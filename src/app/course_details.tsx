import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
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
  const [enrolled, setEnrolled] = useState(false);

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

      const user = auth.currentUser;

      if (user) {
        const q = query(
          collection(db, "enrollments"),
          where("userId", "==", user.uid),
          where("courseId", "==", String(id))
        );

        const enrollmentSnap = await getDocs(q);

        if (!enrollmentSnap.empty) {
          setEnrolled(true);
        }
      }
    } catch (error) {
      console.log("Load Course Error:", error);
    }

    setLoading(false);
  };

  const handleEnroll = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        showMessage(
          "Login Required",
          "Please login first"
        );
        return;
      }

      const q = query(
        collection(db, "enrollments"),
        where("userId", "==", user.uid),
        where("courseId", "==", String(id))
      );

      const existingEnrollment = await getDocs(q);

      if (!existingEnrollment.empty) {
        setEnrolled(true);

        showMessage(
          "Already Enrolled",
          `You are already enrolled in ${course?.title}`
        );

        return;
      }

     if (!course) {
  Alert.alert(
    "Error",
    "Course data not loaded"
  );
  return;
}

await addDoc(
  collection(db, "enrollments"),
  {
    userId: user.uid,
    userEmail: user.email || "",
    courseId: String(id),
    courseTitle: String(course?.title || ""),
    description: String(course?.description || ""),
    price: Number(course?.price || 0),
    enrolledAt: new Date().toISOString(),
    status: "active",
  }
);
      setEnrolled(true);

      showMessage(
        "Enrollment Successful 🎉",
        `You have enrolled in ${course.title}`
      );

      router.replace("/my_courses");
    } catch (error: any) {
      console.log("Enrollment Error:", error);

      showMessage(
        "Enrollment Failed",
        error.message || "Something went wrong"
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading Course...</Text>
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
        style={[
          styles.button,
          enrolled && styles.enrolledButton,
        ]}
        onPress={handleEnroll}
        disabled={enrolled}
      >
        <Text style={styles.buttonText}>
          {enrolled
            ? "Already Enrolled ✅"
            : "Enroll Now"}
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

  enrolledButton: {
    backgroundColor: "#16A34A",
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