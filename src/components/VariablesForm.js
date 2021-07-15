import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { db, fire } from "../config/Firebase.js";
import { UserContext} from "./UserContext";

function VariablesForm(props) {
  // const variableArray = props.state;
  const [state, setState] = useState(props.state)
  const currentUser = useContext(UserContext);

  useEffect(() => {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("compound")
        .on("value", (snapshot) => {
        const array = snapshot.val();
        setState(array);
    });
  }}, []);

  // const { initialAmount, period, growthRate, yearlyContribution } = state;

  return (
    <section>
      <div className="flex">
        <label htmlFor="initialAmount">
          <div id="text">Initial Amount ($)</div>
          <input
          className = "variables"
            type="number"
            id="initialAmount"
            step="0.01"
            min = "0"
            name="initialAmount"
            value={state.initialAmount}
            onChange={({ target }) => setState({ ...state, initialAmount: Number(target.value) })}
          />
          <span class="validity"></span>
        </label>
        <label htmlFor="period">
        <div id="text">Investment Period (Years)</div>
          <input
          className = "variables"
            type="number"
            id="period"
            min = "0"
            name="period"
            value={state.period}
            onChange={({ target }) => setState({ ...state, period: Number(target.value) })}
          />
          <span class="validity"></span>
        </label>
        <label htmlFor="growthRate">
        <div id="text">Annual Growth Rate (%)</div>
          <input
          className = "variables"
            type="number"
            id="growthRate"
            min = "0"
            step="0.01"
            name="growthRate"
            value={state.growthRate}
            onChange={({ target }) => setState({ ...state, growthRate: Number(target.value) })}
          />
          <span class="validity"></span>
        </label>
        <label htmlFor="yearlyContribution">
        <div id="text">Yearly Contribution ($)</div>
          <input
          className = "variables"
            type="number"
            id="yearlyContribution"
            step="0.01"
            min = "0"
            name="yearlyContribution"
            value={state.yearlyContribution}
            onChange={({ target }) =>
              setState({ ...state, yearlyContribution: Number(target.value) })
            }
          />
          <span class="validity"></span>
        </label>
      </div>
      <button type="button" onClick={() => props.updateVariables(state)}>
        Update Chart
      </button>
    </section>
  );
}

export default VariablesForm;