import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the necessary Firebase modules
export { db, analytics, auth, provider, doc, setDoc };
 /*
  apiKey: "AIzaSyBCyd-C40ILry9WGI65OxlvOGQedeeS2gw",
  authDomain: "pennywise-bf051.firebaseapp.com",
  projectId: "pennywise-bf051",
  storageBucket: "pennywise-bf051.appspot.com",
  messagingSenderId: "1045774689651",
  appId: "1:1045774689651:web:9d587afb0eb233cded1106",
  measurementId: "G-F2DCZNXYN9"*/

