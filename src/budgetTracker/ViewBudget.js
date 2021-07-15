import React from 'react';

const ViewBudget = (props) => {
	return (
		<>
		<div className='budget-summary'>
			<span>Budget: ${props.budget}</span>
			<br></br>
			<span> Needs: ${props.needs/100 * props.budget} </span>
			<br></br>
			<span> Wants: ${props.wants/100 * props.budget} </span>
			<br></br>
			<span> Financial Goals: ${props.financialGoals/100 * props.budget} </span>
			
			</div>
		</>
	);
};

export default ViewBudget;