import React from "react";
import "./LineChart.scss";
import { Line } from "react-chartjs-2";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  // chart data
  const coinPrice = [];
  const coinTimeStamp = [];

  // basic parsing
  for (let i = 0; i < coinHistory?.data?.history.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimeStamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#479be0",
        borderColor: "#479be0",
      },
    ],
  };

  const options = {
    // scales: {
    //   yAxis: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
  };
  return (
    <div className="chart-container">
      <div className="chart__header">
        <div className="chart__title">{coinName} Price Chart</div>
        <div className="chart__price-container">
          <div className="price-change">{coinHistory?.data?.change}</div>
          <div className="current-price">
            Current {coinName} Price: ${currentPrice}
          </div>
        </div>
      </div>
      <div className="chart">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
