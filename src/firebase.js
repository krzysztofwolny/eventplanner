import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5VyGlkK6jJzriVO4JBR9DGmW3M5sP-us",
    authDomain: "eventplanner-e9726.firebaseapp.com",
    projectId: "eventplanner-e9726",
    storageBucket: "eventplanner-e9726.appspot.com",
    messagingSenderId: "220858883022",
    appId: "1:220858883022:web:82968498b7a81a4f9ea99f",
    measurementId: "G-6W7Z4PENXG"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();