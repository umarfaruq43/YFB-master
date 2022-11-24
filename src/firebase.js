import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW2ey6he_K1-KbRR0WaTlfx9KS0t-YkEo",
  authDomain: "yfb-micro.firebaseapp.com",
  projectId: "yfb-micro",
  storageBucket: "yfb-micro.appspot.com",
  messagingSenderId: "422511545363",
  appId: "1:422511545363:web:ac445181bf4ab342e883e6",
  measurementId: "G-758BV9S41H",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
