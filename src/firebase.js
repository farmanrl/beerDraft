import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyA--NoZ2AmvLBtE1VA2Z37sqwClC82XbYo",
  authDomain: "beerdraft-2d21e.firebaseapp.com",
  databaseURL: "https://beerdraft-2d21e.firebaseio.com",
  projectId: "beerdraft-2d21e",
  storageBucket: "beerdraft-2d21e.appspot.com",
  messagingSenderId: "357185268628"
};

firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();

export const userList = database.ref('userList/');
