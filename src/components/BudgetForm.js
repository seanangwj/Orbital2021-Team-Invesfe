import * as React from "react";
import defaultState from "./defaultStateBudget";
import "../styles/Budget.css";

function BudgetForm({ onUpdate }) {
  const [state, setState] = React.useState(defaultState);

  const { newIncome, newNeeds, newWants, newFinancialGoals } = state;

  return (
    <body>
      <div class="form-group">
        <label className="incomeBox">
          Input your Income:
          <input
            className="income"
            type="number"
            value={newIncome}
            min="0"
            onChange={({ target }) =>
              setState({ ...state, newIncome: Number(target.value) })
            }
            readonly
          />
          <span class="validity"></span>
        </label>
      </div>
      <br></br>
      <div class="text">Percentage of allocations in your Budget</div>
      <br></br>
      <div class="form-group">
        <label className="budgetBox">
          Input your % of Needs:
          <input
            className="budget"
            type="number"
            value={newNeeds}
            min="0"
            max="100"
            onChange={({ target }) =>
              setState({ ...state, newNeeds: Number(target.value) })
            }
            readonly
          />
          <span class="validity"></span>
        </label>
      </div>
      <div class="form-group">
        <label className="budgetBox">
          Input your % of Wants:
          <input
            className="budget"
            type="number"
            value={newWants}
            min="0"
            max="100"
            onChange={({ target }) =>
              setState({ ...state, newWants: Number(target.value) })
            }
            readonly
          />
          <span class="validity"></span>
        </label>
      </div>
      <div class="form-group">
        <label className="budgetBox">
          Input your % of Financial Goals:
          <input
            class="budget"
            type="number"
            value={newFinancialGoals}
            min="0"
            max="100"
            onChange={({ target }) =>
              setState({ ...state, newFinancialGoals: Number(target.value) })
            }
            readonly
          />
          <span class="validity"></span>
        </label>
        <br></br>
        <div className='row mt-3'>
        <div className='col-sm'>
        <button
          className="budget-btn"
          onClick={() =>
            canUpdate(newIncome, newNeeds, newWants, newFinancialGoals) ? (
              onUpdate(state)
            ) : (
              <p>Invalid Inputs </p>
            )
          }
        >
          Update Chart
        </button>
        </div>
        <div className='col-sm'>
        {canUpdate(newIncome, newNeeds, newWants, newFinancialGoals) ? (
          <p id="terms">Valid Inputs</p>
        ) : (
          <p id="terms">Invalid Inputs, please ensure the allocation adds up to 100% </p>
        )}
          </div>
          </div>
      </div>
    </body>
  );
}

function canUpdate(newIncome, newNeeds, newWants, newFinancialGoals) {
  return (
    newNeeds >= 0 &&
    newNeeds <= 100 &&
    newWants >= 0 &&
    newWants <= 100 &&
    newFinancialGoals >= 0 &&
    newFinancialGoals <= 100 &&
    newIncome >= 0 &&
    newNeeds + newWants + newFinancialGoals === 100
  );
}

export default BudgetForm;
