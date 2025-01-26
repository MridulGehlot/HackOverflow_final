  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

  const firebaseConfig = {
    apiKey: "Cannot Disclose",
    authDomain: "project-a0503.firebaseapp.com",
    projectId: "project-a0503",
    storageBucket: "project-a0503.firebasestorage.app",
    messagingSenderId: "104700283996",
    appId: "1:104700283996:web:4957e00f4e117ce3972a99",
    measurementId: "G-82WXTZ39FR"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event)=>{
     event.preventDefault();
     const email=document.getElementById('email').value;
     const password=document.getElementById('password').value;
     const firstName=document.getElementById('name').value;
     const userType=document.getElementById('userType').value;
 
     const auth=getAuth();
     const db=getFirestore();
 
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential)=>{
         const user=userCredential.user;
         const userData={
             email: email,
             firstName: firstName,
             type:userType
         };
         showMessage('Account Created Successfully', 'signUpMessage');
         const docRef=doc(db, "users", user.uid);
         setDoc(docRef,userData)
         .then(()=>{
             window.location.href='index.html';
         })
         .catch((error)=>{
             console.error("error writing document", error);
 
         });
     })
     .catch((error)=>{
         const errorCode=error.code;
         if(errorCode=='auth/email-already-in-use'){
             showMessage('Email Address Already Exists !!!', 'signUpMessage');
         }
         else{
             showMessage('unable to create User', 'signUpMessage');
         }
     })
  });
