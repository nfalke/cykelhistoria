import React from "react";
import styled from "styled-components";

interface FooterPropsInterface {}

function Footer(props: FooterPropsInterface) {
  return (
    <StyledFooter>
      <FooterContent>
        Cykelhistoria.se dokummenterar och bevarar information om cyklar vars
        storhetstid pågick långt före internets uppkomst. Har du material att
        dela med dig av, hör av dig till{" "}
        <Link href="#">kontakt@cykelhistoria.se</Link>.
      </FooterContent>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  padding: 1rem;
  font-size: 0.75rem;
  color: #999;
`;

const FooterContent = styled.footer`
  text-align: center;
`;

const Link = styled.a`
  color: #999;
  transition: color 0.3s;
  &:hover {
    color: #666;
  }
`;

export { Footer };
