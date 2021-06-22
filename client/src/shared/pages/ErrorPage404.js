import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

const Wrapper = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 64px - 3vh);
`;

export function ErrorPage() {
  return (
    <Wrapper>
      <Typography variant="h1" component="h2" gutterBottom>
        Error 404
      </Typography>
      <ErrorIcon fontSize="large" />
      <h3>Page not found </h3>
      <p>Sorry, the page you are looking for does not exist</p>
    </Wrapper>
  );
}

export default ErrorPage;
