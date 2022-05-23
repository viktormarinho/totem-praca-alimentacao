import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const RestaurantesQuerySnapshot = await getDocs(collection(db, "restaurantes"));

const section = document.getElementById('lanches');

const restauranteId = document.querySelector('title').textContent;

console.log(restauranteId);

