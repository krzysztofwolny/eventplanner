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

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const provider = new firebase.auth.GoogleAuthProvider();

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  console.log('nie ma usera');
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};