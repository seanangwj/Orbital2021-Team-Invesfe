import React from "react";
import { Pie } from "react-chartjs-2";
import "../styles/Budget.css";
import {useEffect, useContext, useState} from "react";
import { db, fire } from "../config/Firebase.js";
import { UserContext} from "../components/UserContext";

function BudgetChart(props) {
  const [newState, setNewState] = useState(props.state);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("budget")
        .on("value", (snapshot) => {
        const array = snapshot.val();
        if(array != null){
        setNewState(array);
        }
    });
  }}, []);
  const state = {
    labels: ["Needs", "Wants", "Financial Goals"],
    datasets: [
      {
        label: "# of votes",
        data: [
          newState.newIncome * ( newState.newNeeds / 100),
          newState.newIncome * ( newState.newWants / 100),
          newState.newIncome * ( newState.newFinancialGoals / 100),
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
        labels:{
          boxHeight: 50,
          boxWidth: 60,
          padding: 10,
        }
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
