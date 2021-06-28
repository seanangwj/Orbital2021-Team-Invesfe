import Home from "./Home";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import Budget from "./components/Budget";
import CompoundInterest from "./components/CompoundInterest";
import IntrinsicValue from "./components/IntrinsicValue";
import Portfolio from "./components/Portfolio";
import AboutUs from "./webpages/AboutUs";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/budget" component={Budget} />
          <Route exact path="/compoundinterest" component={CompoundInterest} />
          <Route exact path="/intrinsicvalue" component={IntrinsicValue} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </>
  );
}

export default App;

// const [user, setUser] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [hasAccount, setHasAccount] = useState(false);

//   const clearInputs = () => {
//     setEmail("");
//     setPassword("");
//   };

//   const clearErrors = () => {
//     setEmailError("");
//     setPasswordError("");
//   };

//   const handleLogIn = () => {
//     clearErrors();
//     fire
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .catch((err) => {
//         switch (err.code) {
//           case "auth/invalid-email":
//           case "auth/user-disabled":
//           case "auth/user-not-found":
//             setEmailError(err.message);
//             break;
//           case "auth/wrong-password":
//             setPasswordError(err.message);
//             break;
//         }
//       });
//   };

//   const handleSignUp = () => {
//     clearErrors();
//     fire
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .catch((err) => {
//         switch (err.code) {
//           case "auth/email-already-in-use":
//           case "auth/invalid-email":
//             setEmailError(err.message);
//             break;
//           case "auth/wrong-password":
//             setPasswordError(err.message);
//             break;
//         }
//       });
//   };

//   const handleLogOut = () => {
//     fire.auth().signOut();
//   };

//   const authListener = () => {
//     fire.auth().onAuthStateChanged((user) => {
//       if (user) {
//         clearInputs();
//         setUser(user);
//       } else {
//         setUser("");
//       }
//     });
//   };

//   useEffect(() => {
//     authListener();
//   }, []);
