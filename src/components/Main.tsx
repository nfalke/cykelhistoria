import React from "react";
import styled from "styled-components";
import { bikeDataInterface } from "./Header";

interface MainPropsInterface {
  bikeData: bikeDataInterface;
}

const Main = (props: MainPropsInterface) => {
  return (
    <StyledMain>
      <StyledContent>
        {!props.bikeData && <Heading>Välj cykel här ovanför &#10548;</Heading>}
        {props.bikeData && (
          <div itemScope itemType="http://schema.org/ProductModel">
            <Heading itemProp="name">
              <span itemProp="manufacturer">{props.bikeData?.brand}</span>
              &nbsp;
              <span itemProp="model">{props.bikeData?.model}</span>,&nbsp;
              <span itemProp="productionDate">{props.bikeData?.year}</span>
            </Heading>
            {props.bikeData?.description ? (
              <Preamble itemProp="description">
                {props.bikeData?.description}
              </Preamble>
            ) : (
              ""
            )}
            {props.bikeData?.facts ? (
              <Facts>{props.bikeData?.facts}</Facts>
            ) : (
              ""
            )}
            {props.bikeData.images.map((image) => (
              <Figure key={image.filename}>
                <Image
                  src={"/bikes" + window.location.pathname + image.filename}
                  itemProp="image"
                  alt={`${props.bikeData?.brand} ${props.bikeData?.model}, ${props.bikeData?.year}`}
                />
                {image.description ? (
                  <Figcaption>{image.description}</Figcaption>
                ) : (
                  ""
                )}
              </Figure>
            ))}
          </div>
        )}
      </StyledContent>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  background: #f2f2f2;
`;

const StyledContent = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;

  @media (min-width: 500px) {
    padding: 0 2rem;
  }

  @media (min-width: 800px) {
    padding: 0 3rem;
  }
`;

const Heading = styled.h1`
  margin-top: 2rem;
  text-align: center;
  font-weight: normal;
  font-size: 1rem;
  letter-spacing: 1px;

  @media (min-width: 500px) {
    margin-top: 3rem;
  }
`;

const Preamble = styled.p`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const Facts = styled.p`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const Figure = styled.figure`
  margin: 2rem 0;
  line-height: 0;

  @media (min-width: 500px) {
    margin: 3rem 0;
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

const Figcaption = styled.figcaption`
  font-size: 0.875rem;
  font-style: italic;
  margin-top: 0.5rem;
  line-height: 1.6;
  color: #666;
`;

export { Main };
