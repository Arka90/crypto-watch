import React from "react";

import { Line } from "react-chartjs-2";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

import { Col, Row, Typography } from "antd";
import Loader from "./Loader";
const { Title } = Typography;
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

function LineChart({ coinHistory, currentPrice, coinName }) {
  if (!coinHistory) return <Loader />;

  const coinPrice = [];
  const coinTimeStamps = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimeStamps.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
    // console.log(coinHistory?.data?.history[i].timestamp);
  }

  coinTimeStamps.sort();

  const data = {
    labels: coinTimeStamps,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: true,
        backgroundColor: "#FFA500",
        borderColor: "#FFA500",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: true,
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title
            level={5}
            className={coinHistory?.data?.change > 0 ? "green" : "red"}
          >
            {coinHistory?.data?.change}
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
