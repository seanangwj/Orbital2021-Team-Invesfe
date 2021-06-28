import React from "react";
import { Pie } from "react-chartjs-2";
import { useState } from "react";
import "../styles/Portfolio.css";

function PortfolioChart(props) {
  const { stocks} = props;
  const stockNames = stocks.map((stock) => stock.symbol);
  const stockValue = stocks.map((stock) => stock.amount);
  const colors = stocks.map((stock)=> stock.color);
  
  const state = {
    labels: stockNames,
    datasets: [
      {
        label: "# of votes",
        data: stockValue,
        backgroundColor: colors,
        borderWidth: 1,
        cx: 400,
        cy: 400
        
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
      },
      title: {
        text: "Portfolio",
        display: false,
        fontSize: 100,
      },
    },
  };

  return (
    <div className="pie">
      <Pie data={state} options={options} cx={400} cy={400} />
    </div>
  );
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  export default PortfolioChart;