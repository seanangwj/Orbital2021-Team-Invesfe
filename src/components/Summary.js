import * as React from "react";
import "../styles/CompoundInterest.css";

function toNumber(value) {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Summary({ period, data }) {
  return (
    <>
      <h2 id="subheader">Summary</h2>
      
        <div id="summary">In {period} years, you will have ${toNumber(data[data.length - 1].value)}</div> 
      
      <br></br><h3 id="subheader">Breakdown</h3>
      <table className = "summary-table">
        <thead>
          <tr>
            <th scope="col">End of Year</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ label, value }) => (
            <tr key={label}>
              <td>{label}</td>
              <td>${value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Summary;