import React from "react";
import { Router } from "@reach/router";

import Organization from "../organization";
import LandingPage from "../landing-page";

import "./app.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <LandingPage path="/" />
        <Organization path="/organization/:orgLogin" />
      </Router>
    </div>
  );
}

export default App;
