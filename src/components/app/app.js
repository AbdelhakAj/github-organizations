import React from "react";

import LandingPage from "../landing-page";

import "./app.scss";

function App() {
  return (
    <div className="app bg-gray-200">
      <LandingPage onSearch={console.log} />
    </div>
  );
}

export default App;
