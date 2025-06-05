import {
  LoaderOverlay,
  LoaderContainer,
  LoadingText,
  Dots,
} from "./Loader.styled";

export const Loader = () => (
  <LoaderOverlay>
    <LoaderContainer>
      <LoadingText>
        Loading portfolio
        <Dots>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </Dots>
      </LoadingText>
    </LoaderContainer>
  </LoaderOverlay>
);
