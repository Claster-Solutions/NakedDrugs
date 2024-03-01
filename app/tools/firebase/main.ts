// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDf4EtJPth5z7POqpj12iBiaunyO8dKi6A',
    authDomain: 'naked-drugs.firebaseapp.com',
    projectId: 'naked-drugs',
    storageBucket: 'naked-drugs.appspot.com',
    messagingSenderId: '552641252152',
    appId: '1:552641252152:web:7d08083a67fd66c5f0cfcd',
    measurementId: 'G-WJ9M3RFY9W',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app)
export const usersCollection = collection(firestore, 'users')
// blog collection
export const blogCollection = collection(firestore, 'blogs')
export const auth = getAuth(app)
export const firestorage = getStorage(app)
