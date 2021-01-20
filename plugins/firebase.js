import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAMKC26iV5nkeIS0NIc68YatFJtIkCiYlA",
    authDomain: "weblibrary-38190.firebaseapp.com",
    projectId: "weblibrary-38190",
    storageBucket: "weblibrary-38190.appspot.com",
    messagingSenderId: "896997788344",
    appId: "1:896997788344:web:416875ced1c8a82d16824d",
    measurementId: "G-81RRS0ZQT8"
  })
}

export default firebase
