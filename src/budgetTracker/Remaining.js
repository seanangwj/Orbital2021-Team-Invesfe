
import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const RemainingBudget = (props) => {
	const { expenses } = useContext(AppContext);
	const {budget} = props;

	const totalExpenses = expenses.reduce((total, item) => {
		return (total += item.cost);
	}, 0);

	const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

	return (
		<div class={`alert p-4 ${alertType}`}>
			<span>Remaining: ${budget - totalExpenses}</span>
		</div>
	);
};

export default RemainingBudget;