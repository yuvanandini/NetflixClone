import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
         getAuth, 
         signInWithEmailAndPassword, 
         signOut} from "firebase/auth";
import { addDoc, 
        collection, 
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDFTkSG3zSwKXDc7XD1ZnFFravMZ-9y9JU",
  authDomain: "netflix-clone-eed18.firebaseapp.com",
  projectId: "netflix-clone-eed18",
  storageBucket: "netflix-clone-eed18.appspot.com",
  messagingSenderId: "1035535075307",
  appId: "1:1035535075307:web:3334d02c140d4b496a3bae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=> {
    try{
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) =>{
    try{
        signInWithEmailAndPassword(auth, email, password);
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};
