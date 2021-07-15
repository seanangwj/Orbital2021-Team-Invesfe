import React, { useContext, useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "./AppContext";
import { db, fire } from "../config/Firebase.js";
import { UserContext } from "../components/UserContext";
import { IfFirebaseAuthed } from "@react-firebase/auth";
import { useHistory } from "react-router";

const ExpenseList = () => {
  const { expenses } = useContext(AppContext);
  const [state, setState] = useState(expenses);
  const currentUser = useContext(UserContext);
  let history = useHistory();

  const [filteredExpenses, setfilteredExpenses] = useState(state || []);

  useEffect(() => {
    setfilteredExpenses(state);
  }, [state]);

  useEffect(() => {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("budget")
        .child("budgettracker")
        .child("expenseTotal")
        .on("value", (snapshot) => {
          const array = snapshot.val();
          if (array != null) {
            setState(array.expenses);
          }
        });
    }
  }, []);

  const handleChange = (event) => {
    const searchResults = state.filter((filteredExpense) =>
      filteredExpense.name.toLowerCase().includes(event.target.value)
    );
    setfilteredExpenses(searchResults);
  };
  const handleReset = () => {
    if (window.confirm("Are you sure to reset?")) {
		window.location.reload();
		// history.go(0);
      if (currentUser != null) { 
        db.child("users")
          .child(currentUser.uid)
          .child("budget")
          .child("budgettracker")
          .child("expenseTotal")
          .set([])
      }
    }
  };
  return (
    <>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        placeholder="Type to search..."
        onChange={handleChange}
      />

      <ul class="list-group mt-3 mb-3">
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            id={expense.id}
            name={expense.name}
            cost={expense.cost}
          />
        ))}
      </ul>

      <IfFirebaseAuthed>
        <button className="reset-btn" onClick={() => handleReset()}>
          Reset
        </button>
      </IfFirebaseAuthed>
    </>
  );
};

export default ExpenseList;
