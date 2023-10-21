import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../contexts/GlobalContext";

const NewsDetails = ({ data }) => {
  const { newsId } = useParams();
  const [currentNews, setCurrentNews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let fetchNews = async (newsId) => {
      try {
        let response = await axios.get(`${BASE_URL}/news/${newsId}`);
        let news = response.data.news;
        setCurrentNews(news);
      } catch (error) {
        setError(
          error?.response?.data?.message ||
            "An error occured! Please refresh page."
        );
      }
    };
    if (newsId) {
      fetchNews(newsId);
    }
  }, [newsId]);
  return (
    <NewsDetailsPageContainer>
      <Title>{currentNews?.title}</Title>
      <Author>Author: {currentNews?.author}</Author>
      <PublicationDate>
        Published on: {new Date(currentNews?.createdAt).toDateString()}
      </PublicationDate>
      <HeroImage src={currentNews?.imgUrl} />
      {currentNews?.contents.map((content) => {
        if (content.contentType === "para")
          return <Para>{content.content}</Para>;
        if (content.contentType === "heading")
          return <Heading>{content.content}</Heading>;
      })}
    </NewsDetailsPageContainer>
  );
};

const NewsDetailsPageContainer = styled.div`
  padding: 4rem 0;
  width: 90%;
  max-width: 840px;
  margin: 0rem auto;
`;

const Title = styled.h1`
  font-family: var(--mont);
  color: #000;
  margin-bottom: 1.5rem;
`;

const Author = styled.p`
  font-size: 0.85rem;
  font-size: 500;
  margin-bottom: 1rem;
  font-family: var(--mont);
`;
const PublicationDate = styled.p`
  font-size: 0.85rem;
  font-style: italic;
  font-family: var(--mont);
  font-size: 500;
  margin-bottom: 1rem;
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 0.4rem;
`;

const Para = styled.p`
  font-family: var(--mont);
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const Heading = styled.h3`
  font-family: var(--mont);
  font-weight: 700;
  font-size: 1.3rem;
  margin: 1.5rem 0 1rem;
  text-transform: uppercase;
`;

export default NewsDetails;
