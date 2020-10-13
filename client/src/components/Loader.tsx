import React from "react";
import styled from "styled-components/macro";

// Graciously adapted from: https://tobiasahlin.com/spinkit/
const Spinner = styled.div`
  margin: 100px auto 0;
  width: 70px;
  text-align: center;

  & > div {
    width: 18px;
    height: 18px;
    border-radius: 100%;
    display: inline-block;
    animation: bouncedelay 1.4s infinite ease-in-out both;
  }

  @keyframes bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const Loader = () => {
  return (
    <Spinner>
      <div
        style={{
          backgroundColor: "hsl(129, 47%, 40%)",
          animationDelay: "-0.32s",
        }}
      />
      <div
        style={{
          backgroundColor: "hsl(287, 30%, 49%)",
          animationDelay: "-0.16s",
        }}
      />
      <div
        style={{ backgroundColor: "hsl(4, 63%, 49%)", animationDelay: "0s" }}
      />
    </Spinner>
  );
};

export default Loader;
