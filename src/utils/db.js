import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZlVgcCvlkK9AH21QmUczFtIdv8s55NSM",
  authDomain: "contact-book-eaf6d.firebaseapp.com",
  projectId: "contact-book-eaf6d",
  storageBucket: "contact-book-eaf6d.firebasestorage.app",
  messagingSenderId: "510502633838",
  appId: "1:510502633838:web:fd6131e321246ef8f6417f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;