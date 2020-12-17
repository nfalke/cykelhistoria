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
      filename: string;
      description: string;
    }
  ];
}

const Header = (props: HeaderPropsInterface) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const updateUrl = (title: string, path: string) => {
    window.document.title = "Cykelhistoria.se - " + title;
    window.history.replaceState({}, title, "/" + path + "/");
    setIsLoading(false);
  };

  // On page load
  useEffect(() => {
    setIsLoading(true);

    // Fetch brands
    fetch("/bikes/brands.json")
      .then((response) => response.json())
      .then((data) => {
        setBrandsData(data);
        setIsLoading(false);

        // If url holds bike info
        if (window.location.pathname) {
          const paths = window.location.pathname.substring(1).split("/");

          setSelectedBike({
            brand: paths[0] || "",
            type: paths[1] || "",
            model: paths[2] || "",
            year: paths[3] || "",
          });
        }
      });
  }, []);

  // On selectedBike change
  useEffect(() => {
    if (selectedBike.brand) {
      setIsLoading(true);
      const path = selectedBike.brand;

      // Fetch types
      fetch("/bikes/" + path + "/types.json")
        .then((response) => response.json())
        .then((data) => {
          setTypesData(data);

          if (!selectedBike.type) {
            const title = data.brand;
            updateUrl(title, path);
          }
        });
    }

    if (selectedBike.brand && selectedBike.type) {
      const path = selectedBike.brand + "/" + selectedBike.type;

      // Fetch models
      fetch("/bikes/" + path + "/models.json")
        .then((response) => response.json())
        .then((data) => {
          setModelsData(data);

          if (!selectedBike.model) {
            const title = data.brand + " " + data.type;
            updateUrl(title, path);
          }
        });
    }

    if (selectedBike.brand && selectedBike.type && selectedBike.model) {
      const path =
        selectedBike.brand + "/" + selectedBike.type + "/" + selectedBike.model;

      // Fetch years
      fetch("/bikes/" + path + "/years.json")
        .then((response) => response.json())
        .then((data) => {
          setYearsData(data);

          if (!selectedBike.year) {
            const title = data.brand + " " + data.model;
            updateUrl(title, path);
          }
        });
    }

    if (
      selectedBike.brand &&
      selectedBike.type &&
      selectedBike.model &&
      selectedBike.year
    ) {
      const path =
        selectedBike.brand +
        "/" +
        selectedBike.type +
        "/" +
        selectedBike.model +
        "/" +
        selectedBike.year;

      // Fetch bike
      fetch("/bikes/" + path + "/bike.json")
        .then((response) => response.json())
        .then((data) => {
          setBikeData(data);
          const title = data.brand + " " + data.model + ", " + data.year;
          updateUrl(title, path);
        });
    }
  }, [selectedBike]);

  useEffect(() => {
    if (bikeData && bikeData !== props.bikeData) {
      props.setBikeData(bikeData);
    }
  }, [bikeData, props]);

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
      {isLoading && <Loader isLoading={isLoading} />}
    </StyledHeader>
  );
};

interface LoaderPropsIterface {
  isLoading: boolean;
}

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

const Loader = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.2rem solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-color: #444;
  border-left-color: transparent;
  animation: spin 0.75s linear infinite;
  margin-left: 0.5rem;
  transition: opacity 0.5s ease;
  opacity: 0;
  opacity: ${(props: LoaderPropsIterface) => props.isLoading && 1};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export { Header, bikeDataInterface };
