import React, { useEffect, useState } from "react";
import styled from "styled-components";
import spinnerImage from "../../assets/loading-gif.gif";

const GoogleMapComp = ({ iframeLink, ...rest }) => {
  const [loading, setLoading] = useState(false);

  const handleLoaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [iframeLink]);
  return (
    // Important! Always set the container height explicitly
    <MapContainer {...rest}>
      {loading && <Loader />}
      <iframe
        src={iframeLink}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        onLoad={handleLoaded}
        onLoadEnd={handleLoaded}
      ></iframe>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  margin-top: 2rem;
  position: relative;
`;

export default GoogleMapComp;

// `<iframe src={iframeLink} width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner src={spinnerImage} />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

const Spinner = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;
