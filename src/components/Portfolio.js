import { useState, useEffect, useContext } from "react";
import PortfolioChart from "./PortfolioChart";
import NavBar from "./Navbar";
import "../styles/Portfolio.css";
import { Tooltip, Icon, Paper, makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { db, fire } from "../config/Firebase.js";
import { UserContext } from "./UserContext";
import { IfFirebaseAuthed } from "@react-firebase/auth";

function Portfolio() {
  const currentUser = useContext(UserContext);
  const [stocks, setStocks] = useState([]);
  const [newStockName, setNewStockName] = useState(" ");
  const [newStockValue, setNewStockValue] = useState(" ");
  const [investmentValue, setNewInvestmetValue] = useState(0);

  const updatePortfolio = () => {
    if (window.confirm("Saved!")) {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("portfolio")
        .set({ stocks: stocks, investmentValue: investmentValue });
    }
    }
  };

  useEffect(() => {
    if (currentUser != null) {
      db.child("users")
        .child(currentUser.uid)
        .child("portfolio")
        .on("value", (snapshot) => {
          const array = snapshot.val();
          if (array != null) {
          setNewInvestmetValue(array.investmentValue);
          setStocks(array.stocks);
          }
        });
    }
  }, []);

  const handleAddStock = (event) => {
    event.preventDefault();
    const newStockList = [
      ...stocks,
      {
        symbol: newStockName,
        amount: newStockValue,
        color: getRandomColor(),
      },
    ];
    setStocks(newStockList);
  };

  const handleDeleteStock = (index) => {
    if (window.confirm("Are you sure to delete this record?")) {
    const newStockList = stocks.filter(
      (stock) => stocks.indexOf(stock) != index
    );
    setStocks(newStockList);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure to reset?")) {
    window.location.reload();
    setStocks([]);
    setNewInvestmetValue(0);
    db.child("users")
        .child(currentUser.uid)
        .child("portfolio")
        .set([]);
    }
  };

  const getTotalValue = () => {
    let total = 0;
    for (let index = 0; index < stocks.length; index++) {
      total += parseFloat(stocks[index].amount);
    }
    return total;
  };

  var cashHoldings = parseFloat(investmentValue) - getTotalValue();

  const useStyles = makeStyles((theme) => ({
    icon: {
      margin: theme.spacing(1),
    },

    customWidth: {
      width: 1500,
      fontSize: 20,
    },

    paper: {
      backgroundColor: grey[300],
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 50%), 0px 3px 4px 0px rgb(0 0 0 / 50%), 0px 1px 8px 0px rgb(0 0 0 / 70%)",
      padding: "20px",
      margin: "20px",
      maxWidth: "100%",
      textAlign: "center",
    },
    greypaper: {
      backgroundColor: grey[400],
      boxShadow:
        "0px 3px 3px -2px rgb(0 0 0 / 50%), 0px 3px 4px 0px rgb(0 0 0 / 50%), 0px 1px 8px 0px rgb(0 0 0 / 70%)",
      padding: "20px",
      margin: "20px",
      maxWidth: "100%",
    },
  }));

  const classes = useStyles();

  const allWeather = (
    <ul>
      30% total stock market
      <br></br>
      40% long-term bonds
      <br></br>
      15% intermediate bonds
      <br></br>
      7.5% commodities
      <br></br>
      7.5% gold
    </ul>
  );
  const ivy = (
    <ul>
      20% US stocks
      <br></br>
      20% international stocks
      <br></br>
      20% bonds
      <br></br>
      20% commodities
      <br></br>
      20% REITs (Real Estate Investment Trust)
    </ul>
  );

  return (
    <>
      <section className="header">
        <NavBar />
      </section>
      <div className="title">Portfolio Allocator</div>
      <Paper className={classes.greypaper} elevation={4}>
        <div className="portfolio-guide">
          A proper portfolio allocation is imperative for a solid invesment
          foundation. There are many financial instruments one can invest in and
          here are two recommended portfolio strategies for beginners just as a
          rough guide. <br></br> Financial instruments to invest in are stocks,
          bonds, REITs, commodities, ETF, cryptocurrency and more. Feel free to
          customise to your own preferences to achieve your own ideal
          allocation.<br></br>
          <br></br>
          Hover over the ? icons to view the allocations.
        </div>
      </Paper>

      <Paper className={classes.paper} elevation={4}>
        <h3>
          All-Weather Portfolio
          {
            <Tooltip
              title={allWeather}
              classes={{ tooltip: classes.customWidth }}
            >
              <Icon>
                <HelpOutlineIcon className={classes.icon} />
              </Icon>
            </Tooltip>
          }
        </h3>
        <h3>
          Ivy Portfolio
          {
            <Tooltip title={ivy} classes={{ tooltip: classes.customWidth }}>
              <Icon>
                <HelpOutlineIcon className={classes.icon} />
              </Icon>
            </Tooltip>
          }
        </h3>
        <br></br>
      </Paper>
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Inputs</th>
            <th>Pie Chart</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>
                <label>
                  Input your Investment Value:
                  <input
                    className="portfolio"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0"
                    value={investmentValue}
                    onChange={(event) => {
                      setNewInvestmetValue(event.target.value);
                    }}
                  />
                  <span class="validity"></span>
                </label>

                <div id="term"> Add a Stock to your Portfolio!</div>
                <form onSubmit={handleAddStock}>
                  <label>
                    Symbol:
                    <input
                      className="portfolio"
                      type="text"
                      required
                      value={newStockName}
                      onChange={(event) => {
                        setNewStockName(event.target.value);
                      }}
                    />
                  </label>

                  <label>
                    Amount invested:
                    <input
                      className="portfolio"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      value={newStockValue}
                      onChange={(event) => {
                        setNewStockValue(event.target.value);
                      }}
                    />
                    <span class="validity"></span>
                  </label>
                  <input className="add-btn" type="submit" value="Add" />
                </form>
              </div>
            </td>
            <td>
              {stocks.length === 0 ? (
                <p id="terms">Portfolio is Empty!</p>
              ) : (
                <>
                  <PortfolioChart stocks={stocks} />
                  <button className="delete-btn" onClick={() => handleReset()}>
                    Reset
                  </button>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div id="terms">Portfolio</div>

        {stocks.length > 0 && currentUser != null ? (

          <button className="save-btn" onClick={() => updatePortfolio()}>
            Save Portfolio
          </button>
        ) : (
          ""
        )}

        {stocks.length > 0 ? (
          <table className="holdings-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Holdings</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stock.symbol}</td>
                  <td> {stock.amount}</td>

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteStock(index)}
                  >
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p id="terms-1"> No stocks added!</p>
        )}
      </div>

      <div>
        <div id="terms">Cash Holdings:</div>
        <p id="terms">
          {cashHoldings >= 0 ? cashHoldings : <p> More Cash Needed!</p>}
        </p>
      </div>
    </>
  );
}

// function StockList(props) {
//   const { stocks, setStocks,  } = props;
//   const handleDeleteStock = (index) => {
//     const newStockList = stocks.filter(
//       (stock) => stocks.indexOf(stock) != index
//     );
//     setStocks(newStockList);
//   };
//   useEffect(() => {
//     if (currentUser != null) {
//       db.child("users")
//         .child(currentUser.uid)
//         .child("portfolio")
//         .on("value", (snapshot) => {
//           const array = snapshot.val();
//           setNewInvestmetValue(array);
//           // setStocks(array[0])
//     })
//   }}, []);

//   return (
//     <>
//       <table className="holdings-table">
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Holdings</th>
//             <th>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stocks.map((stock, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{stock.symbol}</td>
//               <td> {stock.amount}</td>

//               <button
//                 className="delete-btn"
//                 onClick={() => handleDeleteStock(index)}
//               >
//                 Delete
//               </button>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }
function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default Portfolio;
