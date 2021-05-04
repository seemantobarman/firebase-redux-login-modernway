import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBVHWjCSX9q0pRo3r1DaNz0ytLkXs9WpRo",
	authDomain: "redux-firebase-login-67638.firebaseapp.com",
	projectId: "redux-firebase-login-67638",
	storageBucket: "redux-firebase-login-67638.appspot.com",
	messagingSenderId: "88618323211",
	appId: "1:88618323211:web:6274de996a1a226691a60e",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
