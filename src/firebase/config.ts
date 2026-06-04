import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6f4e9Lwi5FTgv5ZEZy49yW5jmiICa_Y4",
  authDomain: "courseapp-1dab4.firebaseapp.com",
  projectId: "courseapp-1dab4",
  storageBucket: "courseapp-1dab4.firebasestorage.app",
  messagingSenderId: "823840442273",
  appId: "1:823840442273:web:9e2e41505f35f54ed4ade0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;