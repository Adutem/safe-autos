import React from "react";
import styled from "styled-components";
import { Button } from "./reusables/Styles";
import { useGlobalContext } from "../contexts/GlobalContext";

const SearchTireIframe = () => {
  const { hideSearchModal } = useGlobalContext();

  return (
    <SearchIframeModal>
      <SearchIframe src="https://www.midas.com/store/mi/rochester/746-south-rochester-48307/tires?shopnum=6112&v=lookup#tire-shop-modes" />
      <OptimizedFormButton onClick={hideSearchModal}>
        Close Modal
      </OptimizedFormButton>
    </SearchIframeModal>
  );
};

const SearchIframeModal = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  right: 0;
  top: 0;
  width: min(300px, 90%);
  height: 100dvh;
`;

const SearchIframe = styled.iframe`
  flex: 1;
`;
const OptimizedFormButton = styled(Button)``;
export default SearchTireIframe;
