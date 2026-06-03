import "./App.css";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Slider from "./components/Layout/Slider";
import MenuLeft from "./components/Layout/MenuLeft";
import MenuAccount from "./components/Layout/MenuAccount";
import store from "./store";
import { shouldShowAccountMenu } from "./constants/routes";

function App({ children }) {
  const { pathname } = useLocation();
  const isCartPage = pathname === "/product/cart";
  const showAccountMenu = shouldShowAccountMenu(pathname);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
