import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Navbar from "./Navbar/Navbar";
import ProductsController from "./Products/ProductsController";
import Faq from "./FAQ/Faq";
import Checkout from "./Checkout/Checkout";
import Login from "./Login/login";
import SignUp from "./SignUp/signup";
import Admin from "./Admin/Admin";
import Legal from "./Legal/Legal";
import Terms from "./Terms/Terms";
import Privacy from "./Privacy/Privacy";
import Refund from "./Refund/Refund";
import { useEffect, useState } from "react";
import {
  ShoppingCartSessionStorageModel,
  SHOPPING_CART_KEY,
  USER_AUTH_KEY,
} from "../Models/Keys";
import { CartItemModel } from "../Models/Item";
import Profile from "./Profile/Profile";
import { UserAuth, AUTH_LEVEL } from "../Models/Auths";

import { getLogger } from "../LogConfig";
import { createTheme, ThemeProvider } from "@mui/material";
const log = getLogger("view.app");

const fontTheme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
    ].join(",")
  }
});

function App() {
  const [items, setItems] = useState([] as CartItemModel[]);
  const [userAuth, setUserAuth] = useState({
    username: "",
    authLevel: AUTH_LEVEL.rejected,
  } as UserAuth);

  useEffect(() => {
    // checks if there is some items in the local storage
    let data = localStorage.getItem(SHOPPING_CART_KEY);
    if (data) {
      let shoppingCart = JSON.parse(data) as ShoppingCartSessionStorageModel;
      // if so, it sets the items to the local storage's items
      setItems(shoppingCart.items);
    }

    // checks if there is auth in the session storage
    let userData = localStorage.getItem(USER_AUTH_KEY);
    if (userData && JSON.parse(userData).authLevel !== AUTH_LEVEL.rejected) {
      log.debug(userData);
      let userDataObj = JSON.parse(userData) as UserAuth;
      // if so, it sets auth
      setUserAuth(userDataObj);
    } else {
      // checks if there is auth in the session storage
      userData = sessionStorage.getItem(USER_AUTH_KEY);
      if (userData && JSON.parse(userData).authLevel !== AUTH_LEVEL.rejected) {
        let userDataObj = JSON.parse(userData) as UserAuth;
        // if so, it sets auth
        setUserAuth(userDataObj);
      }
    }


  }, []);

  return (
    <>
      <ThemeProvider theme={fontTheme}>
        <Navbar items={items} setItems={setItems} userAuth={userAuth} setUserAuth={setUserAuth} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/products"
              element={<ProductsController items={items} setItems={setItems} />}
              />
            <Route path="/faq" element={<Faq />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login userAuth={userAuth} setUserAuth={setUserAuth}/>} />
            <Route path="/signup" element={<SignUp userAuth={userAuth} setUserAuth={setUserAuth}/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
