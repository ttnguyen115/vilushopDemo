import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import { Loading } from '../loading';
import ProductItem from './ProductItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, makeStyles } from '@material-ui/core';
import Filters from '../productFeatures/Filters';
import LoadMore from '../productFeatures/LoadMore';

const useStyles = makeStyles(theme => ({
    checkBtn: {
        width: '25px',
        height: '25px',
        backgroundColor: 'white', 
        margin: '0 15px',
    }
}))

function Products() {
    const classes = useStyles();
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsApi.products;
    const [isAdmin] = state.userApi.isAdmin;
    const addCart = state.userApi.addCart;
    const [token] = state.token;
    const [callback, setCallback] = state.productsApi.callback;
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true);
            const destroyImg = axios.post('/api/destroy', {public_id}, {
                headers: {Authorization: token}
            });
            console.log(destroyImg);
            const deleteProduct = axios.delete(`/api/products/${id}`, {
                headers: {Authorization: token}
            });

            await destroyImg;
            await deleteProduct;
            setLoading(false);
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    }
    
    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) product.checked = !product.checked;
        });

        setProducts([...products]);
    }

    const handleCheckAll = () => {
        products.forEach(product => {
             product.checked = !check;
        });

        setProducts([...products]);
        setCheck(!check);
    }

    const deleteAll = () => {
        products.forEach(product => {
            if (product.checked) deleteProduct(product._id, product.images.public_id);
        })
    }

    if (loading) return  <div><Loading type="bars" color="#000" /></div>

    return (
        <>
            <Filters />

            {
                isAdmin && 
                <div className="text-right m-5">
                    <span className="uppercase tracking-wide">Select all</span>
                    <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        checked={check} 
                        className={classes.checkBtn}
                        onChange={handleCheckAll}
                    />
                    <Button color="primary" variant="contained" size="small"
                        onClick={deleteAll}
                    >
                        Delete All
                    </Button>
                </div>
            }

            <div className="w-full grid grid-cols-products justify-center my-5">
                { 
                    products.map(product => (
                        <ProductItem 
                            key={product._id} 
                            product={product} 
                            isAdmin={isAdmin} 
                            addCart={addCart} 
                            token={token}
                            deleteProduct={deleteProduct}
                            handleCheck={handleCheck}
                        />
                    ))    
                }
            </div>

            <LoadMore />
            {products.length === 0 && <Loading type="spinningBubbles" color="#000" />}
        </>
    )
}

export default Products
