import firebase from "firebase/app";
import "firebase/auth"

// Your web app's Firebase configuration
const auth = firebase.initializeApp({
  apiKey: "AIzaSyDebFjBq0rnvChsL40_Ra99BRyQSrW5LzE",
  authDomain: "unichat-e8a7d.firebaseapp.com",
  projectId: "unichat-e8a7d",
  storageBucket: "unichat-e8a7d.appspot.com",
  messagingSenderId: "1095192837955",
  appId: "1:1095192837955:web:7c6b34b79b85c2bde579f6"
}).auth();

export default auth;