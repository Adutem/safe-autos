import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import footerLinks from "../data/footer-links";
import { ColumnFlexContainer } from "./reusables/Styles";
import tireOne from "../assets/acorn-logo-white.png";

const Footer = () => {
  return (
    <FooterContainer>
      <GridContainer>
        {footerLinks.map(({ header, routePath, links }) => (
          <Sections>
            <LinkList>
              <Header>{header}</Header>
              {links.map(({ path, name }) => (
                <ListItem>
                  <LinkItem to={`${routePath}${path}`}>{name}</LinkItem>
                </ListItem>
              ))}
            </LinkList>
          </Sections>
        ))}
        <Sections>
          <ColumnFlexContainer>
            <Header>Vist Our Shop</Header>
            <Address>
              <strong>Phone: </strong> 248-693-7979 <br />
              <br />
              <strong>Headquarters: </strong> 591 S Lapeer Road
              <br />
              <br />
              Lake Orion, MI 48362
            </Address>
            <Social>
              <a
                href="https://www.facebook.com/profile.php?id=100089312797389"
                target="_blank"
              >
                <i className="fi fi-brands-facebook"></i>
              </a>
              <a
                href="https://www.google.com/search?q=acorn+tires+%26+auto&rlz=1C1NDCM_enNG1053NG1053&oq=acorn+tires+%26+auto&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCggCEAAYhgMYigUyCggDEAAYhgMYigUyCggEEAAYhgMYigUyBggFEEUYPNIBCDUzMjZqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8&bshm=rimc/1"
                target="_blank"
              >
                <i className="fi fi-brands-google"></i>
              </a>
              {/* <a href="#">
                <i className="fi fi-brands-twitter"></i>
              </a> */}
            </Social>
          </ColumnFlexContainer>
        </Sections>
      </GridContainer>
      {/* <Sections>
        <ColumnFlexContainer>
          <ImageContainer>
            <TireOneImage src={tireOne} />
          </ImageContainer>
        </ColumnFlexContainer>
      </Sections> */}
      <Sections>
        <Para>
          Copyright &copy; 2018-2023{" "}
          <LinkItem to="/terms-of-use">Terms of Use</LinkItem> |{" "}
          <LinkItem to={"/privacy"}>Privacy</LinkItem>
          {/* |{" "}
          <LinkItem to={"/accessiblity"}>Accessibility</LinkItem> |{" "}
          <LinkItem to={"/sitemap"}>Sitemap</LinkItem> */}
        </Para>
      </Sections>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background: var(--gray);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 928px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const Sections = styled.section`
  border-bottom: 1px solid rgba(var(--white-rgb), 0.3);
  background: transparent;
  padding: 2rem;
`;

const Address = styled.address`
  color: var(--white);
  font-family: var(--mont);
  text-align: center;
  font-size: 0.9rem;
  font-weight: 300;
`;

const Social = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  i {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--white);
    transition: 0.4s ease;

    &:hover {
      color: var(--primary-color);
    }
  }
`;

const LinkList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: transparent;
  gap: 1rem;
`;

const Header = styled.h3`
  font-family: var(--teko);
  color: var(--primary-color);
  text-transform: uppercase;
`;

const ListItem = styled.li``;

const LinkItem = styled(Link)`
  font-family: var(--mont);
  color: var(--white);
  transition: 0.4s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

const ImageContainer = styled.div`
  width: 90%;
  max-width: 300px;
  margin: auto;
`;
const TireOneImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const Para = styled.p`
  text-align: center;
  color: var(--white);
  font-family: var(--mont);

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;
export default Footer;
