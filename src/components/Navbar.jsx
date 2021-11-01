import React from "react";
import "./Navbar.scss";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div>
        <Link to="/" className="nav__logo-container">
          <BsCurrencyBitcoin className="nav__logo" />
          <div className="logo__text">CRYPTOVERSE</div>
        </Link>
      </div>
      <div className="nav__items">
        <Link to="/">
          <div className="nav__item">
            <div className="nav__icons">
              <HomeOutlined />
            </div>
            Home
          </div>
        </Link>
        <Link to="/exchanges">
          <div className="nav__item">
            <div className="nav__icons">
              <MoneyCollectOutlined />
            </div>
            Exchanges
          </div>
        </Link>
        <Link to="/news">
          <div className="nav__item">
            <div className="nav__icons">
              <BulbOutlined />
            </div>
            News
          </div>
        </Link>
        <Link to="/cryptocurrencies">
          <div className="nav__item">
            <div className="nav__icons">
              <FundOutlined />
            </div>
            Cryptocurrencies
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
