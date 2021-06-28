import { useState } from "react";
import "../styles/Intrinsic.css";
import NavBar from "./Navbar";
import { Tooltip, Icon, makeStyles, Paper } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(1),
  },

  customWidth: {
    width: 1200,
    height: 250,
    fontSize: 15,
  },
}));

function IntrinsicValue(props) {
  const [netProfit, newNetProfit] = useState("33000");
  const [depAndAmort, newDepAndAmort] = useState("6000");
  const [increaseInWC, newIncreaseINWC] = useState("6000");
  const [capitalExpenditure, newCapitalExpenditure] = useState("15000");
  const [debtRepayment, newDebtRepayment] = useState("600");
  const [debtRaised, newDebtRaised] = useState("200");
  const [numOfShares, newNumOfShares] = useState("2000");
  const [rateOfReturn, newRateOfReturn] = useState("5");
  const [fcfeGrowth, newFcfeGrowth] = useState("15");
  const [intrinsicValue, newIntrinsicValue] = useState("0");
  const { array } = props;
  var fcfeY1 =
    parseFloat(netProfit) +
    parseFloat(depAndAmort) -
    parseFloat(increaseInWC) -
    parseFloat(capitalExpenditure) -
    parseFloat(debtRepayment) +
    parseFloat(debtRaised);

  const projectedFCFE = [];

  const calculateIntrinsicValue = () => {
    let iv = 0;
    for (let index = 1; index <= 5; index++) {
      iv +=
        projectedFCFE[index - 1].value /
        Math.pow(1 + rateOfReturn / 100, index);
    }
    iv +=
      (projectedFCFE[4].value.toFixed(2) * (1 / (rateOfReturn / 100))) /
      Math.pow(1 + rateOfReturn / 100, 5);
    newIntrinsicValue(iv);
  };

  for (let index = 1; index <= 5; index++) {
    projectedFCFE.push({
      label: `${index}`,
      value: fcfeY1 * Math.pow(1 + fcfeGrowth / 100, index - 1),
    });
  }

  const profit =
    "Net profit after taxes is a financial term used to describe a company's profit after all taxes have been paid. This financial data can be found in income statement.";
  const depre =
    "Amortisation is the practice of spreading an intangible asset's over that asset's useful life. E.g. patents and trademarks. Depreciation is the allocation of cost of a fixed asset over its useful life. These financial data can be found in the income statement.";
  const working =
    "Working capital represents the difference between a firm's current assets and current liabilities and also the amount of money company has to pay off its short-term expenses. These financial data can be found in the cash flow statement.";
  const capex =
    "Capital Expenditure (CapEx) are funds used by a company to acquire, upgrade and maintain its physical assets like buildings. CapEx is essential for investment for growth. This financial data can be found in the cash flow statement.";
  const debt =
    "Debt repayment is the act of paying money back on a company's existing debt that includes the principal sum and interest. This involves cash outflow of the company. This financial data can be found in the cash flow statement.";
  const fresh =
    "Debt raised is a financing transaction involving cash inflow to the company for its operations. This financial data can be foundin the cash flow statement.";
  const shares =
    "Number of outstanding shares is simply the total number of shares issued and held by stockholders - both external and coportate investors. This can be found in the balance sheet.";
  const ror =
    "Required rate of return is the minimum amount of return an investor will seek for assuming the risk of investment. There is no right number and it depends on each individual. You would need to consider factors like the return of market as a whole and also rate if you took no risk. You could use long-term government bonds rate or the 10-year treasury yield as the risk free rate.";
  const growth =
    "This growth rate is dependent on each individual own analysis on the company as they estimate the rate of growth of the company free cash flow. A more aggressive investment on a growing company would have a larger growth rate while a more conservative investment would have a smaller growth rate.";

  const classes = useStyles();

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
          highlighted in red.
        </div>
      </Paper>
      <br></br>
      <table className="valuation-table">
        <tbody>
          <tr>
            <td>
              <label className="labelBox">
                Net Profit after Tax ($) :{" "}
                {
                  <Tooltip
                    title={profit}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  step="0.01"
                  id="netProfit"
                  name="netProfit"
                  value={netProfit}
                  onChange={(event) => newNetProfit(event.target.value)}
                />
                <span class="validity"></span>
              </label>
            </td>
            <br></br>
            <td>
              <label className="labelBox">
                Depreciation and Amortisation ($) :{" "}
                {
                  <Tooltip
                    title={depre}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  step="0.01"
                  id="depAndAmort"
                  name="depAndAmort"
                  value={depAndAmort}
                  onChange={(event) => newDepAndAmort(event.target.value)}
                />
                <span class="validity"></span>
              </label>
            </td>
            <br></br>
            <td>
              <label className="labelBox">
                Increase in Working Capital ($) :{" "}
                {
                  <Tooltip
                    title={working}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  step="0.01"
                  id="increaseInWC"
                  name="increaseInWC"
                  value={increaseInWC}
                  onChange={(event) => newIncreaseINWC(event.target.value)}
                />
                <span class="validity"></span>
              </label>
            </td>
          </tr>
          <br></br>
          <tr>
            <td>
              <label className="labelBox">
                Capital Expenditure ($) :{" "}
                {
                  <Tooltip
                    title={capex}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  step="0.01"
                  min="0"
                  id="capitalExpenditure"
                  name="capitalExpenditure"
                  value={capitalExpenditure}
                  onChange={(event) =>
                    newCapitalExpenditure(event.target.value)
                  }
                />
                <span class="validity"></span>
              </label>
            </td>
            <br></br>
            <td>
              <label className="labelBox">
                Debt Repayment on existing debt ($) :
                {
                  <Tooltip
                    title={debt}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  step="0.01"
                  id="debtRepayment"
                  name="debtRepayment"
                  min="0"
                  value={debtRepayment}
                  onChange={(event) => newDebtRepayment(event.target.value)}
                />
                <span class="validity"></span>
              </label>
            </td>
            <br></br>
            <td>
              <label className="labelBox">
                Fresh Debt Raised ($) :{" "}
                {
                  <Tooltip
                    title={fresh}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  step="0.01"
                  id="debtRaised"
                  min="0"
                  name="debtRaised"
                  value={debtRaised}
                  onChange={(event) => newDebtRaised(event.target.value)}
                />
                <span class="validity"></span>
              </label>
            </td>
          </tr>
          <br></br>
          <tr>
            <td>
              <label className="labelBox">
                No. of Outstanding Shares :{" "}
                {
                  <Tooltip
                    title={shares}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  id="numOfShares"
                  name="numOfShares"
                  min="1"
                  value={numOfShares}
                  onChange={(event) => newNumOfShares(event.target.value)}
                />
                <span class="validity"></span>
              </label>
            </td>
            <br></br>
            <td>
              <label className="labelBox">
                Required rate of return (%) :{" "}
                {
                  <Tooltip
                    title={ror}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  step="0.01"
                  id="rateOfReturn"
                  name="rateOfReturn"
                  min="0"
                  value={rateOfReturn}
                  onChange={(event) => newRateOfReturn(event.target.value)}
                />
                <span class="validity"></span>
              </label>
            </td>
            <br></br>
            <td>
              <label className="labelBox">
                FCFE Growth Rate (%) :{" "}
                {
                  <Tooltip
                    title={growth}
                    classes={{ tooltip: classes.customWidth }}
                  >
                    <Icon>
                      <HelpOutlineIcon className={classes.icon} />
                    </Icon>
                  </Tooltip>
                }
                <input
                  className="intrinsic"
                  type="number"
                  step="0.01"
                  id="fcfeGrowth"
                  name="fcfeGrowth"
                  min="0"
                  value={fcfeGrowth}
                  onChange={(event) => newFcfeGrowth(event.target.value)}
                />
                <span class="validity"></span>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="intrinsic-btn"
        onClick={() => calculateIntrinsicValue()}
      >
        Calculate
      </button>

      <div>
        <table className="value-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Projected FCFE</th>
            </tr>
          </thead>
          <tbody>
            {projectedFCFE.map(({ label, value }) => (
              <tr key={label}>
                <td>{label}</td>
                <td>${value.toFixed(2)} </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <label className="labelBox">
          Terminal Value =
          <input
            type="number"
            value={(
              projectedFCFE[4].value *
              (1 / (rateOfReturn / 100))
            ).toFixed(2)}
          />
        </label>
        <br></br>
        <label className="labelBox">
          Intrinsic Value For Company =
          <input type="number" value={(intrinsicValue * 1).toFixed(2)} />
        </label>
        <br></br>
        <label className="final-labelBox">
          Intrinsic Value per Share =
          <input
            type="number"
            value={(intrinsicValue / numOfShares).toFixed(2)}
          />
        </label>
      </div>
    </>
  );
}

export default IntrinsicValue;
