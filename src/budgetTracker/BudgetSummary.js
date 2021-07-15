import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./AppContext";
import Budget from "./Budgett";
import ExpenseTotal from "./ExpenseTotal";
import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";
import RemainingBudget from "./Remaining";
import {useEffect, useContext, useState} from "react";
import { db, fire } from "../config/Firebase.js";
import { UserContext} from "../components/UserContext";


const BudgetSummary = (props) => {
  const [state, setState] = useState(props.state);
  const currentUser = useContext(UserContext);


  useEffect(() => {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("budget")
        .on("value", (snapshot) => {
        const array = snapshot.val();
        setState(array);
    });
  }}, []);
  
  // const { budget, needs, wants, financialGoals } = props.state;
  return (
    <AppProvider>
      <div className="container">
        <div className="row mt-3">
          <div className="col-sm">
            <Budget
              budget={state.newIncome}
              needs={state.newNeeds}
              wants={state.newWants}
              financialGoals={state.newFinancialGoals}
            />
            </div>
            <div className='col-sm'>
						<RemainingBudget budget={state.newIncome} needs={state.newNeeds}
            wants={state.newWants}
            financialGoals={state.newFinancialGoals} />
					</div>
					<div className='col-sm'>
						<ExpenseTotal budget={state.newIncome} needs={state.newNeeds}
            wants={state.newWants}
            financialGoals={state.newFinancialGoals}/>
					</div>
				</div>
				<h3 className='mt-3'>Expenses</h3>
				<div className='row '>
					<div className='col-sm'>
						<ExpenseList />
					</div>
				</div>

        <h3 className="mt-3">Add Expense</h3>
        <div className="row mt-3">
          <div className="col-sm">
            <AddExpenseForm />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default BudgetSummary;
