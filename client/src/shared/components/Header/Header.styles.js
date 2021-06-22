import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderWrapper = styled.div`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
`;

export const LogoText = styled.h1`
  color: white;
  margin-left: 16px;
`;

export const ItemList = styled.ul`
  color: white;
  padding: 0;
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;

  & > li:after {
    content: "|";
    margin: 0 8px;
  }
  & > li:last-child:after {
    content: "";
    margin: 0 8px;
  }
  & > a {
    color: white;
  }
`;
export const MyNavLink = styled(NavLink)`
  color: white;

  &:hover {
    color: grey;
  }
`;
