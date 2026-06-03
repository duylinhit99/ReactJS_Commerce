import "./App.css";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCartQty } from "./actions/cart";
import { getCartTotalQty } from "./utils/cart";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Slider from "./components/Layout/Slider";
import MenuLeft from "./components/Layout/MenuLeft";
import MenuAccount from "./components/Layout/MenuAccount";
import store from "./store";
import { shouldShowAccountMenu } from "./constants/routes";

function AppContent({ children }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isCartPage = pathname === "/product/cart";
  const showAccountMenu = shouldShowAccountMenu(pathname);

  useEffect(() => {
    dispatch(setCartQty(getCartTotalQty()));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Slider />
      <section>
        <div className="container">
          <div className="row">
            {!isCartPage && (showAccountMenu ? <MenuAccount /> : <MenuLeft />)}
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function App({ children }) {
  return (
    <Provider store={store}>
      <AppContent>{children}</AppContent>
    </Provider>
  );
}

export default App;
