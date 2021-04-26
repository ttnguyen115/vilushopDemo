import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import PaypalButton from '../payment/PaypalButton';

function Cart() {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [cart, setCart] = state.userApi.cart;
    const [total, setTotal] = useState(0);
 
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity);
            }, 0);

            setTotal(total);  
        }

        getTotal();
    }, [cart]);

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        });
    }

    const handleIncrease = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1;
            }
        });

        setCart([...cart]);
        addToCart(cart);
    }

    const handleDecrease = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        });

        setCart([...cart]);
        addToCart(cart);
    }

    const handleDelete = (id) => {
        if (window.confirm("Do you want to delete this product?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1);
                }
            })

            setCart([...cart]);
            addToCart(cart);
        }
    }

    const tranSuccess = async (payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([]);
        addToCart([]);
        alert('You have successfully placed an order');
    }

    if (cart.length === 0) {
        return <h2 className="text-center text-2xl">Cart Empty</h2>
    }

    return (
        <div>
            {
                cart.map(product  => (
                    <div key={product._id} className="relative border border-gray-500 rounded">
                        <img src={product.images.url} alt="" className="max-w-md w-full m-5 h-96 object-cover block"/>

                        <div className="max-w-lg w-full m-5">
                            <div className="flex justify-between items-center">
                                <h2 className="text-3xl uppercase text-blue-700 tracking-widest font-bold">{product.title}</h2>
                            </div>

                            <h3>$ {product.price * product.quantity}</h3>

                            <p className="leading-normal my-2.5 opacity-80">{product.description}</p>

                            <p className="leading-normal my-2.5 opacity-80">{product.content}</p>

                            <div className="flex items-center">
                                <RemoveCircleIcon 
                                    className="cursor-pointer" 
                                    color="primary"  
                                    onClick={() => handleDecrease(product._id)} 
                                />

                                <span className="text-red-400 py-0 px-5 text-xl">{product.quantity}</span>

                                <AddCircleIcon 
                                    className="cursor-pointer" 
                                    color="primary" 
                                    onClick={() => handleIncrease(product._id)} 
                                />
                            </div>

                            <div 
                                className="absolute top-0 right-1.5 text-red-400 font-black cursor-pointer"
                                onClick={() => handleDelete(product._id)}
                            >
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="w-full h-14 flex items-center justify-between">
                <h3 className="text-red-400">Total: $ {total}</h3>
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess}
                />
            </div>
        </div>
    )
}

export default Cart
