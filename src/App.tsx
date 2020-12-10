import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

interface bikeDataInterface {
  brand: string;
  type: string;
  model: string;
  year: string;
  description: string;
  images: [
    {
      src: string;
    }
  ];
}

function App() {
  const [bikeData, setBikeData] = useState<bikeDataInterface>(null);

  return (
    <>
      <Header setBikeData={(data) => setBikeData(data)} />
      <Main bikeData={bikeData} />
      <Footer />
    </>
  );
}

export { App, bikeDataInterface };
