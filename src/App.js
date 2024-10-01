
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Slider from './components/Layout/Slider';
import MenuLeft from './components/Layout/MenuLeft';
import { useLocation } from 'react-router-dom';
import MenuAccount from './components/Layout/MenuAccount';
import { UserContext } from './UserContext'
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store'
function App(props) {
  let param1 = useLocation()
  const isCart = param1.pathname === "/product/cart"

  // const [qty, setQty] = useState(0)
  const user = JSON.parse(localStorage.getItem('authUser'))

  // function getQty(data) {
  //   setQty(data)
  //   localStorage["tongQty"] = JSON.stringify(data);
  // }
  return (

    // <UserContext.Provider value={{
    //   qty: qty,
    //   getQty: getQty,
    //   // email: user.email
    // }}>
    <Provider store={store} >
      <Header />
      <Slider />
      <section>
        <div className='container'>
          <div className='row'>
            {!isCart && (
              <>
                {param1['pathname'].includes("account") ||
                  param1['pathname'].includes("my-product") ||
                  param1['pathname'].includes("/product/add") ||
                  param1['pathname'].includes("/product/edit")
                  ? <MenuAccount /> : <MenuLeft />
                }
              </>
            )}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </Provider>
    // </UserContext.Provider>
  );
}

export default App;
