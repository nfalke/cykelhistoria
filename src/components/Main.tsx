import React from "react";
import styled from "styled-components";
import { bikeDataInterface } from "./Header";

interface MainPropsInterface {
  bikeData: bikeDataInterface;
}

const Main = (props: MainPropsInterface) => {
  return (
    <StyledMain>
      {props.bikeData && (
        <StyledContent>
          <Heading>{`${props.bikeData?.brand} ${props.bikeData?.model}, ${props.bikeData?.year}`}</Heading>
          {props.bikeData?.description ? (
            <Preamble>{props.bikeData?.description}</Preamble>
          ) : (
            ""
          )}
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
`;

const StyledContent = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  padding: 0 0.5rem;

  @media (min-width: 768px) {
    padding: 0 3rem;
  }
`;

const Heading = styled.h1`
  margin-top: 3rem;
  text-align: center;
  font-weight: normal;
  font-size: 0.875rem;
  letter-spacing: 1px;
`;

const Preamble = styled.p`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const Figure = styled.figure`
  margin: 3rem 0;
  line-height: 0;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Figcaption = styled.figcaption`
  font-size: 0.75rem;
  font-style: italic;
  margin-top: 0.5rem;
  line-height: 1.6;
  color: #999;
`;

export { Main };
