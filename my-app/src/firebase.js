// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCT5UGBHFsvkMkwWo0q_42ZYppnyaR3-Is",
	authDomain: "stepventure-716ce.firebaseapp.com",
	projectId: "stepventure-716ce",
	storageBucket: "stepventure-716ce.appspot.com",
	messagingSenderId: "483149006038",
	appId: "1:483149006038:web:da86cfb7372c207d6bb577",
	measurementId: "G-1F8RY3L84S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage };
