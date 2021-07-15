import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { db, fire } from "../config/Firebase.js";
import { UserContext} from "../components/UserContext";

const ExpenseTotal = () => {
	const { expenses } = useContext(AppContext);
	const[state, setState] = useState(expenses);
	const currentUser = useContext(UserContext);

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
	  }}, []);
	const total = state.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	const needExpenses = state.filter((item) => item.category == 1 ).reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	const wantExpenses = state.filter((item) => item.category == 2 ).reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	const financialExpenses = state.filter((item) => item.category == 3 ).reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	return (
		<div class='alert alert-primary p-4'>
			<span>Spent so far (Total): ${total}</span>
			<br></br>
			<span>Spent so far (Needs): ${needExpenses}</span>
			<br></br>
			<span>Spent so far (Wants): ${wantExpenses}</span>
			<br></br>
			<span>Financial Goals so far: ${financialExpenses}</span>
		</div>
	);
};

export default ExpenseTotal;