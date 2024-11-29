// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app); // Initialize Firestore

// Login Form Submission
document.querySelector('.login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    // Retrieve user inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Sign in user with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log('User logged in:', user.uid); // Debugging: Log the user UID

        // Query the Firestore collections to find the user based on their UID
        const studentsQuery = query(collection(db, "students"), where("userId", "==", user.uid));
        const teachersQuery = query(collection(db, "teachers"), where("userId", "==", user.uid));

        const studentSnapshot = await getDocs(studentsQuery);
        const teacherSnapshot = await getDocs(teachersQuery);

        if (!studentSnapshot.empty) {
            console.log('Student record found:', studentSnapshot.docs[0].data()); // Debugging
            alert('Login successful! Redirecting to Student Dashboard.');
            window.location.href = "student-dashboard.html"; // Student dashboard redirection
        } else if (!teacherSnapshot.empty) {
            console.log('Teacher record found:', teacherSnapshot.docs[0].data()); // Debugging
            const teacherDoc = teacherSnapshot.docs[0];
            const teacherData = teacherDoc.data();

            // Fetch current status of the teacher from Firestore (if it exists)
            const status = teacherData.status || "No status set"; // Default if no status exists

            alert('Login successful! Redirecting to Teacher Dashboard.');
            window.location.href = "teacher-dashboard.html"; // Teacher dashboard redirection

            // Assuming you want to allow the teacher to update their status directly from the dashboard
            document.getElementById('teacher-status').innerText = status; // Display current status

            // Handle status update
            document.getElementById('update-status-btn').addEventListener('click', async () => {
                const newStatus = document.getElementById('teacher-status-input').value;
                if (newStatus) {
                    try {
                        // Update status in Firestore
                        await updateDoc(doc(db, "teachers", teacherDoc.id), {
                            status: newStatus
                        });

                        // Reflect the updated status in the UI
                        document.getElementById('teacher-status').innerText = newStatus;
                        alert('Status updated successfully!');
                    } catch (error) {
                        console.error('Error updating status:', error);
                        alert('Failed to update status: ' + error.message);
                    }
                } else {
                    alert('Please enter a new status.');
                }
            });
        } else {
            console.error('User role not found in Firestore.'); // Debugging
            alert('User role not found. Please contact admin.');
        }
    } catch (error) {
        console.error('Error logging in:', error); // Debugging
        alert('Login failed: ' + error.message);
    }
});
