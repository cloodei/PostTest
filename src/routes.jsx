import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Shop from './pages/Shop.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import CartCheckout from './pages/CartCheckout.jsx';
import AddProduct from './pages/AddProduct.jsx';
import UpdateProduct from './pages/UpdateProduct.jsx';
import ProductsView from './pages/ProductsView.jsx';
import Layout from './components/Layout.jsx';
import NoLayout from './components/NoLayout.jsx';

export default function AppRoutes() {
    return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='shop' element={<Shop />} />
            <Route path='aboutUs' element={<AboutUs />} />
            <Route path='contactUs' element={<ContactUs />} />
            <Route path='gallery' element={<GalleryPage />} />
            <Route path='cart' element={<CartCheckout />} />
        </Route>
        <Route path='/admin' element={<NoLayout />}>
            <Route path='addProduct' element={<AddProduct />} />
            <Route path='updateProduct/:id' element={<UpdateProduct />} />
            <Route path='productsView' element={<ProductsView />} />
        </Route>
    </Routes>
    );
}