import React from "react";
import styled from "styled-components";

const GoogleMapComp = (props) => {
  return (
    // Important! Always set the container height explicitly
    <MapContainer {...props}>
      <iframe
        width="100%"
        height="400"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=591%20S%20Lapeer%20Rd.%20Lake%20Orion,%20MI%2048362+(Acorn%20Tire%20&amp;%20Auto%20LLC)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 2rem;
`;

export default GoogleMapComp;
