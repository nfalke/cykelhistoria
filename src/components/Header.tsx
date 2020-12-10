import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { bikeDataInterface } from "../App";

interface HeaderPropsInterface {
  setBikeData: (data: bikeDataInterface) => void;
}

interface selectedBikeInterface {
  brand: string;
  type: string;
  model: string;
  year: string;
}

const Header = (props: HeaderPropsInterface) => {
  const [brandsData, setBrandsData] = useState(null);
  const [typesData, setTypesData] = useState(null);
  const [modelsData, setModelsData] = useState(null);
  const [yearsData, setYearsData] = useState(null);
  const [selectedBike, setSelectedBike] = useState<selectedBikeInterface>({
    brand: "",
    type: "",
    model: "",
    year: "",
  });
  const [selectedBikeFromUrl, setSelectedBikeFromUrl] = useState(null);

  const onSelectedBikeChange = (data: selectedBikeInterface) => {
    if (window.location.pathname) {
      window.history.pushState({}, "", "/");
    }

    if (brandsData && data.brand !== selectedBike.brand) {
      // Fetch types
      fetch(brandsData.brands.find((brand) => brand.name === data.brand).types)
        .then((response) => response.json())
        .then((data) => {
          setTypesData(data);
        });
    }

    if (typesData && data.type !== selectedBike.type) {
      // Fetch models
      fetch(typesData.types.find((type) => type.name === data.type).models)
        .then((response) => response.json())
        .then((data) => {
          setModelsData(data);
        });
    }

    if (modelsData && data.model !== selectedBike.model) {
      // Fetch years
      fetch(modelsData.models.find((model) => model.name === data.model).years)
        .then((response) => response.json())
        .then((data) => {
          setYearsData(data);
        });
    }

    if (yearsData && data.year !== selectedBike.year) {
      // Fetch bike
      fetch(yearsData.years.find((year) => year.name === data.year).bike)
        .then((response) => response.json())
        .then((data) => {
          props.setBikeData(data);
          /*
          window.history.pushState(
            {},
            data.brand + " " + data.type + " " + data.model + " " + data.year,
            "/" +
              data.brand.toLowerCase() +
              "/" +
              data.type.toLowerCase() +
              "/" +
              data.model.toLowerCase() +
              "/" +
              data.year.toLowerCase() +
              "/"
          );
          */
        });
    } else {
      props.setBikeData(null);
    }

    setSelectedBike(data);
  };

  // If url holds bike info
  if (window.location.pathname) {
    const paths = decodeURIComponent(
      window.location.pathname.substring(1)
    ).split("/", 4);

    if (paths.length === 4) {
      setSelectedBikeFromUrl({
        brand: paths[0],
        type: paths[1],
        model: paths[2],
        year: paths[3],
      });
    }
  }

  // On page load
  useEffect(() => {
    // Fetch brands
    fetch("/bikes/brands.json")
      .then((response) => response.json())
      .then((data) => {
        setBrandsData(data);
      });
  }, []);

  return (
    <StyledHeader>
      {brandsData && (
        <div>
          <StyledLabel htmlFor="selectBrand">Märke:</StyledLabel>
          <StyledSelect
            id="selectBrand"
            value={selectedBike.brand}
            onChange={(event) =>
              onSelectedBikeChange({
                brand: event.target.value,
                type: "",
                model: "",
                year: "",
              })
            }
          >
            <option disabled></option>
            {brandsData.brands.map((brand) => (
              <option key={brand.name}>{brand.name}</option>
            ))}
          </StyledSelect>
        </div>
      )}

      {typesData && selectedBike.brand && (
        <div>
          <StyledLabel htmlFor="selectType">Typ:</StyledLabel>
          <StyledSelect
            id="selectType"
            value={selectedBike.type}
            onChange={(event) =>
              onSelectedBikeChange({
                ...selectedBike,
                type: event.target.value,
                model: "",
                year: "",
              })
            }
          >
            <option disabled></option>
            {typesData.types.map((type) => (
              <option key={type.name}>{type.name}</option>
            ))}
          </StyledSelect>
        </div>
      )}

      {modelsData && selectedBike.type && (
        <div>
          <StyledLabel htmlFor="selectModel">Modell:</StyledLabel>
          <StyledSelect
            id="selectModel"
            value={selectedBike.model}
            onChange={(event) =>
              onSelectedBikeChange({
                ...selectedBike,
                model: event.target.value,
                year: "",
              })
            }
          >
            <option disabled></option>
            {modelsData.models.map((model) => (
              <option key={model.name}>{model.name}</option>
            ))}
          </StyledSelect>
        </div>
      )}

      {yearsData && selectedBike.model && (
        <div>
          <StyledLabel htmlFor="selectYear">År:</StyledLabel>
          <StyledSelect
            id="selectYear"
            value={selectedBike.year}
            onChange={(event) =>
              onSelectedBikeChange({
                ...selectedBike,
                year: event.target.value,
              })
            }
          >
            <option disabled></option>
            {yearsData.years.map((year) => (
              <option key={year.name}>{year.name}</option>
            ))}
          </StyledSelect>
        </div>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const StyledLabel = styled.label`
  text-transform: uppercase;
  font-size: 0.875rem;
  margin-right: 0.3rem;
  letter-spacing: 1px;
`;

const StyledSelect = styled.select`
  margin-right: 1rem;
`;

export { Header };
