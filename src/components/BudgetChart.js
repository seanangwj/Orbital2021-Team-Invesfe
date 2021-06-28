import React from "react";
import { Pie } from "react-chartjs-2";
import "../styles/Budget.css";

function BudgetChart({ newIncome, newNeeds, newWants, newFinancialGoals }) {
  const state = {
    labels: ["Needs", "Wants", "Financial Goals"],
    datasets: [
      {
        label: "# of votes",
        data: [
          newIncome * (newNeeds / 100),
          newIncome * (newWants / 100),
          newIncome * (newFinancialGoals / 100),
        ],
        backgroundColor: ["#2adece", "#dd3b79", "#ff766b"],
        borderWidth: 1,
        cx:400,
        cy:400,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align:"center",
        boxWidth: 800,
        boxHeight: 600,
      },
      title: {
        text: "Budget Pie Chart",
        display: false,
        fontSize: 100,
      },
    },
  };

  return (
    <Pie className="pie" data={state} options={options} cx={400} cy={400} />
  );
}

export default BudgetChart;
