import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsAPi";
import "./News.scss";
import moment from "moment";
import { useGetCryptoCoinsQuery } from "../services/cryptoApi";

const News = ({ simplify }) => {
  // news options : default - crypto news
  const [selectOption, setSelectOption] = useState("cryptocurrencies");

  // fetch news based on options
  const { data, isLoading } = useGetCryptoNewsQuery({
    queryTopic: selectOption,
    count: simplify ? 6 : 15,
  });

  const newsList = data?.value;
  // console.log(newsList);

  // fetch coins list
  const { data: coinData } = useGetCryptoCoinsQuery(100);
  // console.log(coinData);
  const coinsList = coinData?.data?.coins;

  // image filler
  const dummyImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  if (isLoading) {
    return "loading...";
  }
  return (
    <>
      {!simplify && (
        <div className="news__select-container">
          {/* create selector based on coin names */}
          <select
            name=""
            id=""
            className="news--selector"
            placeholder="select a crypto"
            onChange={(e) => {
              setSelectOption(e.target.value);
            }}
          >
            <option value="cryptocurrencies">cryptocurrencies</option>
            {coinsList?.map((coin) => (
              <option value={coin.name}>{coin.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="news-grid">
        {newsList?.map((news) => (
          <div className="news-card" key={news.name}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news__header">
                <div className="news__title">{news.name}</div>
                <img
                  src={
                    news.image ? news.image.thumbnail.contentUrl : dummyImage
                  }
                  alt={news.name}
                  className="news__img"
                />
              </div>

              <div className="news__desc">
                {/* trim the string */}
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}... (Read More)`
                  : news.description}
              </div>

              <div className="news__footer">
                <div className="news__details">
                  <img
                    src={
                      news.provider[0].image
                        ? news.provider[0].image.thumbnail.contentUrl
                        : dummyImage
                    }
                    alt="news"
                    className="news__provider"
                  />
                  <p>{news.provider[0].name}</p>
                </div>

                <div className="news__time">
                  {/* displays freshness of news */}
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;
