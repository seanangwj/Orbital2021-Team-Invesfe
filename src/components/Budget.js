import  {useState, useContext } from "react";
import BudgetChart from "./BudgetChart";
import NavBar from "./Navbar";
import "../styles/Budget.css";
import BudgetForm from "./BudgetForm";
import * as React from "react";
import BudgetSummary from "../budgetTracker/BudgetSummary";
import { db, fire } from "../config/Firebase.js";
import { UserContext } from "./UserContext";
import { IfFirebaseAuthed } from "@react-firebase/auth";

function Budget() {
  const [state, setState] = useState({newIncome: 4000,
    newNeeds: 50,
    newWants: 30,
    newFinancialGoals: 20
  })
  const currentUser = useContext(UserContext);

  const updateVariables = (variables) => {
    setState(variables)
    if (currentUser != null) {
      db.child("users")
    .child(currentUser.uid)
    .child("budget")
    .set(variables)
    }
  }
  return (
    <>
      <section className="header">
        <NavBar />
      </section>
      <div className="title">Budget Planner</div>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Inputs</th>
            <th>Pie Chart</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <BudgetForm updateVariables={updateVariables} state={state} />
              <br></br>
              <div id="note">
                *Note: Ensure that the percetages of allocations adds up to
                100%.*
                <br></br>Hover on the Pie Chart to view the breakdown.
              </div>
            </td>
            <td>
              <BudgetChart
                style={{ height: "1000px", width: "1000px" }}
                state={state}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <IfFirebaseAuthed>

      <BudgetSummary
        state={state}
      />
      </IfFirebaseAuthed>

      
    </>
  );
}

export default Budget;
