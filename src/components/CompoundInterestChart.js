import * as React from "react";
import {
  Label,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import Summary from "./Summary";

function renderTooltip({ payload }) {
  if (!payload[0]) {
    return;
  }

  return <span>{`£${payload[0].value.toFixed(2)}`}</span>;
}

function CompoundInterestChart({ initialAmount, period, growthRate, yearlyContribution }) {
  const data = React.useMemo(
    () => {
      const result = [];
      result.push({
        label: `0`,
        value: initialAmount
      })

      for (let i = 1; i <= period; i++) {
        let lastFutureValue = initialAmount + yearlyContribution;
        if (result.length > 0) {
          lastFutureValue = result[result.length - 1].value + yearlyContribution;
        }
        result.push({
          label: `${i}`,
          value: lastFutureValue * Math.pow(1 + growthRate / 100, 1)
        });
      }

      return result;
    },
    [initialAmount, period, growthRate, yearlyContribution]
  );

  return (
    <>
      <h2>Projected Growth</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label">
              <Label value="Years" offset={-3} position="insideBottom" />
            </XAxis>
            <YAxis />
            {/* <Tooltip content={renderTooltip} /> */}
            <Line type="monotone" dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <hr />
      <Summary period={period} data={data} />
    </>
  );
}

export default CompoundInterestChart;