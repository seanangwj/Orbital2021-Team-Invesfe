import "../styles/Intrinsic.css";
import NavBar from "./Navbar";
import { Paper } from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import IntrinsicForm from "./IntrinsicForm";
import {db} from "../config/Firebase.js";

function IntrinsicValue() {
  var [currentId, setCurrentId] = useState("");
  var [intrinsicObjects, setIntrinsicObjects] = useState({});

  useEffect(() => {
    db.child('intrinsic').on('value', snapshot => {
        if (snapshot.val() != null) {
            setIntrinsicObjects({
                ...snapshot.val()
            });
        }
    })
}, [])

const addOrEdit = (obj) => {
  if (currentId == '')
      db.child('intrinsic').push(
          obj,
          err => {
              if (err)
                  console.log(err)
              else
                  setCurrentId('')
          })
  else
      db.child(`intrinsic/${currentId}`).set(
          obj,
          err => {
              if (err)
                  console.log(err)
              else
                  setCurrentId('')
          })
}

const onDelete = id => {
  if (window.confirm('Are you sure to delete this record?')) {
      db.child(`intrinsic/${id}`).remove(
          err => {
              if (err)
                  console.log(err)
              else
                  setCurrentId('')
          })
  }
}

  return (
    <>
      <section className="header">
        <NavBar />
      </section>
      <div className="title">Valuation Model</div>
      <Paper className="box" elevation={3}>
        <div className="intrinsic-guide">
          In this valuation model, we are following a discounted cash flow model
          used to estimate the instrinsic value of an investment based on its
          expected future cash flow. This analysis figures out the value of an
          investment based on projections of how much cash a company will
          generate in future. We will be using free cash flow to equity as a
          measure of how much cash is available to equity shareholder of a
          company after all the cash inflows and outflows. There are many more
          valuation models out there and this model is just a basic and simple
          version to help new investors get a sensing of trying to value a
          company. It is not guaranteed that this model would be accurate as
          this is just a projection based on each individual analysis. To start,
          hover your cursor over the ? icon at each financial term to understand
          them and also figure out how to find these data on the company's
          financial reports. After keying in all the data, the table will
          display the cash flow projections for the next 5 years. The final
          intrinsic value per share of a company can be found at the bottom
          highlighted in red. Note that all input values are in the millions.
        </div>
      </Paper>
      <br></br>
      <IntrinsicForm {...({ currentId, intrinsicObjects, addOrEdit })} />

      <table className="valuation-bottom-table">
                        <thead>
                            <tr>
                                <th>Ticker Symbol</th>
                                <th>Intrinsic Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(intrinsicObjects).map((key) => (
                                    <tr key={key}>
                                        <td>{intrinsicObjects[key].ticker}</td>
                                        <td>{intrinsicObjects[key].intrinsicps}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={() => { setCurrentId(key) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(key) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>


    </>
  );
}

export default IntrinsicValue;
