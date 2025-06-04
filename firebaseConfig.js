// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmP99-l1TURJgLSq4evzGvM1NNPbrD3cI",
  authDomain: "admin-ease-4f764.firebaseapp.com",
  projectId: "admin-ease-4f764",
  storageBucket: "admin-ease-4f764.appspot.com",
  messagingSenderId: "64063026106",
  appId: "1:64063026106:web:f742f449b00ebcfb7b2383",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// Enable persistence for authentication
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Authentication state persistence enabled");
  })
  .catch((error) => {
    console.error("Error enabling persistence:", error);
  });


  export const addEventToFirestore = async (event) => {
    try {
      await addDoc(collection(db, "events"), event);
    } catch (e) {
      console.error("Error adding event: ", e);
    }
  };

// Export instances
export { auth, db, storage, provider };