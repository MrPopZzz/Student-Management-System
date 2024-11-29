// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Registration for Students
// document.querySelector('#student-form')?.addEventListener('submit', (e) => {
//     e.preventDefault(); // Prevent form submission refresh

//     // Retrieve user inputs
//     const email = document.getElementById('student-email').value;
//     const password = document.getElementById('student-password').value;

//     // Register user with Firebase Authentication
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // User is successfully registered
//             const user = userCredential.user;
//             alert('Student registration successful!');

//             // Redirect or additional actions
//             window.location.href = "login.html"; // Example redirection
//         })
//         .catch((error) => {
//             // Handle registration errors
//             console.error('Error registering student:', error);
//             alert('Registration failed: ' + error.message);
//         });
// });

// Registration for Teachers
// document.querySelector('#teacher-form')?.addEventListener('submit', (e) => {
//     e.preventDefault(); // Prevent form submission refresh

//     // Retrieve user inputs
//     const email = document.getElementById('teacher-email').value;
//     const password = document.getElementById('teacher-password').value;

//     // Register user with Firebase Authentication
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // User is successfully registered
//             const user = userCredential.user;
//             alert('Teacher registration successful!');

//             // Redirect or additional actions
//             window.location.href = "login.html"; // Example redirection
//         })
//         .catch((error) => {
//             // Handle registration errors
//             console.error('Error registering teacher:', error);
//             alert('Registration failed: ' + error.message);
//         });
// });







// Registration for Students
document.querySelector('#student-form')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    // Retrieve user inputs
    const email = document.getElementById('student-email').value;
    const password = document.getElementById('student-password').value;
    const name = document.getElementById('student-name').value; // Add a name field in your form
    const department = document.getElementById('student-department').value; // Department field
    const rollNumber = document.getElementById('student-roll').value; // Roll Number

    try {
        // Register user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('Student registration successful!');

        // Store additional data in Firestore
        await addDoc(collection(db, "students"), {
            userId: user.uid, // Link Firestore data to the user
            name,
            email,
            department,
            rollNumber,
            type: "Full-Time"
        });

        // Redirect or additional actions
        window.location.href = "login.html";
    } catch (error) {
        // Handle registration errors
        console.error('Error registering student:', error);
        alert('Registration failed: ' + error.message);
    }
});

// Registration for Teachers
document.querySelector('#teacher-form')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    // Retrieve user inputs
    const email = document.getElementById('teacher-email').value;
    const password = document.getElementById('teacher-password').value;
    const name = document.getElementById('teacher-name').value; // Name field in your form
    const department = document.getElementById('teacher-department').value; // Department field
    const employeeId = document.getElementById('teacher-id').value; // Employee ID field

    try {
        // Register user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('Teacher registration successful!');

        // Store additional data in Firestore
        await addDoc(collection(db, "teachers"), {
            userId: user.uid, // Link Firestore data to the user
            name,
            email,
            department,
            employeeId,
            type: "Full-Time"
        });

        // Redirect or additional actions
        window.location.href = "login.html";
    } catch (error) {
        // Handle registration errors
        console.error('Error registering teacher:', error);
        alert('Registration failed: ' + error.message);
    }
});