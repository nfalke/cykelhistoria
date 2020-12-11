import React, { useState } from "react";
import { Header, bikeDataInterface } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [bikeData, setBikeData] = useState<bikeDataInterface>(null);

  return (
    <Router>
      <Route path="/*">
        <Header bikeData={bikeData} setBikeData={(data) => setBikeData(data)} />
        <Main bikeData={bikeData} />
        <Footer />
      </Route>
    </Router>
  );
};

export { App };
