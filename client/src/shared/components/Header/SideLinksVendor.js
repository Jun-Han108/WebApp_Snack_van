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
        <li onClick={auth.logout}>
          <MyNavLink to="/vendor/">Logout</MyNavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <MyNavLink to="/vendor/close">
            <Button variant="contained" color="secondary">
              CLOSE BUSINESS
            </Button>
          </MyNavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <MyNavLink to="/vendor/login">
            <Button variant="contained" color="secondary">
              {tabletSize ? "VENDOR LOGIN" : "LOGIN"}
            </Button>
          </MyNavLink>
        </li>
      )}
    </ItemList>
  );
}
