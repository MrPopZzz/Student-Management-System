// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app); // Initialize Firestore

// Reference to the attendance collection in Firestore
const attendanceRef = collection(db, "attendance");

// Get the table body element where we will add rows
const attendanceTableBody = document.querySelector('.attendance-table tbody');

// Function to fetch and display attendance data from Firestore
async function loadAttendance() {
    const querySnapshot = await getDocs(attendanceRef);
    attendanceTableBody.innerHTML = ""; // Clear the table before adding data

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${data.studentName}</td>
            <td>${data.studentId}</td>
            <td>${data.date}</td>
            <td>${data.status}</td>
        `;
        attendanceTableBody.appendChild(row);
    });
}

// Handle form submission to add attendance data to Firestore
const form = document.getElementById('attendance-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    try {
        await addDoc(attendanceRef, {
            studentName,
            studentId,
            date,
            status
        });

        // After adding, reload the table to show the new record
        loadAttendance();
        alert("Attendance added successfully!");

        // Reset the form
        form.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("There was an error adding the attendance.");
    }
});

// Call the function to load attendance data when the page is loaded
loadAttendance();
