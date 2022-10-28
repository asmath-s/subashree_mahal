// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyCcbR8U9erdqqzsEgbaq36rlwwX8dp9-Xk",
//   authDomain: "sbs-baboolsoft.firebaseapp.com",
//   projectId: "sbs-baboolsoft",
//   storageBucket: "sbs-baboolsoft.appspot.com",
//   messagingSenderId: "926677060817",
//   appId: "1:926677060817:web:84e39244d8e815294c49f0",
//   measurementId: "G-G6FQPFJWYD",
// };

//production
const firebaseConfig = {
  apiKey: "AIzaSyCcbR8U9erdqqzsEgbaq36rlwwX8dp9-Xk",
  authDomain: "sbs-baboolsoft.firebaseapp.com",
  databaseURL: "https://sbs-baboolsoft-default-rtdb.firebaseio.com",
  projectId: "sbs-baboolsoft",
  storageBucket: "sbs-baboolsoft.appspot.com",
  messagingSenderId: "926677060817",
  appId: "1:926677060817:web:6cc5f47aaa95b84f4c49f0",
  measurementId: "G-NMHDBLDBEM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const db = getFirestore(app);
export default db;

export const storage = getStorage(app);
export const auth = getAuth(app);
