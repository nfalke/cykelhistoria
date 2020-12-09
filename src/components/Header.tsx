import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { selectedBikeInterface } from "../App";

interface brandDataInterface {
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

interface HeaderPropsInterface {
  onSelectedBike: (value: selectedBikeInterface) => void;
  selectedBike: selectedBikeInterface;
}

function Header(props: HeaderPropsInterface) {
  const [brandData, setBrandData] = useState<brandDataInterface>(null);

  useEffect(() => {
    if (window.location.pathname) {
      const paths = decodeURIComponent(
        window.location.pathname.substring(1)
      ).split("/", 4);

      paths.length === 4 &&
        props.onSelectedBike({
          brand: paths[0],
          type: paths[1],
          model: paths[2],
          year: paths[3],
          src: "",
        });
    }
  }, []);

  // On selected brand
  useEffect(() => {
    if (
      props.selectedBike?.brand &&
      brandData?.name !== props.selectedBike.brand
    ) {
      fetch("/json/" + props.selectedBike?.brand + ".json")
        .then((response) => response.json())
        .then((data) => {
          setBrandData(data);
        });
    }
  }, [props.selectedBike, brandData]);

  return (
    <StyledHeader>
      <label>Märke</label>
      <select
        value={props.selectedBike.brand}
        onChange={(event) => {
          props.onSelectedBike({
            brand: event.target.value,
            type: "",
            model: "",
            year: "",
            src: "",
          });
        }}
      >
        <option disabled></option>
        <option>Crescent</option>
      </select>

      {brandData && props.selectedBike.brand ? (
        <>
          <label>Typ</label>
          <select
            value={props.selectedBike.type}
            onChange={(event) => {
              props.onSelectedBike({
                ...props.selectedBike,
                type: event.target.value,
                model: "",
                year: "",
                src: "",
              });
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

      {brandData && props.selectedBike.type ? (
        <>
          <label>Modell</label>
          <select
            value={props.selectedBike.model}
            onChange={(event) => {
              props.onSelectedBike({
                ...props.selectedBike,
                model: event.target.value,
                year: "",
                src: "",
              });
            }}
          >
            <option disabled></option>
            {brandData.types
              .find((type) => type.name === props.selectedBike.type)
              .models.map((model) => (
                <option key={model.name}>{model.name}</option>
              ))}
          </select>
        </>
      ) : (
        ""
      )}

      {brandData && props.selectedBike?.model ? (
        <>
          <label>År</label>
          <select
            value={props.selectedBike.year}
            onChange={(event) => {
              props.onSelectedBike({
                ...props.selectedBike,
                year: event.target.value,
                src: brandData.types
                  .find((type) => type.name === props.selectedBike.type)
                  .models.find(
                    (model) => model.name === props.selectedBike.model
                  )
                  .years.find((year) => year.name === event.target.value).src,
              });
            }}
          >
            <option disabled></option>
            {brandData.types
              .find((type) => type.name === props.selectedBike.type)
              .models.find((model) => model.name === props.selectedBike.model)
              .years.map((year) => (
                <option key={year.name}>{year.name}</option>
              ))}
          </select>
        </>
      ) : (
        ""
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  height: 3rem;
  border-bottom: 1px solid #eee;
`;

export { Header };
