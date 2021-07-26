import * as React from "react";
import "../styles/Budget.css";
import {useEffect, useContext, useState} from "react";
import { db, fire } from "../config/Firebase.js";
import { UserContext} from "./UserContext";

function BudgetForm(props) {
  const [state, setState] = useState(props.state);
  const currentUser = useContext(UserContext);

  // const { newIncome, newNeeds, newWants, newFinancialGoals } = state;

  useEffect(() => {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("budget")
        .on("value", (snapshot) => {
        const array = snapshot.val();
        if(array != null){
        setState(array);
        }
    });
  }}, []);

  return (
    <body>
      <div class="form-group">
        <label className="incomeBox">
          Input your Income:
          <input
            className="income"
            type="number"
            value={state.newIncome}
            min="0"
            step="0.01"
            onChange={({ target }) =>
              setState({ ...state, newIncome: Number(target.value) })
            }
            
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
            value={state.newNeeds}
            step="0.01"
            min="0"
            max="100"
            onChange={({ target }) =>
              setState({ ...state, newNeeds: Number(target.value) })
            }
            
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
            value={state.newWants}
            step="0.01"
            min="0"
            max="100"
            onChange={({ target }) =>
              setState({ ...state, newWants: Number(target.value) })
            }
            
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
            value={state.newFinancialGoals}
            step="0.01"
            min="0"
            max="100"
            onChange={({ target }) =>
              setState({ ...state, newFinancialGoals: Number(target.value) })
            }
            
          />
          <span class="validity"></span>
        </label>
        <br></br>
        <div className='row mt-3'>
        <div className='col-sm'>
        <button
          className="budget-btn"
          onClick={() =>
            canUpdate(state.newIncome, state.newNeeds, state.newWants, state.newFinancialGoals) ? (
              props.updateVariables(state)
            ) : (
              <p>Invalid Inputs </p>
            )
          }
        >
          Update Chart
        </button>
        </div>
        <div className='col-sm'>
        {canUpdate(state.newIncome, state.newNeeds, state.newWants, state.newFinancialGoals) ? (
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
