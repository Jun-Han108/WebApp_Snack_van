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
        Error 401
      </Typography>
      <ErrorIcon fontSize="large" />
      <h3>Unauthorized</h3>
      <p>Sorry, your request could not be processed</p>
      <p>Please check if you are logged in with the correct credential</p>
    </Wrapper>
  );
}

export default ErrorPage;
