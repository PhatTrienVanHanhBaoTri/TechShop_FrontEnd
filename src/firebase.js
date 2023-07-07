import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAj3MPjU4MRufH3sB8OvcRliRN-Erqb5AE",
  authDomain: "techshop-d62f6.firebaseapp.com",
  projectId: "techshop-d62f6",
  storageBucket: "techshop-d62f6.appspot.com",
  messagingSenderId: "921392598754",
  appId: "1:921392598754:web:0b0f8cf5a45527cfd618bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
