import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__title">CRYPTOVERSE</div>
      <div className="footer__desc">All rights reserved ©️ 2021</div>
      <div className="footer__links">
        <Link to="/" className="footer__link">
          Home
        </Link>

        <Link to="/exchanges" className="footer__link">
          Exchanges
        </Link>

        <Link to="/cryptocurrencies" className="footer__link">
          Cryptocurrencies
        </Link>

        <Link to="/news" className="footer__link">
          News
        </Link>
      </div>
    </div>
  );
};

export default Footer;
