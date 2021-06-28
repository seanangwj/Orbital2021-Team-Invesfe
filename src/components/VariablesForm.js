import * as React from "react";
import defaultState from "./defaultState";

function VariablesForm({ onUpdate }) {
  const [state, setState] = React.useState(defaultState);

  const { initialAmount, period, growthRate, yearlyContribution } = state;

  return (
    <section>
      <div className="flex">
        <label htmlFor="initialAmount">
          <div id="text">Initial Amount ($)</div>
          <input
          className = "variables"
            type="number"
            id="initialAmount"
            min = "0"
            name="initialAmount"
            value={initialAmount}
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
            value={period}
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
            name="growthRate"
            value={growthRate}
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
            min = "0"
            name="yearlyContribution"
            value={yearlyContribution}
            onChange={({ target }) =>
              setState({ ...state, yearlyContribution: Number(target.value) })
            }
          />
          <span class="validity"></span>
        </label>
      </div>
      <button type="button" onClick={() => onUpdate(state)}>
        Update Chart
      </button>
    </section>
  );
}

export default VariablesForm;