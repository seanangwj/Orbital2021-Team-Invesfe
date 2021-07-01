import firebase from "firebase";

 const config = {
    apiKey: "AIzaSyCKzB9eIkZBXDLAtNKokpM9Wnp8AW0R43M",
    authDomain: "invesfe.firebaseapp.com",
    projectId: "invesfe",
    databaseURL:"https://invesfe-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "invesfe.appspot.com",
    messagingSenderId: "220435463781",
    appId: "1:220435463781:web:6aacbc1d3402cb0d87d08c",
    measurementId: "G-YYLT3P05MV"
};

const fire = firebase.initializeApp(config);
var db = fire.database().ref();
// export default fire;
export {config, db, fire};