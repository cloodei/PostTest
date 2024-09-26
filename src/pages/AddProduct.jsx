import React, { useState, useEffect, useContext, useRef } from "react";
import { DrawerContext } from "../contexts/FakeDrawerContext";
import '../assets/styles/AddProduct.css'
import { Link } from "react-router-dom";
import { Drawer, CircularProgress } from '@mui/material';
import FakeAddModal from "../components/FakeAddModal";

export default function AddProduct() {
  const [isFading, setIsFading] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showPointers, setShowPointers] = useState({});
  const [isPointerFading, setIsPointerFading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [ok, setOk] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef([null, null]);
  const { open, toggleDrawer } = useContext(DrawerContext);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    fetch('https://hello-sql.vercel.app/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const validateName = (name) => {
    name = name.trim();
    return /^[a-zA-Z0-9 ,.!?]{8,}$/.test(name);
  };

  const validateImage = (image) => {
    image = image.trim();
    return /^(http|https):\/\/[^ "]+$/.test(image);
  };

  const validatePrice = (price) => {
    if(!price || !price.trim()) {
      return true;
    }
    return !isNaN(price) && parseFloat(price) >= 0;
  };

  const validateCategory = (category) => {
    return category !== 0;
  };

  const handleValidation = () => {
    let pointers = {};
    setShowPointers({});
    if (!validateName(name)) {
      pointers.name = true;
    }
    if (!validateImage(image)) {
      pointers.image = true;
    }
    if (!validatePrice(price)) {
      pointers.price = true;
    }
    if (!validateCategory(category)) {
      pointers.category = true;
    }
    setShowPointers(pointers);

    if (Object.keys(pointers).length > 0) {
      setIsPointerFading(true);
      timeoutRef[0] = setTimeout(() => {
        setIsPointerFading(false);
      }, 2700);
      timeoutRef[1] = setTimeout(() => {
        setShowPointers({});
      }, 3400);
      return false;
    }
    return true;
  };

  const handleFailure = (message) => {
    setConfirmationMessage(message);
    setIsFading(true);
    setShowConfirmation(true);
    setOk(false);
    timeoutRef[0] = setTimeout(() => {
      setIsFading(false);
    }, 2300);
    timeoutRef[1] = setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const myDBAddProduct = async (product) => {
    try {
      const response = await fetch('https://hello-sql.vercel.app/api/fakeproducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Data:', errorData.error);
        return { success: false, message: errorData.error || 'Failed to add product' };
      }
  
      const data = await response.json();
      return { success: true, message: data.message };
    }
    catch (err) {
      return { success: false, message: err.message };
    }
  };

  const handleSubmit = async () => {
    clearTimeout(timeoutRef[1]);
    clearTimeout(timeoutRef[0]);
    if (!handleValidation())
      return;
    setLoading(true);
    let fakeDesc = description.trim();
    if (!fakeDesc) {
      fakeDesc = 'No description available.';
    }
    let fakePrice = parseFloat(price);
    if (isNaN(fakePrice)) {
      fakePrice = 0;
    }
    const handleAdding = await myDBAddProduct({ name, image, fakePrice, description: fakeDesc, category_id: parseInt(category) });
    if (!handleAdding.success) {
      handleFailure(handleAdding.message);
      return;
    }
    setOk(true);
    setConfirmationMessage(handleAdding.message);
    setIsFading(true);
    setShowConfirmation(true);
    setName('');
    setImage('');
    setPrice('');
    setDescription('');
    setCategory(0);
    timeoutRef[0] = setTimeout(() => {
      setIsFading(false);
    }, 2300);
    timeoutRef[1] = setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const handleCloseConfirmation = () => {
    clearTimeout(timeoutRef[1]);
    clearTimeout(timeoutRef[0]);
    setIsFading(false);
    setShowConfirmation(false);
  }
  
  const openProductPreview = () => {
    setSelectedProduct(generateProductPreview());
    setOpenModal(true);
  }
  
  const generateProductPreview = () => {
    let fakeName = name.trim();
    if (!fakeName) {
      fakeName = 'No name available.';
    }
    let fakeImage = image.trim();
    if(!validateImage(fakeImage)) {
      fakeImage = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';
    }
    let fakeDesc = description.trim();
    if (!fakeDesc) {
      fakeDesc = 'No description available.';
    }
    let fakePrice = parseFloat(price);
    if (isNaN(fakePrice)) {
      fakePrice = 0;
    }
    fakePrice = fakePrice.toFixed(2);
    let fakeCategory = {};
    if(category === 0) {
      fakeCategory = { id: 0, name: 'None' };
    }
    else {
      fakeCategory = categories[category - 1];
    }
    return { name: fakeName, image: fakeImage, description: fakeDesc, price: fakePrice, category: fakeCategory };
  }

  return (
    <>
      {showConfirmation && (
        <>
          <div className={`overlay ${isFading ? 'fade-in' : 'fade-out'}`}></div>
          <div className={`confirmation-popup ${isFading ? 'fade-in' : 'fade-out'}`}>
            <div className="confirmation-content">
              <h2>
                { !ok ? `Error: ${confirmationMessage}` : confirmationMessage}
                { ok ?
                  <i className="fa-regular fa-circle-check" style={{
                    color: '#2cb52e',
                    marginLeft: '10px',
                    fontSize: '1.25rem'
                  }}></i>
                  : <i className="fa-regular fa-circle-xmark" style={{
                    color: '#e52e2e',
                    marginLeft: '10px',
                    fontSize: '1.25rem'
                  }}></i>
                }
              </h2>
              <button onClick={handleCloseConfirmation} className={`btn ${ok ? 'close-btn-success' : 'close-btn-danger'}`}>OK</button>
            </div>
          </div>
        </>
      )}
      <div className="container-fluid add-product-bg">
        <i onClick={() => toggleDrawer(true)} className="fa-solid fa-bars toggle-fake-drawer"></i>
        <Drawer open={open} onClose={() => toggleDrawer(false)}
          PaperProps={{
            style: {
              background: 'linear-gradient(to bottom, #d3dbee 0%, #b1e7d2 100%)',
              minWidth: '20%',
            },
          }}>
          <div className="drawer-content">
            <h3 className="drawer-header" style={{
              border: 'none',
              marginBottom: '0',
            }}>CLIENT</h3>
            <ul className="drawer-list">
              <Link onClick={() => toggleDrawer(false)} to={'/'}>
                <li className="drawer-list-item"><i className="fa-solid fa-house-chimney-user me-3"></i>Home</li>
              </Link>
              <Link onClick={() => toggleDrawer(false)} to={'/shop'}>
                <li className="drawer-list-item"><i className="fa-solid fa-store me-3"></i>Store</li>
              </Link>
              <Link onClick={() => toggleDrawer(false)} to={'/gallery'}>
                <li className="drawer-list-item"><i className="fa-solid fa-images me-3"></i>Gallery</li>
              </Link>
              <Link onClick={() => toggleDrawer(false)} to={'/aboutUs'}>
                <li className="drawer-list-item"><i className="fa-solid fa-circle-info me-3"></i>About</li>
              </Link>
              <Link onClick={() => toggleDrawer(false)} to={'/contactUs'}>
                <li className="drawer-list-item"><i className="fa-solid fa-phone me-3"></i>Contacts</li>
              </Link>
            </ul>
            <h3 className="drawer-header">ADMIN</h3>
            <ul className="drawer-list">
              <Link onClick={() => toggleDrawer(false)} to={'/addProduct'}>
                <li className="drawer-list-item"><i className="fa-solid fa-plus me-3"></i>Add Product</li>
              </Link>
              <Link onClick={() => toggleDrawer(false)} to={'/addProduct'}>
                <li className="drawer-list-item"><i className="fa-solid fa-pen me-3"></i>Update Product</li>
              </Link>
              <Link onClick={() => toggleDrawer(false)} to={'/productsView'}>
                <li className="drawer-list-item"><i className="fa-solid fa-eye me-3"></i>View Products</li>
              </Link>
            </ul>
          </div>
        </Drawer>
        <h3 className="my-0 py-3 pt-5 text-center position-relative" id="Payment-box">
          <Link to={'/productsView'} className="special-add-redirect">
            View Product List
            <i className="fa-solid fa-circle-right"></i>
          </Link>
          ADD PRODUCT
          <span onClick={openProductPreview} className="special-product-preview-btn">Preview Product</span>
        </h3>
        <div className="payment-container container">
          <div className={`payment-form ${isFading ? 'fade-out' : 'fade-in'}`} style={{
            width: '80%',
            margin: '0 auto',
          }}>
            <form className="pb-2">
              <div data-mdb-input-init className="form-outline mt-2 mb-5 form-field form-field-add-product position-relative">
                {showPointers.name ? (
                  <div className={`popup arrow-bottom ${isPointerFading ? 'fade-in' : 'fade-out'}`}>
                    <div className="popup-wrapper">
                      Invalid name. No special characters and length must be &gt; 8.
                    </div>
                  </div>
                ) : null}
                <input
                  type="text"
                  id="typeName"
                  className="form-control form-control-lg form-input form-input-add-product"
                  placeholder=" "
                  value={name}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="form-label form-label-add-product" htmlFor="typeName">
                  Product Name
                </label>
              </div>

              <div data-mdb-input-init className="form-outline mb-5 form-field form-field-add-product position-relative">
                <input
                  type="text"
                  id="typeDesc"
                  className="form-control form-control-lg form-input form-input-add-product"
                  placeholder=" "
                  value={description}
                  autoComplete="off"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label className="form-label form-label-add-product" htmlFor="typeDesc">
                  Product Description
                </label>
              </div>

              <div className="row">
                <div className="col-md-6 mb-5">
                  <div data-mdb-input-init className="form-outline form-field form-field-add-product position-relative">
                    {showPointers.price ? (
                      <div className={`popup arrow-bottom ${isPointerFading ? 'fade-in' : 'fade-out'}`}>
                        <div className="popup-wrapper">
                          Invalid price. Must be a valid positive number.
                        </div>
                      </div>
                    ) : null}
                    <input
                      type="text"
                      id="typePrice"
                      className="form-control form-control-lg form-input form-input-add-product"
                      placeholder=" "
                      value={price}
                      autoComplete="off"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label className="form-label form-label-add-product" htmlFor="typePrice">
                      Product Pricing
                    </label>
                  </div>
                </div>

                <div className="col-md-6 mb-5">
                  <div data-mdb-input-init className="form-outline form-field form-field-add-product position-relative">
                    {showPointers.category ? (
                      <div className={`popup arrow-bottom ${isPointerFading ? 'fade-in' : 'fade-out'}`}>
                        <div className="popup-wrapper">
                          Invalid category. Must select a category.
                        </div>
                      </div>
                    ) : null}
                    <select className="form-control form-control-lg form-input form-input-add-product form-select-add-product" style={{ color: '#b9babe8f' }} id="typeCate" value={category} onChange={(e) => {document.getElementById('typeCate').style.color = 'white'; setCategory(parseInt(e.target.value))}}>
                      <option selected disabled value="0">Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id} style={{ color: 'black' }}>{category.name}</option>
                      ))}
                    </select>
                    <label className="form-label form-label-add-product" htmlFor="typeCate">
                      Categories
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-5">
                <div data-mdb-input-init className="form-outline form-field form-field-add-product position-relative">
                  {showPointers.image ? (
                    <div className={`popup arrow-bottom ${isPointerFading ? 'fade-in' : 'fade-out'}`}>
                      <div className="popup-wrapper">
                        Invalid image URL. Must be a valid URL.
                      </div>
                    </div>
                  ) : null}
                  <input
                    type="text"
                    id="typeImage"
                    className="form-control form-control-lg form-input form-input-add-product"
                    placeholder=" "
                    value={image}
                    autoComplete="off"
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <label className="form-label form-label-add-product" htmlFor="typeImage">
                    Image URL
                  </label>
                </div>
              </div>

              <hr className="mb-4" style={{ height: '2px', backgroundColor: '#96a4ff', opacity: 1, marginTop: '0' }} />

              <div className="d-flex align-items-center justify-content-center mt-4 pt-4">
                <button type="button" onClick={handleSubmit} disabled={loading} data-mdb-button-init data-mdb-ripple-init className={`btn btn-block btn-lg form-payment-btns add-product-submit-btn ${loading ? 'loading-btn' : ''}`}>
                  {loading ?
                    (
                    <CircularProgress></CircularProgress>
                    ) : null
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      {selectedProduct &&
        <FakeAddModal product={selectedProduct} open={openModal} handleClose={handleClose} />
      }
      </div>
    </>
  )
}