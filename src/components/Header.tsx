import React, { useState, useEffect } from "react";
import styled from "styled-components";
import type {} from "styled-components/cssprop";

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
  facts?: string;
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
  const [hideHeader, setHideHeader] = useState(false);

  // On page load
  useEffect(() => {
    setIsLoading(true);

    // If url holds bike info
    if (window.location.pathname) {
      const paths = window.location.pathname.substring(1).split("/");

      if (paths.length === 5) {
        setHideHeader(true);
      }

      setSelectedBike({
        brand: paths[0] || "",
        type: paths[1] || "",
        model: paths[2] || "",
        year: paths[3] || "",
      });
    }

    // Fetch brands
    fetch("/bikes/brands.json")
      .then((response) => response.json())
      .then((data) => {
        setBrandsData(data);
        setIsLoading(false);
      });
  }, []);

  // On select brand change
  useEffect(() => {
    if (selectedBike.brand) {
      setIsLoading(true);

      // Fetch types
      fetch("/bikes/" + selectedBike.brand + "/types.json")
        .then((response) => response.json())
        .then((data) => {
          setTypesData(data);
          setIsLoading(false);
        });
    }
  }, [selectedBike.brand]);

  // On select type change
  useEffect(() => {
    if (selectedBike.type) {
      setIsLoading(true);

      // Fetch models
      fetch(
        "/bikes/" +
          selectedBike.brand +
          "/" +
          selectedBike.type +
          "/models.json"
      )
        .then((response) => response.json())
        .then((data) => {
          setModelsData(data);
          setIsLoading(false);
        });
    }
  }, [selectedBike.brand, selectedBike.type]);

  // On select model change
  useEffect(() => {
    if (selectedBike.brand && selectedBike.type && selectedBike.model) {
      setIsLoading(true);

      // Fetch years
      fetch(
        "/bikes/" +
          selectedBike.brand +
          "/" +
          selectedBike.type +
          "/" +
          selectedBike.model +
          "/years.json"
      )
        .then((response) => response.json())
        .then((data) => {
          setYearsData(data);
          setIsLoading(false);
        });
    }
  }, [selectedBike.brand, selectedBike.type, selectedBike.model]);

  // On select year change
  useEffect(() => {
    if (
      selectedBike.brand &&
      selectedBike.type &&
      selectedBike.model &&
      selectedBike.year
    ) {
      const path =
        "/" +
        selectedBike.brand +
        "/" +
        selectedBike.type +
        "/" +
        selectedBike.model +
        "/" +
        selectedBike.year +
        "/";

      // Fetch bike
      fetch("/bikes/" + path + "/bike.json")
        .then((response) => response.json())
        .then((data) => {
          setBikeData(data);
          const title = data.brand + " " + data.model + ", " + data.year;
          const metaDescription = data.description
            .substring(0, 160)
            .replace(/\S+[\W]*$/, "…");

          window.document.title = title;
          document.head
            .querySelector("link[rel='canonical']")
            .setAttribute(
              "href",
              window.location.protocol + window.location.hostname + path
            );

          if (window.location.pathname !== path) {
            window.history.pushState({}, title, path);
          }

          document.head
            .querySelector("meta[name='description']")
            .setAttribute("content", metaDescription);

          // Add virtual pageview to analytics
          (window as any).gtag("config", "G-2F6CXND2S2", {
            page_path: path,
          });

          setHideHeader(false);
        });
    }
  }, [selectedBike]);

  useEffect(() => {
    if (bikeData && bikeData !== props.bikeData) {
      props.setBikeData(bikeData);
    }
  }, [bikeData, props]);

  return (
    <>
      {!hideHeader && (
        <StyledHeader>
          {!bikeData && <p>Välj cykel här ⤵</p>}
          <StyledHeaderContainer>
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
            {isLoading && <Loader />}
          </StyledHeaderContainer>
        </StyledHeader>
      )}
    </>
  );
};

const StyledHeader = styled.header`
  padding: 0.5rem;
  background: #fff;
  text-align: center;

  @media (min-width: 500px) {
    padding: 1rem;
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Fieldset = styled.div`
  padding: 0.5rem;
  display: flex;
`;

const StyledLabel = styled.label`
  margin-right: 0.3rem;
  letter-spacing: 1px;

  @media (min-width: 700px) {
    display: inline;
  }
`;

const StyledSelect = styled.select`
  font-size: 1rem;
  flex-grow: 1;
`;

const Loader = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 0.2rem solid #444;
  border-radius: 50%;
  border-color: #444;
  border-left-color: transparent;
  margin-left: 0.5rem;
  animation: spin 0.75s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export { Header, bikeDataInterface };
