import React, {createContext, useState} from "react";

export const cartContext = createContext();

export default function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv, setCvv] = useState('');

    const addProductToCart = (newProduct) => {
        let Category = newProduct.category;
        const find = cartProducts.findIndex((item) => {
            return (item.product.id === newProduct.id) && (item.product.category === Category);
        })
        let newCartProducts = [...cartProducts];
        if (find === -1) {
            if(newProduct.category === 'mugs' || newProduct.category === 'bags' || newProduct.category === 'caps' || newProduct.category === 'shirts') {
                Category = 'merch';
            }
            newCartProducts.push({
                id: cartProducts.length + 1,
                quantity: 1,
                product: newProduct,
                itemCategory: (Category[0].toUpperCase() + Category.slice(1))
            })
        }
        else {
            if(cartProducts[find].quantity >= 25) {
                return;
            }
            if(cartProducts[find].product.id > 40) {
                Category = 'merch';
            }
            newCartProducts[find] = {
                id: cartProducts[find].id,
                quantity: cartProducts[find].quantity + 1,
                product: cartProducts[find].product,
                itemCategory: (Category[0].toUpperCase() + Category.slice(1)),
            }
        }
        setCartProducts(newCartProducts);
    }

    const removeProductByID = (id, dangerCheck = true) => {
        if(dangerCheck && EmptyCheck(cartProducts[id - 1].product)) {
            return;
        }
        if(cartProducts.length === 1) {
            setCartProducts([]);
            return;
        }
        const updatedCartProducts = cartProducts.filter((item) => {return (item && (item.id !== id))}).map((item, index) => { return { ...item, id: index + 1 } });
        setCartProducts(updatedCartProducts);
    }

    const removeProductFromCart = (product, dangerCheck = true) => {
        if(dangerCheck && EmptyCheck(product))
            return;
        cartProducts[product.id - 1] = null;
        const fakeCartList = cartProducts.filter((item) => {
            return item;
        })
        setCartProducts(fakeCartList);
    }

    function EmptyCheck(product) {
        cartProducts.forEach((item) => {
            if(item.product.id === product.id && item.product.category === product.category)
                return false;
        })
        return true;
    }

    const changeQuantityByID = (id, amount) => {
        if(amount < 1 || amount > 25)
            return;
        const newCartProducts = cartProducts.map((item) => {
            return item.id === id ? { ...item, quantity: amount } : item;
        })
        setCartProducts(newCartProducts);
    }

    const increaseProductQuantity = (product, amount) => {
        if(EmptyCheck(product) || cartProducts[product.id - 1].quantity + amount > 25)
            return;
        cartProducts[product.id - 1].quantity += amount;
        setCartProducts(cartProducts);
    }

    const decreaseProductQuantity = (product, amount) => {
        if(EmptyCheck(product) || cartProducts[product.id - 1].quantity <= amount)
            return;
        cartProducts[product.id - 1].quantity -= amount;
        setCartProducts(cartProducts);
    }

    const setProductQuantity = (product, amount) => {
        if(EmptyCheck(product))
            return;
        if(amount < 1) {
            amount = 1;
        }
        else if(amount > 25) {
            amount = 25;
        }
        cartProducts[product.id - 1].quantity = amount;
        setCartProducts(cartProducts);
    }

    return (
        <cartContext.Provider value={{ cartProducts, setCartProducts, addProductToCart, removeProductFromCart, removeProductByID, changeQuantityByID, increaseProductQuantity, decreaseProductQuantity, setProductQuantity, selectedPayment, setSelectedPayment, cardNumber, setCardNumber, cardName, setCardName, expiration, setExpiration, cvv, setCvv }}>
            {children}
        </cartContext.Provider>
    )
}