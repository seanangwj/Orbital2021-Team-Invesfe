import React, { useState, useEffect } from "react";
import Home from "../Home";
import { Redirect, Route, useHistory } from "react-router";
import firebase from "firebase";
import {
  FirebaseAuthConsumer,
  IfFirebaseUnAuthed,
  IfFirebaseAuthed,
} from "@react-firebase/auth";
import { Button } from "@material-ui/core";

function AuthState() {
  const provider = new firebase.auth.GoogleAuthProvider();

  let history = useHistory();

  const successLogin = () => {
    history.push("/");
  };

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => successLogin());
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => successLogin())
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <IfFirebaseUnAuthed>
        <FirebaseAuthConsumer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleGoogleSignIn()}
          >
            Sign in with Google
          </Button>
        </FirebaseAuthConsumer>
      </IfFirebaseUnAuthed>
      <IfFirebaseAuthed>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </IfFirebaseAuthed>
    </>
  );
}

export default AuthState;
