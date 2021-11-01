import React, { useState } from "react";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import "./CryptoDetails.scss";
import { useParams } from "react-router";
import {
  useGetCoinDetailsQuery,
  useGetCoinHistoryQuery,
} from "../services/cryptoApi";
import millify from "millify";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  // fetch coin id
  const { coinId } = useParams();

  // fetch details from api
  const { data, isLoading } = useGetCoinDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;

  // time period
  const [timePeriod, setTimePeriod] = useState("7d");

  // fetch coin-history for chart
  const { data: coinHistoryData, isFetching } = useGetCoinHistoryQuery({
    coinId,
    timePeriod,
  });

  // loader
  if (isLoading) {
    return "Loading...";
  }
  if (isFetching) {
    return "Loading...";
  }

  console.log(coinHistoryData);

  // Details made easy to parse
  const times = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails?.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails?.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="coin-dets">
      <div className="coin-dets__header">
        <div className="coin__title">
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </div>
        <p>
          {cryptoDetails.name} live price in USD. View value, statistics, market
          cap and supply
        </p>
      </div>
      <div className="coin-dets--selector">
        <select
          name=""
          id=""
          className="tp-selector"
          value={timePeriod}
          onChange={(e) => {
            setTimePeriod(e.target.value);
          }}
        >
          {times.map((time) => (
            <option className="tp-option" value={time} key={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      {/* Render line chart */}
      <LineChart
        coinHistory={coinHistoryData}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      <div className="coin__stats-container">
        <div className="coin__value-stats">
          <div className="stats__header">
            <div className="stats__title">
              {cryptoDetails.name} Value Statistics
            </div>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </div>
          <div className="stats__body">
            {/* map stats list here */}
            {stats.map((stat) => (
              <div className="stat" key={stat.title}>
                <div className="stat__title">
                  <div className="stat__icon">{stat.icon}</div>
                  <p>{stat.title}</p>
                </div>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="coin__general-stats">
          <div className="stats__header">
            <div className="stats__title">
              {cryptoDetails.name} Other Statistics
            </div>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </div>
          <div className="stats__body">
            {/* map stats list here */}
            {genericStats.map((stat) => (
              <div className="stat" key={stat.title}>
                <div className="stat__title">
                  <div className="stat__icon">{stat.icon}</div>
                  <p>{stat.title}</p>
                </div>
                <p>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="coin-desc">
        <div className="coin__links">
          <div className="coin__links-header">{cryptoDetails.name} Links</div>

          <div className="coin__links-container">
            {cryptoDetails.links.map((link) => (
              <div className="coin__link" key={link.name}>
                <div className="coin__link-title">{link.type}</div>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
