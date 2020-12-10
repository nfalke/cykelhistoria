import React from "react";
import styled from "styled-components";
import { bikeDataInterface } from "../App";

interface MainPropsInterface {
  bikeData: bikeDataInterface;
}

const Main = (props: MainPropsInterface) => {
  return (
    <StyledMain>
      {props.bikeData && (
        <StyledContent>
          <Heading>{`${props.bikeData?.brand} ${props.bikeData?.model}, ${props.bikeData?.year}`}</Heading>
          {props.bikeData.images.map((image) => (
            <Figure key={image.src}>
              <Image src={image.src} />
              {image.description ? (
                <Figcaption>{image.description}</Figcaption>
              ) : (
                ""
              )}
            </Figure>
          ))}
        </StyledContent>
      )}
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  background: #f5f5f5;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

const StyledContent = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  padding: 0 3rem;
`;

const Heading = styled.h1`
  margin-top: 3rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: normal;
  font-size: 0.875rem;
  letter-spacing: 1px;
`;

const Figure = styled.figure`
  margin: 3rem 0;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Figcaption = styled.figcaption`
  font-size: 0.875rem;
  font-style: italic;
  margin-top: 0.5rem;
`;

export { Main };
