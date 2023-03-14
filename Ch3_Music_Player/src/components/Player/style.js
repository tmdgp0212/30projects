import styled from "styled-components";

export const Player = styled.div`
  width: 100%;
  height: 100%;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({bg}) => bg});
    background-size: cover;
    filter: blur(15px) brightness(0.4);
    z-index: -1;
  }
`