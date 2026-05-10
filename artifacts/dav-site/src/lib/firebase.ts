import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdJPsAPlW8ugiLfDfYg-M9gTdMfk8k0RE",
  authDomain: "d-a-v-backend-server.firebaseapp.com",
  projectId: "d-a-v-backend-server",
  storageBucket: "d-a-v-backend-server.firebasestorage.app",
  messagingSenderId: "114379042903",
  appId: "1:114379042903:web:0ff1bac1413ea02f89b312",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
