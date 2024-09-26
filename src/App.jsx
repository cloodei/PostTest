import React from 'react';
import { Router } from 'react-router-dom';
// const HomePage = React.lazy(() => import('./pages/HomePage.jsx'));
// const Shop = React.lazy(() => import('./pages/Shop.jsx'));
// const AboutUs = React.lazy(() => import('./pages/AboutUs.jsx'));
// const ContactUs = React.lazy(() => import('./pages/ContactUs.jsx'));
// const GalleryPage = React.lazy(() => import('./pages/GalleryPage.jsx'));
// const AddProduct = React.lazy(() => import('./pages/AddProduct.jsx'));
// const UpdateProduct = React.lazy(() => import('./pages/UpdateProduct.jsx'));
// const ProductsView = React.lazy(() => import('./pages/ProductsView.jsx'));
// const Layout = React.lazy(() => import('./components/Layout.jsx'));
// const NoLayout = React.lazy(() => import('./components/NoLayout.jsx'));
import { HandleFilterProvider } from './contexts/HandleFilterContext.jsx';
import { HandleTargetProvider } from './contexts/HandleTargetContext.jsx';
import { ModalGalleryProvider } from './contexts/ModalGalleryContext.jsx';
import { DrawerProvider } from './contexts/FakeDrawerContext.jsx';
import CartProvider from './contexts/CartContext.jsx';
import AppRoutes from './routes.jsx';

function App() {
  return (
    <HandleFilterProvider>
      <CartProvider>
        <HandleTargetProvider>
          <ModalGalleryProvider>
            <DrawerProvider>
              <Router>
                <AppRoutes />
              </Router>
            </DrawerProvider>
          </ModalGalleryProvider>
        </HandleTargetProvider>
      </CartProvider>
    </HandleFilterProvider>
  )
}

export default App;


{/* <Routes>
<Route path='/' element={<Layout/>} >
  <Route index element={<HomePage/>} />
  <Route path='shop' element={<Shop/>} />
  <Route path='aboutUs' element={<AboutUs/>} />
  <Route path='contactUs' element={<ContactUs />} />
  <Route path='gallery' element={<GalleryPage />} />
  <Route path='cart' element={<CartCheckout />} />
</Route>
<Route path='/admin/addProduct' element={<AddProduct />} />
<Route path='/admin/updateProduct/:id' element={<UpdateProduct />} />
<Route path='/admin/productsView' element={<ProductsView />} />
</Routes> */}