// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1K8-D48MWdvjQNgLl742bCzxKDzz5zIo",
  authDomain: "acorn-auto.firebaseapp.com",
  projectId: "acorn-auto",
  storageBucket: "acorn-auto.appspot.com",
  messagingSenderId: "1080404539190",
  appId: "1:1080404539190:web:fd739ba57f39310cc9a597",
  measurementId: "G-WF1H0MMZ7R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
