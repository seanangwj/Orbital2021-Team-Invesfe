import * as React from "react";
import ReactDOM from "react-dom";
import VariablesForm from "./VariablesForm";
import CompoundInterestChart from "./CompoundInterestChart";

import NavBar from "./Navbar";
import "../styles/CompoundInterest.css";
import { useEffect, useContext, useState } from "react";
import { db, fire } from "../config/Firebase.js";
import { UserContext } from "./UserContext";

function CompoundInterest() {
  const [state, setState] = useState({
    initialAmount: 4000,
    period: 10,
    growthRate: 5,
    yearlyContribution: 1000,
  });
  const currentUser = useContext(UserContext);

  // useEffect(() => {
  //   if (currentUser != null) {
  //     db.child("users").child(currentUser.uid).child("compound").set(state);
  //   }
  // });

  const updateVariables = (variables) => {
    setState(variables);
    if (currentUser != null) {
      db.child("users").child(currentUser.uid).child("compound").set(variables);
    }
  };

  return (
    <div>
      <section className="header">
        <NavBar />
      </section>
      <div className="title">Compound Growth Calculator</div>
      <VariablesForm updateVariables={updateVariables} state={state} />
      <hr />
      <CompoundInterestChart state={state} />
    </div>
  );
}

export default CompoundInterest;
