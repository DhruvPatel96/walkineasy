import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAkPGLb0hk49_ltqnuzyx76506YZ1A7xL4",
	authDomain: "walk-in-easy.firebaseapp.com",
	projectId: "walk-in-easy",
	storageBucket: "walk-in-easy.appspot.com",
	messagingSenderId: "824505522690",
	appId: "1:824505522690:web:2c1e27ec3198f32942a51b",
	measurementId: "G-BXJFLW2E2S",
};

const app = initializeApp(firebaseConfig);
//DB be imported into the app whenever it is needed
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
