import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const adminConfig = {
    apiKey: "AIzaSyAGoCGL6pKI2tTLiZX8lSAS5x6lydogu80",
    authDomain: "keoz-admin.firebaseapp.com",
    projectId: "keoz-admin",
    storageBucket: "keoz-admin.appspot.com",
    messagingSenderId: "732736655622",
    appId: "1:732736655622:web:7da1451e352032a81e0e87"
}

firebase.initializeApp(adminConfig, "admin");

export default firebase 