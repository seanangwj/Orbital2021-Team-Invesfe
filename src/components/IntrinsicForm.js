import { Tooltip, Icon, makeStyles } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useState, useEffect } from "react";
import "../styles/Intrinsic.css";

const IntrinsicForm = (props) => {
  const initialFieldValues = {
    ticker: "",
    profit: "",
    depre: "",
    working: "",
    capex: "",
    debt: "",
    fresh: "",
    shares: "",
    ror: "",
    growth: "",
  };

  const [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId == "") setValues({ ...initialFieldValues });
    else
      setValues({
        ...props.intrinsicObjects[props.currentId],
      });
  }, [props.currentId, props.intrinsicObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  var fcfeY1 =
    parseFloat(values.profit) +
    parseFloat(values.depre) -
    parseFloat(values.working) -
    parseFloat(values.capex) -
    parseFloat(values.debt) +
    parseFloat(values.fresh);

  const projectedFCFE = [];

  const calculateIntrinsicValue = () => {
    let iv = 0;
    for (let index = 1; index <= 5; index++) {
      iv +=
        projectedFCFE[index - 1].value / Math.pow(1 + values.ror / 100, index);
    }
    iv +=
      (projectedFCFE[4].value.toFixed(2) * (1 / (values.ror / 100))) /
      Math.pow(1 + values.ror / 100, 5);
    setValues({
        ...values,
        terminal: (projectedFCFE[4].value * (1 / (values.ror / 100))).toFixed(2),
        intrinsic: (iv * 1).toFixed(2),
        intrinsicps: (iv / values.shares).toFixed(2)
      });

  };

  for (let index = 1; index <= 5; index++) {
    projectedFCFE.push({
      label: `${index}`,
      value: fcfeY1 * Math.pow(1 + values.growth / 100, index - 1),
    });
  }

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
  const classes = useStyles();

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
    "Required rate of return is the minimum amount of return an investor will seek for assuming the risk of investment. There is no right number and it depends on each individual. You would need to consider factors like the return of market as a whole and also rate if you took no risk. You could use long-term government bonds rate or the 10-year treasury yield as the risk free rate. We would recommend any rate between 5-7%";
  const growth =
    "This growth rate is dependent on each individual own analysis on the company as they estimate the rate of growth of the company free cash flow. A more aggressive investment on a growing company would have a larger growth rate while a more conservative investment would have a smaller growth rate.";

  return (
    <>
      <form autoComplete="off" onSubmit={handleFormSubmit}>
        <table className="valuation-table">
          <tbody>
            <tr>
              <td>
                <label className="labelBox">
                  Ticker Symbol :{" "}
                  <input
                    className="intrinsic"
                    type="text"
                    id="ticker"
                    name="ticker"
                    value={values.ticker}
                    onChange={handleInputChange}
                  />
                </label>
              </td>
            </tr>
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
                    id="profit"
                    name="profit"
                    value={values.profit}
                    onChange={handleInputChange}
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
                    id="depre"
                    name="depre"
                    value={values.depre}
                    onChange={handleInputChange}
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
                    id="working"
                    name="working"
                    value={values.working}
                    onChange={handleInputChange}
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
                      title={values.capex}
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
                    id="capex"
                    name="capex"
                    value={values.capex}
                    onChange={handleInputChange}
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
                    id="debt"
                    name="debt"
                    min="0"
                    value={values.debt}
                    onChange={handleInputChange}
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
                    id="fresh"
                    min="0"
                    name="fresh"
                    value={values.fresh}
                    onChange={handleInputChange}
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
                      title={values.shares}
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
                    id="shares"
                    name="shares"
                    min="1"
                    value={values.shares}
                    onChange={handleInputChange}
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
                    id="ror"
                    name="ror"
                    min="0"
                    value={values.ror}
                    onChange={handleInputChange}
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
                    id="growth"
                    name="growth"
                    min="0"
                    value={values.growth}
                    onChange={handleInputChange}
                  />
                  <span class="validity"></span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <input
            type="submit"
            value={props.currentId == "" ? "Save" : "Update"}
            className="save-btn"
          />
        </div>
      </form>
      <button
        className="intrinsic-btn"
        onClick={() => calculateIntrinsicValue()}
      >
        Calculate
      </button>

      <table className="valuation-mid-table">
        <tr>
          <td>
            <label className="labelBox">
              Terminal Value =
              <input
                type="number"
                id="terminal"
                name="terminal"
                value={values.terminal}
                onChange={handleInputChange}
              />
            </label>
            <br></br>
            <label className="labelBox">
              Intrinsic Value For Company =
              <input
                type="number"
                id="intrinsicfc"
                name="intrinsicfc"
                value={values.intrinsic}
                onChange={handleInputChange}
              />
            </label>
            <br></br>
            <label className="final-labelBox">
              Intrinsic Value per Share =
              <input
                type="number"
                id="intrinsicps"
                name="intrinsicps"
                value={values.intrinsicps}
                onChange={handleInputChange}
              />
            </label>
          </td>
          <td>
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
          </td>
          <td></td>
        </tr>
      </table>
    </>
  );
};

export default IntrinsicForm;
