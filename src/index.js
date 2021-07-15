import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { config } from "./config/Firebase";
import { BrowserRouter } from "react-router-dom";
import {UserProvider} from "./components/UserContext";

ReactDOM.render(
  <UserProvider>
  <FirebaseAuthProvider {...config} firebase={firebase}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </FirebaseAuthProvider>
    </UserProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

