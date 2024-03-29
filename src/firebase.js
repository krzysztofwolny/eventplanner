import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Router from 'next/router';

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
  auth.signInWithPopup(provider).then(Router.push('/UserHome'));
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
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

export const saveToFirebase = async (collection, inputData, successFunc, failFunc) => {
    await firestore.collection(collection).doc()
      .set(inputData)
      .then(() => {
        console.log("succes");
        successFunc();
      })
      .catch((error) => {
        console.log(error);
        failFunc();
      });
};

export const searchFirebase = async (collection, searchKey, search ) => {
  const dataOutput = [];
  await firestore.collection(collection).where(searchKey, "==", search)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const outputObject = { docID: doc.id,
        ...data }
        dataOutput.push(outputObject);
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
    return dataOutput;
};

export const deleteItemFromFirebase = async (collection, itemID) => {
  await firestore.collection(collection).doc(itemID).delete()
  .then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
};

export const updateItemInFirebase = async (collection, itemID, inputData) => {
  await firestore.collection(collection).doc(itemID).update({
    ...inputData
  })
  .then(() => {
    console.log("Document successfully updated!");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });
};

export const getDocumentFromFirebase = async (collection, itemID) => {
  let output = '';
  await firestore.collection(collection).doc(itemID).get()
  .then( res => {
    output = res.data()
  })
  .catch( e => console.log(e));
  return output;
}