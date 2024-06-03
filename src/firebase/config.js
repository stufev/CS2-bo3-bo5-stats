import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwkXZ60paKeFnJ68IccheenpEUtgTazY4",
    authDomain: "cs2-stats.firebaseapp.com",
    projectId: "cs2-stats",
    storageBucket: "cs2-stats.appspot.com",
    messagingSenderId: "693263018594",
    appId: "1:693263018594:web:cc6d489b93cf20f4cbbf3b",
    measurementId: "G-PVDQ44PTH4"
};

// init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();

export {projectAuth, projectFirestore}