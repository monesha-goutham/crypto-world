import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Navbar,
  Home,
  Exchanges,
  Cryptocurrencies,
  News,
  Footer,
  CryptoDetails,
} from "./components/index";
import "./App.scss";

// import CryptoDetails from "./components/CryptoDetails";

function App() {
  return (
    <div className="App">
      <div className="display">
        <div className="header">
          <Navbar />
        </div>
        <div className="main">
          <div className="routes">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              {/* params cannot be kabab case : coin-id */}
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route path="/exhanges" exact>
                <Exchanges />
              </Route>
              <Route path="/news" exact>
                <News />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
