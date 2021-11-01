import React, { useState } from "react";
import "./Cryptocurrencies.scss";
import { Link } from "react-router-dom";
import millify from "millify";
import { useGetCryptoCoinsQuery } from "../services/cryptoApi";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import CryptoTable from "./CryptoTable";

const Cryptocurrencies = ({ simplify }) => {
  const coinCount = simplify ? "10" : "100";
  const { data, isLoading } = useGetCryptoCoinsQuery(coinCount);

  const [searchText, setSearchText] = useState("");

  let coinsList = data?.data?.coins;

  // runs on every searchText render
  const searchCoins = () => {
    let filteredCoins = coinsList?.filter((coin) =>
      coin.name.toLowerCase().includes(searchText)
    );

    coinsList = filteredCoins;
    return coinsList;
  };
  searchCoins();

  // view mode state
  const [gridView, setGridView] = useState(true);

  if (isLoading) {
    return "loading....";
  }
  return (
    <>
      {!simplify && (
        <div className="cryptos--search">
          <input
            type="text"
            className="search-box"
            placeholder="search crypto"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          {/* click to change view - mode */}
          <div
            className="cryptos--view-btns"
            onClick={() => {
              setGridView(!gridView);
            }}
          >
            {gridView ? (
              <UnorderedListOutlined
                className="view"
                style={{ fontSize: "150%" }}
              />
            ) : (
              <TableOutlined className="view" />
            )}
          </div>
        </div>
      )}

      {/* manipulated view */}
      {gridView ? (
        <div className="cryptos-grid">
          {coinsList?.map((coin) => (
            <div className="crypto" key={coin.uuid}>
              <Link to={`crypto/${coin.id}`} className="crypto">
                <div className="crypto__title">
                  <div className="crypto__name">
                    {coin.rank}. {coin.name}
                  </div>
                  <img
                    src={coin.iconUrl}
                    alt={coin.name}
                    className="crypto__icon"
                  />
                </div>
                <div className="crypto__body">
                  <p className="crypto__text">Price: {millify(coin.price)}</p>
                  <p className="crypto__text">
                    Market Cap: {millify(coin.marketCap)}
                  </p>
                  <p className="crypto__text">Daily Change: {coin.change}%</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="cryptos-list">
          {/* this need to be cleared */}

          <CryptoTable coinsData={coinsList} />
        </div>
      )}
    </>
  );
};

export default Cryptocurrencies;
