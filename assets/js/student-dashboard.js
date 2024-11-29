// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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



// Assuming user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User logged in:', user); // Log user details
        displayStudentInfo(user);
    } else {
        console.log('No user logged in');
        window.location.href = "login.html";
    }
});

function displayStudentInfo(user) {
    // Use the `userId` from Firebase Authentication to search in Firestore
    const studentRef = collection(db, "students");
    const q = query(studentRef, where("userId", "==", user.uid));

    // Get the document where the userId matches the Firebase uid
    getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
            const studentData = querySnapshot.docs[0].data();
            console.log('Student data:', studentData);
            document.getElementById("student-name").textContent = studentData.name; // Display student name
        } else {
            console.log("No student data found!");
        }
    }).catch((error) => {
        console.error("Error fetching student data: ", error);
    });
}
