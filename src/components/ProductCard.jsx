import React, { useContext } from "react";
import { cartContext } from "../contexts/CartContext.jsx";

export default function ProductCard(props) {
    const fakeData = props.data;
    const contextCart = useContext(cartContext);

    return (
        <div className="col-2">
            <div className="card">
                <img src={fakeData.image} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{fakeData.name}</h5>
                    <p className="card-text">{fakeData.price}</p>
                    <p className="card-text">{fakeData.description}</p>
                    {
                        (props.check) ?
                        <button className="btn btn-success" onClick={() => {
                            contextCart.addProductToCart(fakeData)}
                        }>Buy now
                        </button> : 
                        <button className="btn btn-danger" onClick={() => {
                            contextCart.removeProductFromCart(fakeData)}
                        }>Xóa SP khỏi giỏ
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}