// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    OAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuZ2gqv0NneAeUyaqsWA0nXyIHaJVGECQ",
    authDomain: "windy-ffb46.firebaseapp.com",
    projectId: "windy-ffb46",
    storageBucket: "windy-ffb46.firebasestorage.app",
    messagingSenderId: "564798371745",
    appId: "1:564798371745:web:dd8f2aeda73e7761a83de0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create providers
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

// Configure additional provider settings if needed
googleProvider.addScope('email');
microsoftProvider.addScope('email');
microsoftProvider.addScope('openid');

// Export everything needed by auth.js
export {
    auth,
    googleProvider,
    microsoftProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    onAuthStateChanged
};