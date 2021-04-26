import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import ProductItem from './ProductItem';

function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const addCart = state.userApi.addCart;
    const [products] = state.productsApi.products;
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product);
            })
        }
    }, [params.id, products]);

    if (detailProduct.length === 0) return null;

    return (
        <>
            <div className="w-full flex justify-around p-12 flex-wrap text-xl">
                <img src={detailProduct.images.url} alt="" className="max-w-md w-full m-5 h-96 object-cover block"/>

                <div className="max-w-lg w-full m-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl uppercase text-blue-700 tracking-widest font-bold">{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>

                    <span>$ {detailProduct.price}</span>

                    <p className="leading-normal my-2.5 opacity-80 detail">{detailProduct.description}</p>

                    <p className="leading-normal my-2.5 opacity-80 detail">{detailProduct.content}</p>

                    <p className="leading-normal my-2.5 opacity-80">Sold: {detailProduct.sold}</p>

                    <Link 
                        to="/cart" 
                        className="bg-gray-600 text-white mt-2.5 py-2.5 px-5 inline-block uppercase leading-normal rounded"
                        onClick={() => addCart(detailProduct)}
                    >
                        Buy Now
                    </Link>
                </div>
            </div>

            <div>
                <h2>Related products</h2>
                <div className="w-full grid grid-cols-products justify-center my-5">
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
