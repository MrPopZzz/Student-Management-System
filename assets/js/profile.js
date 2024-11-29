// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, query, where, doc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User logged in:', user); // Log user details
        displayProfile(user);
    } else {
        console.log('No user logged in');
        window.location.href = "login.html";
    }
});

function displayProfile(user) {
    // Get reference to the Firestore collection based on the user's email (simple check)
    const collectionName = user.email.includes("student") ? "students" : "teachers"; 

    // Get a reference to the Firestore collection
    const userRef = collection(db, collectionName);

    // Create a query to filter documents where 'userId' equals the user's UID
    const userQuery = query(userRef, where("userId", "==", user.uid));

    // Fetch the user data using the query
    getDocs(userQuery).then((querySnapshot) => {
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();  // Get the first matched document
            console.log('User data:', userData);

            // Update the profile details in the HTML
            document.getElementById("user-name").textContent = userData.name;
            document.getElementById("user-email").textContent = userData.email;
            document.getElementById("user-id").textContent = userData.rollNumber || userData.employeeId;
            document.getElementById("user-department").textContent = userData.department;
            document.getElementById("user-type").textContent = userData.type;
        } else {
            console.log("No profile data found for userId:", user.uid);
            alert("No profile data found. Please check your Firestore data.");
            
        }
    }).catch((error) => {
        console.error("Error fetching user data: ", error);
        alert("Error fetching data. Please try again.");
    });
}
