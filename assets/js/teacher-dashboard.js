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
const db = getFirestore(app); 




onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User logged in:', user); 
        displayTeacherInfo(user);
    } else {
        console.log('No user logged in');
        window.location.href = "login.html";
    }
});

function displayTeacherInfo(user) {
    
    const teacherRef = collection(db, "teachers");
    const q = query(teacherRef, where("userId", "==", user.uid));

   
    getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
            const teacherData = querySnapshot.docs[0].data();
            console.log('Teacher data:', teacherData);
            document.getElementById("teacher-name").textContent = teacherData.name; 
        } else {
            console.log("No teacher data found!");
        }
    }).catch((error) => {
        console.error("Error fetching teacher data: ", error);
    });
}
