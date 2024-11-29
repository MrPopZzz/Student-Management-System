import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD06Se9M-6fndS_ew48BvFdha4ZIYpfS8",
  authDomain: "student-management-syste-ebbcb.firebaseapp.com",
  projectId: "student-management-syste-ebbcb",
  storageBucket: "student-management-syste-ebbcb.firebasestorage.app",
  messagingSenderId: "348258479097",
  appId: "1:348258479097:web:93634d40c3eebc8d06eb28",
  measurementId: "G-SZMQK1PXBT",
  databaseURL: "https://student-management-syste-ebbcb-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app);
const auth = getAuth(app);
const database = getDatabase(app);

// Function to register users
function registerUser(role, name, email, password, id) {
  // Register the user with Firebase Auth
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User registered:', user);

      // Prepare data to be stored in the database
      const userData = {
        name: name,
        email: email,
        id: id,
        role: role
      };

      // Define the database path based on the role (student or teacher)
      const userPath = role === 'student' ? `students/${id}` : `teachers/${id}`;

      // Store user data in the database
      set(ref(database, userPath), userData)
        .then(() => {
          console.log('User data stored in database successfully.');
          alert('Registration successful!');
        })
        .catch((error) => {
          console.error('Error storing user data in database:', error);
          alert('Failed to store user data. Please try again.');
        });
    })
    .catch((error) => {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    });
}

// Event listeners for registration forms
document.getElementById('student-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('student-name').value;
  const email = document.getElementById('student-email').value;
  const password = document.getElementById('student-password').value;
  const studentId = document.getElementById('student-id').value;

  registerUser('student', name, email, password, studentId);
});

document.getElementById('teacher-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('teacher-name').value;
  const email = document.getElementById('teacher-email').value;
  const password = document.getElementById('teacher-password').value;
  const teacherId = document.getElementById('teacher-id').value;

  registerUser('teacher', name, email, password, teacherId);
});

// Login Functionality
document.querySelector('.login-form')?.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission refresh

  // Retrieve user inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Sign in user with Firebase Authentication
  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // User is successfully logged in
          const user = userCredential.user;
          alert('Login successful!');

          // Redirect or perform any additional actions
          window.location.href = "home.html"; // Example redirection
      })
      .catch((error) => {
          // Handle login errors
          console.error('Error logging in:', error);
          alert('Login failed: ' + error.message);
      });
});

// Check Authentication Status (Optional)
onAuthStateChanged(auth, (user) => {
  if (user) {
      // User is signed in
      console.log('User is logged in:', user.email);
  } else {
      // User is signed out
      console.log('No user is logged in');
  }
});
