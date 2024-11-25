import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyCtdUHhU2dqtzKc_73T5gzJSwi3L-fSM7o",
    authDomain: "task-manager-app-6cb68.firebaseapp.com",
    projectId: "task-manager-app-6cb68",
    storageBucket: "task-manager-app-6cb68.firebasestorage.app",
    messagingSenderId: "473087521020",
    appId: "1:473087521020:web:ea46d695a27fa3e06c6779",
    measurementId: "G-FFJ72F9S8C"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };

export default app;
