import React from "react";
import styled from "styled-components";

interface FooterPropsInterface {}

function Footer(props: FooterPropsInterface) {
  return (
    <StyledFooter>
      <FooterContent>Footer</FooterContent>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  padding: 1rem;
  font-size: 0.875rem;
`;

const FooterContent = styled.footer`
  max-width: 1000px;
  margin: 0 auto;
`;

export { Footer };
