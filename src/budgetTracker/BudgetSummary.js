import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppProvider } from './AppContext';
import Budget from './Budgett';
import ExpenseTotal from './ExpenseTotal';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';
import RemainingBudget from './Remaining';

const BudgetSummary = (props) => {
	const {budget}= props;
	return (
		<AppProvider>
			<div className='container'>
				<div className='row mt-3'>
					<div className='col-sm'>
						<Budget budget={budget}  />
					</div>
					<div className='col-sm'>
						<RemainingBudget budget={budget} />
					</div>
					<div className='col-sm'>
						<ExpenseTotal budget={budget} />
					</div>
				</div>
				<h3 className='mt-3'>Expenses</h3>
				<div className='row '>
					<div className='col-sm'>
						<ExpenseList />
					</div>
				</div>
				<h3 className='mt-3'>Add Expense</h3>
				<div className='row mt-3'>
					<div className='col-sm'>
						<AddExpenseForm />
					</div>
				</div>
			</div>
		</AppProvider>
	);
};

export default BudgetSummary;