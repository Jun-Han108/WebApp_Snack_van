import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  /* position: absolute; */
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #4b4b4b;
  color: white;
  text-align: center;
  line-height: 3vh;
`;
const Text = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;

export function Footer() {
  return (
    <FooterWrapper>
      <Text>©Snacks in a Van 2021</Text>
    </FooterWrapper>
  );
}

export default Footer;
