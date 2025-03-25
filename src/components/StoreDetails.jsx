import React from "react";
import { NormalPara } from "./reusables/Styles";

const StoreDetails = ({ store, onClick }) => {
  return (
    <NormalPara
      key={store.id}
      onClick={onClick}
      style={{
        margin: "0.5rem 0",
        fontSize: "0.75rem",
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <strong>{store.shopLocation}</strong>
      <span>{store.address}</span>
      <span>{store.phone || store.phoneNumber}</span>
      <a href={store.link} target="_blank" rel="noopener noreferrer">Visit Store</a>
      <a href={store.couponLink} target="_blank" rel="noopener noreferrer">Coupons</a>
      <a href={store.financingLink} target="_blank" rel="noopener noreferrer">Financing</a>
      <a href={store.facebookLink} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href={store.mapLink} target="_blank" rel="noopener noreferrer">Map</a>
    </NormalPara>
  );
};

export default StoreDetails;
