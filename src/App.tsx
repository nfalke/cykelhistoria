import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface brandData {
  name: string;
  types: [
    {
      name: string;
      models: [
        {
          name: string;
          years: [
            {
              name: string;
              src: string;
            }
          ];
        }
      ];
    }
  ];
}

interface bikeData {
  brand: string;
  type: string;
  name: string;
  year: string;
  description: string;
  images: [
    {
      src: string;
    }
  ];
}

function App() {
  const [selectedBike, setSelectedBike] = useState({
    brand: "",
    type: "",
    model: "",
    year: "",
  });
  const [brandData, setBrandData] = useState<brandData>(null);
  const [bikeData, setBikeData] = useState<bikeData>(null);

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
        });
    }
  }, []);

  // On selected brand
  useEffect(() => {
    if (selectedBike?.brand && brandData?.name !== selectedBike.brand) {
      fetch("/json/" + selectedBike?.brand + ".json")
        .then((response) => response.json())
        .then((data) => {
          setBrandData(data);
        });
    }
  }, [selectedBike, brandData]);

  // On selected year
  useEffect(() => {
    if (
      selectedBike?.type &&
      selectedBike.model &&
      selectedBike.year &&
      brandData
    ) {
      window.history.pushState(
        {},
        selectedBike.brand + " " + selectedBike.model + " " + selectedBike.year,
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

      const url = brandData.types
        .find((type) => type.name === selectedBike.type)
        .models.find((model) => model.name === selectedBike.model)
        .years.find((year) => year.name === selectedBike.year).src;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setBikeData(data);
        });
    }
  }, [selectedBike, brandData]);

  return (
    <>
      <Header>
        <label>Märke</label>
        <select
          value={selectedBike.brand}
          onChange={(event) => {
            setSelectedBike({
              brand: event.target.value,
              type: "",
              model: "",
              year: "",
            });
            setBikeData(null);
          }}
        >
          <option disabled></option>
          <option>Crescent</option>
        </select>

        {brandData && selectedBike.brand ? (
          <>
            <label>Typ</label>
            <select
              value={selectedBike.type}
              onChange={(event) => {
                setSelectedBike({
                  ...selectedBike,
                  type: event.target.value,
                  model: "",
                  year: "",
                });
                setBikeData(null);
              }}
            >
              <option disabled></option>
              {brandData.types.map((type) => (
                <option key={type.name}>{type.name}</option>
              ))}
            </select>
          </>
        ) : (
          ""
        )}

        {brandData && selectedBike.type ? (
          <>
            <label>Modell</label>
            <select
              value={selectedBike.model}
              onChange={(event) => {
                setSelectedBike({
                  ...selectedBike,
                  model: event.target.value,
                  year: "",
                });
                setBikeData(null);
              }}
            >
              <option disabled></option>
              {brandData.types
                .find((type) => type.name === selectedBike.type)
                .models.map((model) => (
                  <option key={model.name}>{model.name}</option>
                ))}
            </select>
          </>
        ) : (
          ""
        )}

        {brandData && selectedBike?.model ? (
          <>
            <label>År</label>
            <select
              value={selectedBike.year}
              onChange={(event) => {
                setSelectedBike({ ...selectedBike, year: event.target.value });
                setBikeData(null);
              }}
            >
              <option disabled></option>
              {brandData.types
                .find((type) => type.name === selectedBike.type)
                .models.find((model) => model.name === selectedBike.model)
                .years.map((year) => (
                  <option key={year.name}>{year.name}</option>
                ))}
            </select>
          </>
        ) : (
          ""
        )}
      </Header>

      <Main>
        {bikeData ? (
          <>
            <Heading>{`${selectedBike?.brand}, ${selectedBike?.type}, ${selectedBike?.model}, ${selectedBike?.year}`}</Heading>
            {bikeData.images.map((image) => (
              <Image key={image.src} src={image.src} />
            ))}
          </>
        ) : (
          ""
        )}
      </Main>

      <footer>Footer</footer>
    </>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  height: 3rem;
  border-bottom: 1px solid #eee;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const Heading = styled.h1`
  font-size: 1rem;
`;

const Image = styled.img`
  max-width: 90vw;
  margin-bottom: 3rem;
`;

export default App;
