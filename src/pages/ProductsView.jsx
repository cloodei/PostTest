import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Drawer } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { DrawerContext } from "../contexts/FakeDrawerContext";
import '../assets/styles/ProductsView.css';

export default function ProductsView() {
    // const Products = globalVar.mySQLData;
    const [Products, setProducts] = useState([]);
    const [categories, setCategories] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [fetchErrors, setFetchErrors] = useState({ fakeProducts: null, categories: null });
    useEffect(async () => {
        await fetch('https://hello-sql.vercel.app/api/fakeproducts')
        .then((res) => res.json())
        .then((data) => {
            setProducts(data);
        })
        .catch((err) => {
            setFetchErrors({ ...fetchErrors, fakeProducts: err });
        });

        await fetch('https://hello-sql.vercel.app/api/categories')
        .then((res) => res.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((err) => {
            setFetchErrors({ ...fetchErrors, categories: err });
        });
    }, []);
    const { open, toggleDrawer } = useContext(DrawerContext);
    const cardMargin = 12;
    const cardPadding = 6;

    useEffect(() => {
        if (category === 'all') {
            setFilteredProducts(Products.filter((product) => { return product.name.trim().toLowerCase().includes(search.trim().toLowerCase())} ));
        } else {
            setFilteredProducts(Products.filter((product) => { return product.name.trim().toLowerCase().includes(search.trim().toLowerCase()) && product.category_id == category} ));
        }
    }, [Products, search, category]);

    const handleDelete = (id) => {
        fetch(`https://hello-sql.vercel.app/api/fakeproducts/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setProducts(Products.filter((product) => product.id !== id));
        });
    }

    const getTimeDifference = (updatedAt) => {
        const now = new Date();
        const updatedDate = new Date(updatedAt);
        const diffInMs = now - updatedDate;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return "Just now!";
        if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    };
    
    return (
    <>
        <div className="container-fluid products-view-full">
            <h1 className="products-view-header">
                <Link to={'/admin/addProduct'} className="special-products-redirect">
                    <i className="fa-regular fa-circle-left"></i>
                    Add Product
                </Link>
                Products
                <span className="special-root-products">USER - ROOT</span>
            </h1>
            <i onClick={() => toggleDrawer(true)} className="fa-solid fa-bars toggle-fake-drawer" style={{
                left: '12px',
            }}></i>
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
                        <Link onClick={() => toggleDrawer(false)} to={'/admin/addProduct'}>
                            <li className="drawer-list-item"><i className="fa-solid fa-plus me-3"></i>Add Product</li>
                        </Link>
                        <Link onClick={() => toggleDrawer(false)} to={'/admin/addProduct'}>
                            <li className="drawer-list-item"><i className="fa-solid fa-pen me-3"></i>Update Product</li>
                        </Link>
                        <Link onClick={() => toggleDrawer(false)} to={'/admin/productsView'}>
                            <li className="drawer-list-item"><i className="fa-solid fa-eye me-3"></i>View Products</li>
                        </Link>
                    </ul>
                </div>
            </Drawer>
            <div className="container" id="ProductsContainer">
                {Products.length === 0 ?
                <h2 className="db-announce">
                    Database is Empty...
                    <CircularProgress 
                        style={{
                            color: '#3f51b5',
                            marginLeft: '12px',
                        }}
                    />
                </h2> :
                <>
                    {categories &&
                    <div className="row px-2 pt-2 pb-4">
                        <input type="text" className="form-control filter-view" style={{ flex: 1 }} placeholder="Search Products..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        <select style={{ maxWidth: '25%', borderRadius: '8px', marginLeft: '24px' }} className="filter-view" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    }
                    <div className="row">
                        {filteredProducts.map((product, index) => (
                            <div className="col-3 card mb-3 products-view-card d-grid" key={index} style={{
                                border: 'none',
                                marginRight: `${cardMargin / 2}px`,
                                marginLeft: `${cardMargin / 2}px`,
                                width: `calc(100% / 3 - ${cardMargin}px)`,
                            }}>
                                <div className="row g-0" style={{ flex: 1, }}>
                                    <div className="col-md-4" style={{
                                        width: 'calc(500% / 12)',
                                        padding: `${cardPadding}px`,
                                        position: 'relative',
                                    }}>
                                        <div className="products-view-card-overlay" style={{
                                            height: `calc(100% - ${cardPadding * 2}px)`,
                                            width: `calc(100% - ${cardPadding * 2}px)`,
                                        }}>
                                            <p className="card-text text-white" style={{ marginBottom: '0', }}>ID: {product.id}</p>
                                        </div>
                                        <img src={product.image} style={{
                                            height: '100%',
                                            objectFit: 'cover',
                                            flex: '1',
                                            borderRadius: '6px',
                                        }} className="img-fluid" alt="..." />
                                    </div>
                                    <div className="col-md-8 d-flex flex-column justify-content-between" style={{
                                        width: 'calc(700% / 12)',
                                    }}>
                                        <div className="card-body pt-1 pb-0 pe-0 d-flex flex-column justify-content-center" style={{ height: 'fit-content', }}>
                                            <h5 className="card-title">Name: {product.name}</h5>
                                            <p className="card-text card-description" style={{ marginBottom: '4px' }}>Description: {product.description}</p>
                                            <p className="card-text card-description">Category: {product.category} - {product.category_id}</p>
                                            <p className="card-text" style={{ marginBottom: '0px', }}>Pricing: ${product.price}</p>
                                        </div>
                                        <div className="control-btn-group">
                                            <p className="card-text card-update"><small className="">Last updated: {getTimeDifference(product.updatedAt)}</small></p>
                                            <Link to={`/updateProduct/${product.id}`} className="edit-product-btn">Edit</Link>
                                            <button onClick={() => handleDelete(product.id)} className="delete-product-btn">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>}
            </div>
        </div>
    </>
    )
}