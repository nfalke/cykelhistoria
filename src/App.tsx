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

interface selectedBikeInterface {
  brand: string;
  type: string;
  model: string;
  year: string;
  src: string;
}

function App() {
  const [selectedBike, setSelectedBike] = useState({
    brand: "",
    type: "",
    model: "",
    year: "",
    src: "",
  });
  const [bikeData, setBikeData] = useState<bikeDataInterface>(null);

  const onSelectedBike = (value: selectedBikeInterface) => {
    setSelectedBike(value);
    console.log(value);
    if (value.src) {
      fetch(value.src)
        .then((response) => response.json())
        .then((data) => {
          setBikeData(data);
          window.history.pushState(
            {},
            selectedBike.brand +
              " " +
              selectedBike.model +
              " " +
              selectedBike.year,
            "/" +
              selectedBike.brand +
              "/" +
              selectedBike.type +
              "/" +
              selectedBike.model +
              "/" +
              selectedBike.year +
              "/"
          );
        });
    } else {
      setBikeData(null);

      if (window.location.pathname) {
        window.history.pushState({}, "", "/");
      }
    }
  };

  useEffect(() => {
    if (window.location.pathname) {
      const paths = decodeURIComponent(
        window.location.pathname.substring(1)
      ).split("/", 4);

      paths.length === 4 &&
        setSelectedBike({
          brand: paths[0],
          type: paths[1],
          model: paths[2],
          year: paths[3],
          src: "",
        });
    }
  }, []);

  return (
    <>
      <Header onSelectedBike={onSelectedBike} selectedBike={selectedBike} />
      <Main bikeData={bikeData} selectedBike={selectedBike} />
      <Footer />
    </>
  );
}

export { App, selectedBikeInterface, bikeDataInterface };
