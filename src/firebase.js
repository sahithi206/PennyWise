import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCyd-C40ILry9WGI65OxlvOGQedeeS2gw",
  authDomain: "pennywise-bf051.firebaseapp.com",
  projectId: "pennywise-bf051",
  storageBucket: "pennywise-bf051.appspot.com",
  messagingSenderId: "1045774689651",
  appId: "1:1045774689651:web:9d587afb0eb233cded1106",
  measurementId: "G-F2DCZNXYN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db,analytics, auth, provider, doc, setDoc };