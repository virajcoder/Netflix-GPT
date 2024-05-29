// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSW6KT5-nm3P9CKiPk3naC-I_CE4FIrJY",
  authDomain: "netflixgpt-abd14.firebaseapp.com",
  projectId: "netflixgpt-abd14",
  storageBucket: "netflixgpt-abd14.appspot.com",
  messagingSenderId: "691226405537",
  appId: "1:691226405537:web:f8ad1e3cfb757a31c61ee0",
  measurementId: "G-31W5QRPGZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();