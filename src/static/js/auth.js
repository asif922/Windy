// auth.js
import {
    auth,
    googleProvider,
    microsoftProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    onAuthStateChanged
} from './firebaseConfig.js';

// UI elements for login
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginMessageEl = document.getElementById('login-message');
const googleLoginBtn = document.getElementById('google-login');
const msLoginBtn = document.getElementById('microsoft-login');

// UI elements for signup
const signupForm = document.getElementById('signup-form');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupMessageEl = document.getElementById('signup-message');
const googleSignupBtn = document.getElementById('google-signup');
const msSignupBtn = document.getElementById('microsoft-signup');

const forgotPassword = document.getElementById('forgot-password');

// Tab switching elements
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginFormContainer = document.getElementById('login-form-container');
const signupFormContainer = document.getElementById('signup-form-container');

// Login form submit
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginMessageEl.textContent = '';

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = '/dashboard';
  } catch (err) {
    console.error(err);
    loginMessageEl.textContent = err.message;
  }
});

// Signup form submit
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  signupMessageEl.textContent = '';

  const email = signupEmail.value.trim();
  const password = signupPassword.value;
  const name = signupName.value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // set display name
    await updateProfile(userCredential.user, { displayName: name || null });
    // optionally redirect
    window.location.href = '/dashboard';
  } catch (err) {
    console.error(err);
    signupMessageEl.textContent = err.message;
  }
});

// Google sign in for login
googleLoginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  loginMessageEl.textContent = '';
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = '/dashboard';
  } catch (err) {
    loginMessageEl.textContent = err.message;
  }
});

// Microsoft sign in for login
msLoginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  loginMessageEl.textContent = '';
  try {
    await signInWithPopup(auth, microsoftProvider);
    window.location.href = '/dashboard';
  } catch (err) {
    console.error(err);
    loginMessageEl.textContent = err.message;
  }
});

// Google sign in for signup
googleSignupBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  signupMessageEl.textContent = '';
  try {
    await signInWithPopup(auth, googleProvider);
    window.location.href = '/dashboard';
  } catch (err) {
    signupMessageEl.textContent = err.message;
  }
});

// Microsoft sign in for signup
msSignupBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  signupMessageEl.textContent = '';
  try {
    await signInWithPopup(auth, microsoftProvider);
    window.location.href = '/dashboard';
  } catch (err) {
    console.error(err);
    signupMessageEl.textContent = err.message;
  }
});

// Forgot password
forgotPassword.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim();
  if (!email) {
    loginMessageEl.textContent = 'Enter your email above to reset password.';
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    loginMessageEl.style.color = 'green';
    loginMessageEl.textContent = 'Password reset email sent. Check your inbox.';
  } catch (err) {
    console.error(err);
    loginMessageEl.textContent = err.message;
  }
});

// Tab switching logic
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginFormContainer.classList.remove('hidden');
  signupFormContainer.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupFormContainer.classList.remove('hidden');
  loginFormContainer.classList.add('hidden');
});

// Optional: track auth state (redirect unauthenticated users on pages that need auth)
onAuthStateChanged(auth, user => {
  // Example: if on dashboard and not logged in, redirect to login
  // if (window.location.pathname === '/dashboard' && !user) window.location.href = '/auth';
  console.log('Auth changed, user:', user ? user.email : null);
});
