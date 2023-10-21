import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  SectionHeading,
  NormalPara,
  Container,
} from "../components/reusables/Styles";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const News = () => {
  const news = useSelector((state) => state.news);
  const { currentStoreLocation } = useGlobalContext();

  return (
    <NewsContainer>
      <SectionHeading style={{ marginTop: "1rem" }}>News</SectionHeading>
      <Container>
        {news.loading && <NormalPara>Loading news</NormalPara>}
        {currentStoreLocation && !news.loading && !news.news.length && (
          <NormalPara>No news to display</NormalPara>
        )}
        {currentStoreLocation ? (
          !news.loading &&
          news.news.length > 0 && (
            <NewsSection>
              <NewsCardContainer>
                {news.news.map((car) => (
                  <NewsCard {...car} />
                ))}
              </NewsCardContainer>
            </NewsSection>
          )
        ) : (
          <NormalPara>Pick a store location to see news</NormalPara>
        )}
      </Container>
    </NewsContainer>
  );
};

const NewsContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  min-height: 400px;
`;

const Heading = styled.h2`
  font-family: var(--teko);
  text-align: center;
`;

const NewsSection = styled.div`
  margin: 1rem auto;
  max-width: 700px;
`;

export const NewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsCard = ({ _id, title, author, imgUrl, createdAt }) => {
  const navigate = useNavigate();
  return (
    <CardContainer
      onClick={() => {
        navigate("/about/news/" + _id);
      }}
    >
      <NewsImageContainer>
        <NewsImage src={imgUrl} />
      </NewsImageContainer>
      <NewsDetails>
        <Title>Title: {title}</Title>
        <Author>Author: {author}</Author>
        <CreatedAt>
          Published on: {new Date(createdAt).toDateString()}
        </CreatedAt>
      </NewsDetails>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  padding: 1rem;
  border-radius: 0.3rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.19);
  cursor: pointer;
  transition: 0.4s ease;
  border: 1px solid lightgray;

  &:hover {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const NewsImageContainer = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NewsDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Title = styled.h3`
  font-style: italic;
  font-weight: 600;
  font-family: var(--mont);
`;

const Author = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--mont);
`;

const CreatedAt = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--mont);
`;
export default News;
