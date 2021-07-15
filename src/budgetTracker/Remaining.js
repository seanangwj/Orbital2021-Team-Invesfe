
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { db, fire } from "../config/Firebase.js";
import { UserContext} from "../components/UserContext";

const RemainingBudget = (props) => {
	const { expenses } = useContext(AppContext);
	const { budget, needs, wants, financialGoals } = props;
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

	const totalExpenses = state.reduce((total, item) => {
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


	const alertType = totalExpenses > budget? 'alert-danger' : 'alert-success';

	return (
		<div class={`alert p-4 ${alertType}`}>
			<span>Remaining: ${budget- totalExpenses}</span>
			<br></br>
			<span> Needs: ${needs/100 * budget - needExpenses}</span>
			<br></br>
			<span> Wants: ${wants/100 * budget - wantExpenses}</span>
			<br></br>
			<span> Financial Goals: ${financialGoals/100 * budget - financialExpenses}</span>
		</div>
	);
};

export default RemainingBudget;