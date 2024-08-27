import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from "./components/Layout/Home"
import Blog from './components/Blog/Blog';
import BlogDetail from './components/Blog/BlogDetail';
import Index from './components/Member/Index';
import Account from './components/Account/Account';
import MyProduct from './components/Product/MyProduct';
import AddMyProduct from './components/Product/AddMyProduct';
import EditMyProduct from './components/Product/EditMyProduct';
import ProductHome from './components/Product/ProductHome';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Cart/Cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<ProductHome />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/detail/:id' element={<BlogDetail />} />
          <Route path='/login' element={<Index />} />
          <Route path='/account' element={<Account />} />
          <Route path='/my-product' element={<MyProduct />} />
          <Route path='/product/add' element={<AddMyProduct />} />
          <Route path='/product/edit/:id' element={<EditMyProduct />} />
          <Route path='/product/detail/:id' element={<ProductDetail />} />
          <Route path='/product/cart' element={<Cart />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
