import React from "react";
import styled from "styled-components";
import { bikeDataInterface } from "../App";

interface MainPropsInterface {
  bikeData: bikeDataInterface;
}

function Main(props: MainPropsInterface) {
  return (
    <StyledMain>
      {props.bikeData && (
        <>
          <Heading>{`${props.bikeData?.brand}, ${props.bikeData?.type}, ${props.bikeData?.model}, ${props.bikeData?.year}`}</Heading>
          {props.bikeData.images.map((image) => (
            <Image key={image.src} src={image.src} />
          ))}
        </>
      )}
    </StyledMain>
  );
}

const StyledMain = styled.main`
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

export { Main };
