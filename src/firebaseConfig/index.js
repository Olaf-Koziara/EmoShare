import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage/";
const firebaseConfig = {
  apiKey: "AIzaSyCcBAVZ2qyCWb1FvyCeo-tGU-BorkOyPUo",
  authDomain: "emoshare-2edfb.firebaseapp.com",
  databaseURL: "https://emoshare-2edfb.firebaseio.com",
  projectId: "emoshare-2edfb",
  storageBucket: "emoshare-2edfb.appspot.com",
  messagingSenderId: "316444458321",
  appId: "1:316444458321:web:3deb10dee7983bd15aa770",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
