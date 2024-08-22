import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRFuMGPcWAPdcQGSUp_eIW3Mvh2-ajXvg",
  authDomain: "challege-bd28e.firebaseapp.com",
  projectId: "challege-bd28e",
  storageBucket: "challege-bd28e.appspot.com",
  messagingSenderId: "354392103482",
  appId: "1:354392103482:web:441974f969ca59338eb303"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
