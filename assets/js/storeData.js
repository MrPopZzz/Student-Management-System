import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const db = getFirestore();

// Store teacher data
// addDoc(collection(db, "teachers"), {
//     name: "Dr. Shefalika Ghosh Samaddar",
//     type: "Full-Time",
//     employeeId: "2022-001",
//     department: "Cloud Computing",
//     email: "shefalikasamaddar@gmail.com"
// }).then(() => {
//     console.log("Teacher added to Firestore");
// }).catch((error) => {
//     console.error("Error adding teacher: ", error);
// });

// Store student data
// addDoc(collection(db, "students"), {
//     name: "Sayan Chakraborty",
//     session: "2019-2023",
//     type: "Full-Time",
//     rollNumber: "25500119006",
//     department: "Computer Science",
//     email: "chakrabortysayan.36.sc@gmail.com"
// }).then(() => {
//     console.log("Student added to Firestore");
// }).catch((error) => {
//     console.error("Error adding student: ", error);
// });

