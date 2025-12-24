import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAmqmbJ0RtTXq2tK_SQV_pdiVUE3SejDzE",
  authDomain: "netflix-clone-e9b7a.firebaseapp.com",
  projectId: "netflix-clone-e9b7a",
  storageBucket: "netflix-clone-e9b7a.firebasestorage.app",
  messagingSenderId: "922582185272",
  appId: "1:922582185272:web:38a7ced78b54fb11aebdcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signUp = async (name,email,password)=>{
    try{

        const res = await createUserWithEmailAndPassword(auth, email, password) 
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        })
    
    }catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email,password)=>{
    try{
        return await signInWithEmailAndPassword (auth , email, password);

    }catch(error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(' '));

    }
}

const logout = () =>{
    signOut(auth);
}

export { auth , db , login , signUp, logout}