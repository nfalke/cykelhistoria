import React, { useState, useEffect } from "react";
import styled from "styled-components";

function App() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [brandsData, setBrandsData] = useState([
    {
      name: "Crescent",
      src: "/json/crescent.json",
    },
  ]);
  const [modelsData, setModelsData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [bikeData, setBikeData] = useState(null);

  useEffect(() => {
    if (window.location.pathname) {
      const paths = decodeURIComponent(
        window.location.pathname.substring(1)
      ).split("/", 3);

      paths[0] && setSelectedBrand(paths[0]);
      paths[1] && setSelectedModel(paths[1]);
      paths[2] && setSelectedYear(paths[2]);
    }
  }, []);

  useEffect(() => {
    if (selectedBrand && brandsData.length) {
      fetch(brandsData.find((brand) => brand.name === selectedBrand).src)
        .then((response) => response.json())
        .then((data) => setModelsData(data.models));
    }
  }, [selectedBrand, brandsData]);

  useEffect(() => {
    if (selectedModel && modelsData.length) {
      const src = modelsData.find((model) => model.name === selectedModel).src;

      fetch(src)
        .then((response) => response.json())
        .then((data) => setModelData(data));
    }
  }, [selectedModel, modelsData]);

  useEffect(() => {
    if (selectedYear && modelData.length) {
      window.history.pushState(
        {},
        selectedBrand + " " + selectedModel + " " + selectedYear,
        "/" + selectedBrand + "/" + selectedModel + "/" + selectedYear
      );

      setSelectedYear(selectedYear);

      setBikeData(modelData.find((model) => model.year === selectedYear));
    }
  }, [selectedBrand, selectedModel, selectedYear, modelsData, modelData]);

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
  `;

  const Heading = styled.h1`
    font-size: 1rem;
  `;

  const Image = styled.img`
    max-width: 90vw;
    margin-bottom: 3rem;
  `;

  return (
    <>
      <Header>
        <label>Märke</label>
        <select
          value={selectedBrand}
          onChange={(event) => setSelectedBrand(event.target.value)}
        >
          <option disabled></option>
          {brandsData.map((brand) => (
            <option key={brand.name}>{brand.name}</option>
          ))}
        </select>

        {modelsData.length ? (
          <>
            <label>Modell</label>
            <select
              value={selectedModel}
              onChange={(event) => setSelectedModel(event.target.value)}
            >
              <option disabled></option>
              {modelsData.map((model) => (
                <option key={model.name}>{model.name}</option>
              ))}
            </select>
          </>
        ) : (
          ""
        )}

        {modelData.length ? (
          <>
            <label>År</label>
            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              <option disabled></option>
              {modelData.map((model) => (
                <option key={model.year}>{model.year}</option>
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
            <Heading>{`${selectedBrand} ${selectedModel} ${selectedYear}`}</Heading>
            {bikeData.images.map((image) => (
              <Image key={image.src} src={image.src} />
            ))}
          </>
        ) : (
          ""
        )}
      </Main>
    </>
  );
}

export default App;
