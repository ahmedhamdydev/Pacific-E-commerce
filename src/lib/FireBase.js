
// import axios from "axios";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getAuth , GoogleAuthProvider, signInWithPopup} from "firebase/auth"
// import { useNavigate } from "react-router-dom";
const firebaseConfig = {
  apiKey: "AIzaSyAjX1HtEDDnsVP7wNhWsQj6IcY6m9Ljo3I",
  authDomain: "ecommerce-e4e26.firebaseapp.com",
  projectId: "ecommerce-e4e26",
  storageBucket: "ecommerce-e4e26.appspot.com",
  messagingSenderId: "1089278758138",
  appId: "1:1089278758138:web:ce5ae9a96bd597192e0d43",
  measurementId: "G-7BYQF76Q8K"
};


export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app)
// const googleProvider =new  GoogleAuthProvider()
// const userLoginWithGoogle= async(user)=>{
//   const response = await axios.post("http://localhost:3000/api/v1/auth/auth/google",user)
  
// }


// export const signInwithGoogle =()=>{
//   signInWithPopup(auth,googleProvider).then((result)=>{
//     console.log(result)
//   }).catch((error)=>{
//     console.log(error)
//   })
// }
