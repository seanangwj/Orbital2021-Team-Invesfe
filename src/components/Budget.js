import  {useState, useContext } from "react";
import BudgetChart from "./BudgetChart";
import NavBar from "./Navbar";
import "../styles/Budget.css";
import BudgetForm from "./BudgetForm";
import * as React from "react";
import BudgetSummary from "../budgetTracker/BudgetSummary";
import { db, fire } from "../config/Firebase.js";
import { UserContext } from "./UserContext";

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

      <BudgetSummary
        state={state}
      />

      {/* <section className="description">
        <h2> Guide and Relative information </h2>
        <p>
          Start by indicating your disposable income and the following inputs: needs, wants and financial goals, according to your own preference.
          From this allocation, you should know roughly how much you are able to contribute to your investments. Head over to our compound growth calculator
          to see how much you can grow you money!
          <br></br>{" "}
        </p>
        <h3> Needs </h3>
        <u1>
          <li>Rent</li>
          <li>Groceries</li>
        </u1>
        <h3> Wants </h3>
        <u1>
          <li>Entertainment Services </li>
          <li>Hobbies </li>
        </u1>
        <h3> Financial Goals </h3>
        <u1>
          <li>Savings </li>
          <li>Investment </li>
        </u1>
        <p>
          {" "}
          As with all budgetting rules out there, this is only a rough guide and
          you can make your own adjustments to better suit your needs!{" "}
        </p>
      </section> */}
    </>
  );
}

export default Budget;
