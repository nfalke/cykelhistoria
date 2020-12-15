import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface HeaderPropsInterface {
  bikeData: bikeDataInterface;
  setBikeData: (data: bikeDataInterface) => void;
}

interface selectedBikeInterface {
  brand: string;
  type: string;
  model: string;
  year: string;
}

interface bikeDataInterface {
  brand: string;
  type: string;
  model: string;
  year: string;
  description: string;
  images: [
    {
      src: string;
      description: string;
    }
  ];
}

const Header = (props: HeaderPropsInterface) => {
  const [brandsData, setBrandsData] = useState(null);
  const [typesData, setTypesData] = useState(null);
  const [modelsData, setModelsData] = useState(null);
  const [yearsData, setYearsData] = useState(null);
  const [bikeData, setBikeData] = useState<bikeDataInterface>(null);
  const [selectedBike, setSelectedBike] = useState<selectedBikeInterface>({
    brand: "",
    type: "",
    model: "",
    year: "",
  });

  // On page load
  useEffect(() => {
    // Fetch brands
    fetch("/bikes/brands.json")
      .then((response) => response.json())
      .then((data) => {
        setBrandsData(data);

        // If url holds bike info
        if (window.location.pathname) {
          const paths = decodeURIComponent(
            window.location.pathname.substring(1)
          ).split("/", 4);

          if (paths.length === 4) {
            setSelectedBike({
              brand: paths[0],
              type: paths[1],
              model: paths[2],
              year: paths[3],
            });
          }
        }
      });
  }, []);

  useEffect(() => {
    if (brandsData && selectedBike.brand) {
      // Fetch types
      fetch(
        brandsData.brands.find((brand) => brand.slug === selectedBike.brand)
          .types
      )
        .then((response) => response.json())
        .then((data) => {
          setTypesData(data);
        });
    }
  }, [brandsData, selectedBike.brand]);

  useEffect(() => {
    if (typesData && selectedBike.type) {
      // Fetch models
      fetch(
        typesData.types.find((type) => type.slug === selectedBike.type).models
      )
        .then((response) => response.json())
        .then((data) => {
          setModelsData(data);
        });
    }
  }, [typesData, selectedBike.type]);

  useEffect(() => {
    if (modelsData && selectedBike.model) {
      // Fetch years
      fetch(
        modelsData.models.find((model) => model.slug === selectedBike.model)
          .years
      )
        .then((response) => response.json())
        .then((data) => {
          setYearsData(data);
        });
    }
  }, [modelsData, selectedBike.model]);

  useEffect(() => {
    if (yearsData && selectedBike.year) {
      // Fetch bike
      fetch(
        yearsData.years.find((year) => year.name === selectedBike.year).bike
      )
        .then((response) => response.json())
        .then((data) => {
          setBikeData(data);
          window.document.title =
            data.brand + " " + data.model + ", " + data.year;

          window.history.replaceState(
            {},
            data.brand + " " + data.model + ", " + data.year,
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
    }
  }, [yearsData, selectedBike]);

  useEffect(() => {
    if (bikeData && bikeData !== props.bikeData) {
      props.setBikeData(bikeData);
    }
  }, [bikeData, props.setBikeData, props]);

  return (
    <StyledHeader>
      {brandsData && (
        <Fieldset>
          <StyledLabel htmlFor="selectBrand">Märke:</StyledLabel>
          <StyledSelect
            id="selectBrand"
            value={selectedBike.brand}
            onChange={(event) =>
              setSelectedBike({
                brand: event.target.value,
                type: "",
                model: "",
                year: "",
              })
            }
          >
            <option disabled></option>
            {brandsData.brands.map((brand) => (
              <option key={brand.slug} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </StyledSelect>
        </Fieldset>
      )}

      {typesData && selectedBike.brand && (
        <Fieldset>
          <StyledLabel htmlFor="selectType">Typ:</StyledLabel>
          <StyledSelect
            id="selectType"
            value={selectedBike.type}
            onChange={(event) =>
              setSelectedBike({
                ...selectedBike,
                type: event.target.value,
                model: "",
                year: "",
              })
            }
          >
            <option disabled></option>
            {typesData.types.map((type) => (
              <option key={type.slug} value={type.slug}>
                {type.name}
              </option>
            ))}
          </StyledSelect>
        </Fieldset>
      )}

      {modelsData && selectedBike.type && (
        <Fieldset>
          <StyledLabel htmlFor="selectModel">Modell:</StyledLabel>
          <StyledSelect
            id="selectModel"
            value={selectedBike.model}
            onChange={(event) =>
              setSelectedBike({
                ...selectedBike,
                model: event.target.value,
                year: "",
              })
            }
          >
            <option disabled></option>
            {modelsData.models.map((model) => (
              <option key={model.slug} value={model.slug}>
                {model.name}
              </option>
            ))}
          </StyledSelect>
        </Fieldset>
      )}

      {yearsData && selectedBike.model && (
        <Fieldset>
          <StyledLabel htmlFor="selectYear">År:</StyledLabel>
          <StyledSelect
            id="selectYear"
            value={selectedBike.year}
            onChange={(event) =>
              setSelectedBike({
                ...selectedBike,
                year: event.target.value,
              })
            }
          >
            <option disabled></option>
            {yearsData.years.map((year) => (
              <option key={year.name} value={year.name}>
                {year.name}
              </option>
            ))}
          </StyledSelect>
        </Fieldset>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  padding: 0.5rem;
  flex-wrap: wrap;

  @media (min-width: 500px) {
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }
`;

const Fieldset = styled.header`
  padding: 0.5rem;
`;

const StyledLabel = styled.label`
  margin-right: 0.3rem;
  letter-spacing: 1px;
  display: block;

  @media (min-width: 700px) {
    display: inline;
  }
`;

const StyledSelect = styled.select`
  font-size: 1rem;
`;

export { Header, bikeDataInterface };
