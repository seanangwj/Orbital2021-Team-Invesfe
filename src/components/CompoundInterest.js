import * as React from "react";
import ReactDOM from "react-dom";

import VariablesForm from "./VariablesForm";
import CompoundInterestChart from "./CompoundInterestChart";

import defaultState from "./defaultState";
import NavBar from "./Navbar";
import "../styles/CompoundInterest.css";

function CompoundInterest() {
  const [state, setState] = React.useState(defaultState);

  return (
    <div>
      <section className="header">
        <NavBar />
      </section>
      <div className ="title">Compound Growth Calculator</div>
      <VariablesForm onUpdate={(variables) => setState(variables)} />
      <hr />
      <CompoundInterestChart {...state} />
    </div>
  );
}

export default CompoundInterest;
