import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDcic87iqAlFwpSuthLXVyHcOF6Gfo3s5c",
    authDomain: "reddit-ana.firebaseapp.com",
    databaseURL: "https://reddit-ana.firebaseio.com",
    projectId: "reddit-ana",
    storageBucket: "reddit-ana.appspot.com",
    messagingSenderId: "372108865404"
  };
  
  firebase.initializeApp(config);
  
  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  // firebase.database().ref().set({
  //   name:"Mickey"
  // });

  // firebase.database().ref().set({
  //   name:"ok"
  // });
  export { firebase, googleAuthProvider, database as default };

  
