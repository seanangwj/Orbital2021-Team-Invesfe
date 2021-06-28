import { useState } from "react";
import PortfolioChart from "./PortfolioChart";
import NavBar from "./Navbar";
import "../styles/Portfolio.css";
import { Tooltip, Icon,Paper, makeStyles } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function Portfolio() {
  const [stocks, setStocks] = useState([]);
  const [newStockName, setNewStockName] = useState(" ");
  const [newStockValue, setNewStockValue] = useState(" ");
  const [investmentValue, setNewInvestmetValue] = useState(" ");
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

  const handleReset = () => {
    setStocks([]);
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
      width: 1200,
      height: 140,
      fontSize: 15,
    },
  }));
  const classes = useStyles();

  const allWeather = 
 <ul><li>30% total stock market</li><li>40% long-term bonds</li><li>15% intermediate bonds</li><li>7.5% commodities</li><li>7.5% gold</li></ul>;
  const ivy =
  <ul><li>20% US stocks</li><li>20% international stocks</li><li>20% bonds</li><li>20% commodities</li><li>20% REITs (Real Estate Investment Trust)</li></ul> 
 
 return (
    <>
      <section className="header">
        <NavBar />
      </section>
      <div className="title">Portfolio Allocator</div>
      <Paper className="box" elevation={3}>
        <div className="portfolio-guide">
          A proper portfolio allocation is imperative for a solid invesment
          foundation. There are many financial instruments to invest in or for
          hedging and here are two recommended portfolio strategies for
          beginners but do not that you do not have to follow strictly to the
          allocation as this is just a rough guide. Financial instruments to
          invest in are stocks, bonds, REITs, commodities, ETF, cryptocurrency
          and more. Feel free to customise to your own preferences to achieve
          your own ideal allocation.<br></br>
          <br></br>
          Hover over the ? icons to view the allocations.
        </div>
      </Paper>

      <Paper className="box" elevation={3}>
            <h3>All-Weather Portfolio{
                  <Tooltip
                    title={allWeather}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }</h3>
            <h3>Ivy Portfolio{
                  <Tooltip
                    title={ivy}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }</h3>
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
        {stocks.length > 0 ? (
          <StockList stocks={stocks} setStocks={setStocks} />
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

function StockList(props) {
  const { stocks, setStocks } = props;
  const handleDeleteStock = (index) => {
    const newStockList = stocks.filter(
      (stock) => stocks.indexOf(stock) != index
    );
    setStocks(newStockList);
  };

  return (
    <>
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
    </>
  );
}
function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default Portfolio;
