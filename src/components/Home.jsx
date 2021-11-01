import React from "react";
import { useGetCryptoCoinsQuery } from "../services/cryptoApi";
import "./Home.scss";
import millify from "millify";
import { Cryptocurrencies, Exchanges, News } from "./index.js";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useGetCryptoCoinsQuery(100);

  // const { data: newsData, isLoading: isloadingNews } = useGetCryptoNewsQuery({
  //   queryTopic: "cryptocurrencies",
  //   count: 6,
  // });
  // console.log(data);
  // console.log(newsData);

  const globalStats = data?.data?.stats;

  if (isLoading) return "...loading";

  return (
    <div className="home">
      <div className="home__stats">
        <div className="stats__title">Global Crypto Stats</div>
        <div className="stats__row">
          <div className="stat">
            Total Cryptocurrencies
            <span className="stat--value">{globalStats.total}</span>
          </div>
          <div className="stat">
            {" "}
            Total Exchanges
            <span className="stat--value">{globalStats.totalExchanges}</span>
          </div>
        </div>
        <div className="stats__row">
          <div className="stat">
            {" "}
            Total Market Cap
            <span className="stat--value">
              {millify(globalStats.totalMarketCap)}
            </span>
          </div>
          <div className="stat">
            {" "}
            Total 24h Volume
            <span className="stat--value">
              {millify(globalStats.total24hVolume)}
            </span>
          </div>
        </div>
        <div className="stats__row">
          <div className="stat">
            {" "}
            Total Markets
            <span className="stat--value">
              {millify(globalStats.totalMarkets)}
            </span>
          </div>
        </div>
      </div>

      <div className="home__pages-container">
        <div className="home__header">
          <div className="home__title">
            Top 10 Cryptocurrencies in the World
          </div>
          <div className="home__show-more">
            <Link to="/cryptocurrencies">Show More</Link>
          </div>
        </div>
        {/* display simplied component */}
        <Cryptocurrencies simplify />
      </div>

      <div className="home__pages-container">
        <div className="home__header">
          <div className="home__title">Recent Crypto News</div>
          <div className="home__show-more">
            <Link to="/news">Show More</Link>
          </div>
        </div>
        <News simplify />
      </div>

      <div className="home__pages-container">
        <div className="home__header">
          <div className="home__title">Top 10 Exchanges</div>
          <div className="home__show-more">
            <Link to="/exchanges">Show More</Link>
          </div>
        </div>
        <Cryptocurrencies simplify />
      </div>
    </div>
  );
};

export default Home;
