import React from "react";
import styled from "styled-components";

interface FooterPropsInterface {}

function Footer(props: FooterPropsInterface) {
  return (
    <StyledFooter>
      <FooterContent>
        Cykelhistoria dokumenterar och bevarar information om cyklar vars
        storhetstid varade före internets uppkomst. Har du material att dela med
        dig av, hör av dig till{" "}
        <Link href="mailto:cykelhistoria@gmail.com">
          cykelhistoria@gmail.com
        </Link>
        .
      </FooterContent>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  padding: 1rem;
  font-size: 0.875rem;
  color: #666;
`;

const FooterContent = styled.p`
  text-align: center;
  margin: 0;
`;

const Link = styled.a`
  color: #666;
  transition: color 0.3s;
  &:hover {
    color: #000;
  }
`;

export { Footer };
