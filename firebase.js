import { initializeApp } from "firebase/app";
import { addDoc, collection ,getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD4dVBdrrnuoJQcdbVYnfSIHPdnw2rzcb8",
  authDomain: "netflix-clone-2841b.firebaseapp.com",
  projectId: "netflix-clone-2841b",
  storageBucket: "netflix-clone-2841b.firebasestorage.app",
  messagingSenderId: "219623916778",
  appId: "1:219623916778:web:8e660ae84f7e7001c98393"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name: name,
        authProvider: "local",
        email: email,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async(email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = () => {
    signOut(auth);
}

export { auth, db, signup, login, logout };