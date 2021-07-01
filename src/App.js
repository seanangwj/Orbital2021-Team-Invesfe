import React, { Component } from "react";
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
import { fire } from "./config/Firebase";

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: null,
  //   };

  //   this.authListener = this.authListener.bind(this);
  // }

  // componentDidMount() {
  //   this.authListener();
  // }

  // authListener() {

  //   fire.auth().onAuthStateChanged((user) => {
  //     console.log(user);
  //     if (user) {
  //       this.setState({ user });
  //     } else {
  //       this.setState({ user: null });
  //     }
  //   });
  // }

  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/budget" component={Budget} />
          <Route exact path="/compoundinterest" component={CompoundInterest} />
          <Route exact path="/intrinsicvalue" component={IntrinsicValue} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

export default App;
