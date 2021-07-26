import React, { Component } from "react";
import Home from "./Home";
import Budget from "./components/Budget";
import CompoundInterest from "./components/CompoundInterest";
import IntrinsicValue from "./components/IntrinsicValue";
import Portfolio from "./components/Portfolio";
import AboutUs from "./webpages/AboutUs";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/budget" component={Budget} />
        <Route exact path="/compoundinterest" component={CompoundInterest} />
        <Route exact path="/intrinsicvalue" component={IntrinsicValue} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route exact path="/aboutus" component={AboutUs} />
      </Router>
    </div>
  );
}

export default App;
