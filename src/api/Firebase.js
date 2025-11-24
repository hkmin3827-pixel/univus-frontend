import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqc3jZo2Kj2bgAVgxTC9su0P1N9kLe-Hg",
  authDomain: "kh-mini-project.firebaseapp.com",
  projectId: "kh-mini-project",
  storageBucket: "kh-mini-project.appspot.com",
  messagingSenderId: "106733687469",
  appId: "1:106733687469:web:f094788d000284bafa6c24",
  measurementId: "G-1RW6SQ37MW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
