import app from "firebase/app"; // load firebase
import "firebase/auth";
import "firebase/database";

//Setup configuration
const config = {
    apiKey: "AIzaSyCdvWDFl52UO7qV7Z_0wVAycCwCUgDOYWE",
    authDomain: "ng-guide-c8eb3.firebaseapp.com",
    databaseURL: "https://ng-guide-c8eb3.firebaseio.com",
    projectId: "ng-guide-c8eb3",
    storageBucket: "ng-guide-c8eb3.appspot.com",
    messagingSenderId: "1022291821545",
};

//Class will be used to connect React with Firebase. It will be act like singleton class
class Firebase {
    constructor() {
        app.initializeApp(config); //Initialize firebase app using config
        this.auth = app.auth(); // This will help to implement authentication API in this class
        this.db = app.database(); // This will help to store/retrieve user in realtime db
    }


    /******   Below is the AUTH Interface for React Components to interact with Firebase API    *******/


    //For creating new user. It will return promise object
    doCreateUserWithEmailAndPassword(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password); //This method will belongs to firebase authentication
    }

    //For verifying user. It will return promise object
    doSignInWithEmailAndPassword(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password); //This method will belongs to firebase authentication
    }

    //For logging out user. No need to send param as Firebase is already aware of current authenticated user
    doSignOut() {
        return this.auth.signOut();
    }

    //For resetting user password. Return promise object
    doPasswordReset(email) {
        return this.auth.sendPasswordResetEmail(email);
    }

    //For updating user password. Return promise object. Require only pwd param as firebase knows current user
    doPasswordUpdate(password) {
        return this.auth.currentUser.updatePassword(password);
    }

    /****  User API ****/

    getUser = id => this.db.ref(`users/${id}`);

    getUsers = () => this.db.ref('users');
}

export default Firebase;