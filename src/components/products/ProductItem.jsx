import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routesConstants';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    checkBtn: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        backgroundColor: 'white',
    }
}))

function ProductItem({ product, isAdmin, addCart, deleteProduct, handleCheck })  {
    const classes = useStyles();

    return (
        <div className="max-w-xl overflow-hidden h-500px p-4 shadow-xl my-2.5 relative">
            {
                isAdmin && 
                    <Checkbox
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        checked={product.checked} 
                        className={classes.checkBtn}
                        onChange={() => handleCheck(product._id)}
                    />
            }

            <img 
                className="w-full h-320px block object-fill"
                src={product.images.url} 
                alt=""
            />

            <div>
                <h2 title={product.title} className="w-full overflow-ellipsis overflow-hidden whitespace-nowrap capitalize cursor-pointer text-blue-900">
                    {product.title}
                </h2>

                <span className="text-pink-600">
                    ${product.price}
                </span>

                <p className="w-full h-16 overflow-hidden text-gray-500">{product.description}</p>
            </div>

            {
                isAdmin 
                ? <>
                    <div className="w-full mt-2 flex justify-between">
                        <Link 
                            className="w-1/2 text-center uppercase text-white font-semibold tracking-widest p-1.5 bg-gray-500 mr-2 rounded" 
                            to="#!"
                            onClick={() => deleteProduct(product._id, product.images.public_id)}
                        >
                            Delete
                        </Link>
                        
                        <Link 
                            className="w-1/2 text-center uppercase text-white font-semibold tracking-widest p-1.5 bg-green-600 ml-2 rounded" 
                            to={`/edit_product/${product._id}`}
                        >
                            Edit
                        </Link>
                    </div>
                </>
                : <>
                    <div className="w-full mt-2 flex justify-between">
                        <Link 
                            className="w-1/2 text-center uppercase text-white font-semibold tracking-widest p-1.5 bg-gray-500 mr-2 rounded" 
                            to="#!"
                            onClick={() => addCart(product)}
                        >
                            Buy
                        </Link>
                        
                        <Link 
                            className="w-1/2 text-center uppercase text-white font-semibold tracking-widest p-1.5 bg-green-600 ml-2 rounded" 
                            to={`${ROUTES.DETAIL}/${product._id}`}
                        >
                            View
                        </Link>
                    </div>
                </>
            }
            
        </div>
    )
}

export default ProductItem
