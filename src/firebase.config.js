import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2QAGVINWbOD0tnhZbc1VdUB1ngf4nxT8",
  authDomain: "skilled-booking-354204.firebaseapp.com",
  projectId: "skilled-booking-354204",
  storageBucket: "skilled-booking-354204.appspot.com",
  messagingSenderId: "48375727321",
  appId: "1:48375727321:web:8e8eecf9304692ac126ac8",
  measurementId: "G-20C7XEHJH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
