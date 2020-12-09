import React from "react";
import styled from "styled-components";
import { selectedBikeInterface, bikeDataInterface } from "../App";

interface MainPropsInterface {
  bikeData: bikeDataInterface;
  selectedBike: selectedBikeInterface;
}

function Main(props: MainPropsInterface) {
  return (
    <StyledMain>
      {props.bikeData ? (
        <>
          <Heading>{`${props.selectedBike?.brand}, ${props.selectedBike?.type}, ${props.selectedBike?.model}, ${props.selectedBike?.year}`}</Heading>
          {props.bikeData.images.map((image) => (
            <Image key={image.src} src={image.src} />
          ))}
        </>
      ) : (
        ""
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
