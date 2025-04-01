import React from "react";
import { PromotionInterface, PromotionPost } from "../../data/Promotion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface PromotionCardProps {
  Promotion: PromotionInterface;
  index: number;
}

const PromotionCard = ({ Promotion, index }: PromotionCardProps) => {
  const navigate = useNavigate();

  const { _id, title, thumbNail, tag, publicationDate, shortIntroduction } =
    Promotion;

  return (
    <Container
      className="fade-up-card delay-200 opacity-40 translate-x-6 translate-y-20"
      style={{
        transition: "transform 0.5s, opacity 0.7s ease",
      }}
      onClick={() => navigate(`/Promotion/${_id}`, { state: { PromotionData: Promotion } })}
    >
      <div className="md:grid grid-cols-5 gap-4 md:gap-6 lg:gap-10 items-center">
        <div
          className={`md:col-span-2 lg:col-span-3 h-auto ${
            index % 2 === 0 ? "order-1" : "order-2"
          }`}
        >
          <div className="w-full rounded-t-md md:rounded-md overflow-hidden h-[200px] sm:h-[280px] md:h-[300px] lg:h-[350px]">
            <img
              src={thumbNail.downloadUrl}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div
          className={`md:col-span-3 lg:col-span-2 p-6 rounded-b-md md:rounded-md ${
            index % 2 === 0 ? "order-2" : "order-1"
          }`}
        >
          <div className="flex gap-4 my-2 mt-4">
            <p className="uppercase text-xs faded">{tag}</p>
            <p className="uppercase text-xs faded">
              {new Date(publicationDate).toDateString()}
            </p>
          </div>
          <h2
            className="text-xl text-[var(--base-color)] md:leading-[1.1] md:w-10/12"
            style={{ fontSize: "clamp(1.45rem, 4.5vw, 2.4rem)" }}
          >
            {title}
          </h2>
          <p
            className="mt-4"
            style={{ fontSize: "clamp(0.8rem, 4.5vw, 18px)" }}
          >
            {shortIntroduction.length > 200
              ? `${shortIntroduction.slice(0, 201)}...`
              : shortIntroduction}
          </p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div``;

export default PromotionCard;
