import React, { useState } from "react";
import { Header, bikeDataInterface } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

const App = () => {
  const [bikeData, setBikeData] = useState<bikeDataInterface>(null);

  return (
    <>
      <Header bikeData={bikeData} setBikeData={(data) => setBikeData(data)} />
      <Main bikeData={bikeData} />
      <Footer />
    </>
  );
};

export { App };
