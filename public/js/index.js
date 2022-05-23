// Arquivo de typescript principal
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { firebaseConfig } from "./config.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const RestaurantesQuerySnapshot = await getDocs(collection(db, "restaurantes"));

const section = document.getElementById('restaurantes');

RestaurantesQuerySnapshot.forEach((doc) => {
    const res = doc.data();

    let a = document.createElement('a');
    let img = document.createElement('img');
    let span = document.createElement('span');

    img.src = res.imagem;
    span.textContent = res.nome;
    a.appendChild(img);
    a.appendChild(span);

    a.href = `pages/${doc.id}.html`;

    section.appendChild(a);
});

