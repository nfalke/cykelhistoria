import React from "react";
import styled from "styled-components";

interface FooterPropsInterface {}

function Footer(props: FooterPropsInterface) {
  return (
    <StyledFooter>
      <FooterContent>
        Cykelhistoria.se dokumenterar och bevarar information om cyklar vars
        storhetstid varade före internets uppkomst. Har du material att dela med
        dig av, hör av dig till{" "}
        <Link href="mailto:kontakt@cykelhistoria.se">
          kontakt@cykelhistoria.se
        </Link>
        .
      </FooterContent>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  padding: 1rem;
  font-size: 0.875rem;
  color: #999;
`;

const FooterContent = styled.p`
  text-align: center;
  margin: 0;
`;

const Link = styled.a`
  color: #999;
  transition: color 0.3s;
  &:hover {
    color: #666;
  }
`;

export { Footer };
