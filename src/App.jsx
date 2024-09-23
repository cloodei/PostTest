import React, { useState, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
const HomePage = React.lazy(() => import('./pages/HomePage.jsx'));
const Shop = React.lazy(() => import('./pages/Shop.jsx'));
const AboutUs = React.lazy(() => import('./pages/AboutUs.jsx'));
const ContactUs = React.lazy(() => import('./pages/ContactUs.jsx'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage.jsx'));
import CartCheckout from './pages/CartCheckout.jsx';
const AddProduct = React.lazy(() => import('./pages/AddProduct.jsx'));
const UpdateProduct = React.lazy(() => import('./pages/UpdateProduct.jsx'));
const ProductsView = React.lazy(() => import('./pages/ProductsView.jsx'));
const Layout = React.lazy(() => import('./components/Layout.jsx'));
const NoLayout = React.lazy(() => import('./components/NoLayout.jsx'));
import { HandleFilterProvider } from './contexts/HandleFilterContext.jsx';
import { HandleTargetProvider } from './contexts/HandleTargetContext.jsx';
import { ModalGalleryProvider } from './contexts/ModalGalleryContext.jsx';
import { DrawerProvider } from './contexts/FakeDrawerContext.jsx';
import CartProvider from './contexts/CartContext.jsx';

function App() {
  // const [mySQLData, setMySQLData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   globalVar.listData.forEach((product) => {
  //     fetch('http://localhost:3001/api/products', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(product),
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.message);
  //     });
  //   });
  // }, []);

  return (
  <Suspense fallback={<h1 className='text-center' style={{ marginTop: '50vh', transform: 'translateY(-50%)', fontSize: '60px' }}>Hang On...<CircularProgress style={{ color: '#3f51b5', marginLeft: '12px' }}/></h1>}>
    <HandleFilterProvider>
      <CartProvider>
        <HandleTargetProvider>
          <ModalGalleryProvider>
            <DrawerProvider>
              <Routes>
                <Route path='/' element={<Layout></Layout>}>
                  <Route path='' element={<HomePage></HomePage>}></Route>
                  <Route path='shop' element={<Shop></Shop>}></Route>
                  <Route path='aboutUs' element={<AboutUs></AboutUs>}></Route>
                  <Route path='contactUs' element={<ContactUs></ContactUs>}></Route>
                  <Route path='gallery' element={<GalleryPage></GalleryPage>}></Route>
                  <Route path='cart' element={<CartCheckout></CartCheckout>}></Route>
                </Route>
                  <Route path='/' element={<NoLayout></NoLayout>}>
                    <Route path='addProduct' element={<AddProduct></AddProduct>}></Route>
                    <Route path='updateProduct/:id' element={<UpdateProduct></UpdateProduct>}></Route>
                    <Route path='productsView' element={<ProductsView></ProductsView>}></Route>
                  </Route>
              </Routes>
            </DrawerProvider>
          </ModalGalleryProvider>
        </HandleTargetProvider>
      </CartProvider>
    </HandleFilterProvider>
  </Suspense>
  )
}

export default App;