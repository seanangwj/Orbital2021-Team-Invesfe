import "../styles/Intrinsic.css";
import NavBar from "./Navbar";
import { Paper, makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import React, { useState, useEffect, useContext } from "react";
import IntrinsicForm from "./IntrinsicForm";
import { db, fire } from "../config/Firebase.js";
import { UserContext } from "./UserContext";
import { IfFirebaseAuthed } from "@react-firebase/auth";

function IntrinsicValue() {
  var [currentId, setCurrentId] = useState("");
  var [intrinsicObjects, setIntrinsicObjects] = useState({});

  const currentUser = useContext(UserContext);


  useEffect(() => {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("intrinsic")
        .on("value", (snapshot) => {
          // if (snapshot.val() != null) {
            setIntrinsicObjects({
              ...snapshot.val(),
            });
          // }
        });
    }
  }, []);

  const addOrEdit = (obj) => {
    if (currentId == "")
      db.child("users")
        .child(currentUser.uid)
        .child("intrinsic")
        .push(obj, (err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
    else
      db.child("users")
        .child(currentUser.uid)
        .child(`intrinsic/${currentId}`)
        .set(obj, (err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      db.child("users")
        .child(currentUser.uid)
        .child(`intrinsic/${id}`)
        .remove((err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
    }
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: grey[400],
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 50%), 0px 3px 4px 0px rgb(0 0 0 / 50%), 0px 1px 8px 0px rgb(0 0 0 / 70%)",
      padding: "20px",
      margin: "20px",
      maxWidth: "100%",
    },
    greypaper: {
      backgroundColor: grey[300],
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 50%), 0px 3px 4px 0px rgb(0 0 0 / 50%), 0px 1px 8px 0px rgb(0 0 0 / 70%)",
      padding: "20px",
      margin: "20px",
      maxWidth: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <section className="header">
        <NavBar />
      </section>
      <div className="title">Valuation Model</div>
      <Paper className={classes.paper} elevation={4}>
        <div className="intrinsic-guide">
          <ul>
            <li>
              In this valuation model, we are following a{" "}
              <a
                href="https://www.investopedia.com/terms/d/dcf.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discounted Cash Flow Model{" "}
              </a>
              used to estimate the{" "}
              <a
                href="https://www.investopedia.com/terms/i/intrinsicvalue.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instrinsic Value{" "}
              </a>{" "}
              of an investment based on its expected future cash flow. This
              analysis figures out the value of an investment based on
              projections of how much cash a company will generate in future.
            </li>
          </ul>
          <ul>
            <li>
              We will be using{" "}
              <a
                href="https://www.investopedia.com/terms/f/freecashflowtoequity.asp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Free Cash Flow to Equity{" "}
              </a>
              as a measure of how much cash is available to equity shareholder
              of a company after all the cash inflows and outflows.
            </li>
          </ul>
          <ul>
            <li>
              There are many more
              <a
                href="https://corporatefinanceinstitute.com/resources/knowledge/valuation/valuation-methods/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Valuation Models{" "}
              </a>
              out there and this model is just a basic and simple version to
              help new investors get a sensing of trying to value a company. It
              is not guaranteed that this model would be accurate as this is
              just a projection based on each individual analysis.
            </li>
          </ul>
        </div>
        <br></br>
      </Paper>
      <Paper className={classes.greypaper} elevation={4}>
        <div className="intrinsic-guide">
          To start, hover your cursor over the ? icon at each financial term to
          understand them and also figure out how to find these data on the
          company's financial reports. After keying in all the data, the table
          will display the cash flow projections for the next 5 years. The final
          intrinsic value per share of a company can be found at the bottom
          highlighted in red.
          <br></br>
          <br></br>
          <p id="underline">
            *Note that all input values are in the millions and up to 2 dp.
          </p>
        </div>
      </Paper>
      <br></br>
      <IntrinsicForm {...{ currentId, intrinsicObjects, addOrEdit }} />
      <IfFirebaseAuthed>
      <table className="valuation-bottom-table">
        <thead>
          <tr>
            <th>Ticker Symbol</th>
            <th>Intrinsic Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {Object.keys(intrinsicObjects).map((key) => (
            <tr key={key}>
              <td>{intrinsicObjects[key].ticker}</td>
              <td>{intrinsicObjects[key].intrinsicps}</td>
              <td>
                <a
                  className="btn text-primary"
                  onClick={() => {
                    setCurrentId(key);
                  }}
                >
                  <i className="fas fa-pencil-alt"></i>
                </a>
                <a
                  className="btn text-danger"
                  onClick={() => {
                    onDelete(key);
                  }}
                >
                  <i className="far fa-trash-alt"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </IfFirebaseAuthed>
    </>
  );
}

export default IntrinsicValue;
