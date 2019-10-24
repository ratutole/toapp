import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
  const config = {
    apiKey: 'AIzaSyC5Xr_w7BqnJv3mqBgOr3uoM-332seWe1Q',
    authDomain: 'an-awesome-todo-app.firebaseapp.com',
    databaseURL: 'https://an-awesome-todo-app.firebaseio.com',
    projectId: 'an-awesome-todo-app',
    storageBucket: 'an-awesome-todo-app.appspot.com',
    messagingSenderId: '141437466359',
    appId: '1:141437466359:web:e11c3534527c1c22eb05f2',
    measurementId: 'G-PVFJZ45RPV'
  }
  firebase.initializeApp(config)
}
const fireDb = firebase.firestore()
export { fireDb }
