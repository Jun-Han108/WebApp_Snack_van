import React, { useContext } from "react";
import { ItemList, MyNavLink } from "./Header.styles";
import { AuthContext } from "../../auth-context";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { device } from "../device";
import Button from "@material-ui/core/Button";

// They are the top list of navigation bar, it will use router's Navlink to redirect, stylised using StyledComponents
export default function SideLinks() {
  const auth = useContext(AuthContext);
  const tabletSize = useMediaQuery(device.tablet);

  return (
    <ItemList>
      {tabletSize && (
        <li>
          <MyNavLink to="/help">Help</MyNavLink>
        </li>
      )}
      {tabletSize && (
        <li>
          <MyNavLink to="/contactus">Contact Us</MyNavLink>
        </li>
      )}
      {tabletSize && auth.isLoggedIn && (
        <li>
          <MyNavLink to="/customer/myaccount">My Account</MyNavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <MyNavLink to="/customer">
            <Button variant="contained" color="secondary" onClick={auth.logout}>
              LOGOUT
            </Button>
          </MyNavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <MyNavLink to="/customer/login">
            <Button variant="contained" color="secondary">
              {tabletSize ? "CUSTOMER LOGIN" : "LOGIN"}
            </Button>
          </MyNavLink>
        </li>
      )}
    </ItemList>
  );
}
