import { createContext } from "react";

// Used for Context in Authentication for RootSPA, just so that autofill works fine
export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
  loginType: "",
});
