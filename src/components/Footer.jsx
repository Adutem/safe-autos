import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import footerLinks from "../data/footer-links";
import { ColumnFlexContainer } from "./reusables/Styles";
import { SearchComponent } from "./Advert";
import { useGlobalContext } from "../contexts/GlobalContext";
// import { LocationModal } from "../pages/ScheduleService";

const Footer = () => {
  const { currentStoreLocation, displayLocationModal } = useGlobalContext();

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
          <ColumnFlexContainer style={{ alignItems: "flex-start" }}>
            <Header>Headquarters</Header>
            <Address>
              <strong>Phone: </strong> 248-693-7979 <br />
              <br />
              <strong>Location: </strong> 591 S Lapeer Road
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
              <a
                href="https://www.linkedin.com/in/acorn-tire-and-auto-a91730245/"
                target="_blank"
              >
                <i className="fi fi-brands-linkedin"></i>
              </a>
            </Social>
          </ColumnFlexContainer>
        </Sections>
      </GridContainer>
      <Sections>
        <SearchComponent
          showShowModal={displayLocationModal}
          currentLocation={currentStoreLocation}
          style={{
            marginTop: "1.5rem",
            padding: "0.5rem",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          linkType={"mapLink"}
          dropdownText={"select store location"}
          linkText={"Get Direction"}
        />
      </Sections>
      <Sections>
        <Para>
          Copyright &copy; 2018-2023{" "}
          <LinkItem to="/terms-of-use">Terms of Use</LinkItem> |{" "}
          <LinkItem to={"/privacy"}>Privacy</LinkItem>
        </Para>
      </Sections>
      <Sections>
        <Para>
          Developed by{" "}
          <LinkItem target="_blank" to="https://aduteminnovationmarketing.com/">
            Adutem Innovation
          </LinkItem>
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
  width: 100%;
  max-width: 928px;
  margin: auto;
  // justify-items: center;

  @media (max-width: 928px) {
    grid-template-columns: repeat(2, 1fr);
    // justify-items: center;
    width: 80%;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    width: 100%;
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
  text-align: left;
  font-size: 0.8rem;
  font-weight: 300;
`;

const Social = styled.div`
  display: flex;
  gap: 1rem;
  // align-items: center;

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
  // align-items: center;
  flex-direction: column;
  background: transparent;
  gap: 0.8rem;
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
  font-size: 0.8rem;

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
    white-space: nowrap;

    &:hover {
      text-decoration: none;
    }
  }

  @media (max-width: 540px) {
    text-align: left;
    font-size: 0.85rem;
  }
`;
export default Footer;
