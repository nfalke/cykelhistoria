import React from "react";
import styled from "styled-components";

interface FooterPropsInterface {}

function Footer(props: FooterPropsInterface) {
  return <StyledFooter>Footer</StyledFooter>;
}

const StyledFooter = styled.main`
  background: red;
`;

export { Footer };
