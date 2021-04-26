import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { GlobalState } from '../../GlobalState';
import { Loading } from '../loading';
import './style.css';
import Button from '@material-ui/core/Button';

const init = {
    product_id: '',
    title: '',
    price: 0,
    description: 'This product description need to be filled!',
    content: 'This product content need to be filled!',
    category: '',
    _id: ''
};

function CreateProduct() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesApi.categories;
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(init);

    const [isAdmin] = state.userApi.isAdmin;
    const [token] = state.token;

    const history = useHistory();
    const param = useParams();

    const [products] = state.productsApi.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productsApi.callback;

    useEffect(() => {
        if(param.id) {
            setOnEdit(true);

            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            });
        } else {
            setOnEdit(false);
            setProduct(init);
            setImages(false);
        }
    }, [param.id, products]);

    const handleUpload = async e =>{
        e.preventDefault();

        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin");

            setLoading(true);
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            });
            setLoading(false);
            setImages(false);
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You're not an admin")
            if (!images) return alert("No Image Upload")

            if (onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            } else {
                await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="w-full flex flex-wrap justify-around items-center">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading
                    ? <div id="file_img"><Loading type="spinningBubbles" color="#000" /></div>
                    : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" className="w-full h-full block object-cover" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }
                
            </div>

            <form className="w-full my-4 mx-8 max-w-lg min-w-min" onSubmit={handleSubmit}>
                <div className="w-full my-2 mx-0">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" required
                        value={product.product_id} 
                        className="w-full min-h-full px-1.5 py-0 border border-gray-500 rounded"
                        onChange={handleChangeInput}
                        disabled={onEdit}
                    />
                </div>

                <div className="w-full my-2 mx-0">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" required
                        value={product.title} 
                        className="w-full min-h-full px-1.5 py-0 border border-gray-500 rounded"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="w-full my-2 mx-0">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" required
                        value={product.price}
                        className="w-full min-h-full px-1.5 py-0 border border-gray-500 rounded"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="w-full my-2 mx-0">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" required
                        value={product.description} rows="5"
                        className="w-full min-h-full px-1.5 py-0 border border-gray-500 rounded"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="w-full my-2 mx-0">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" required
                        value={product.content} rows="7"
                        className="w-full min-h-full px-1.5 py-0 border border-gray-500 rounded"
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="w-full my-2 mx-0">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category}
                        className="w-full min-h-full px-1.5 py-0 border border-gray-500 rounded"
                        onChange={handleChangeInput}
                    >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <Button type="submit" variant="contained" color="primary" size="large">
                    {onEdit ? 'Save' : 'Create'}
                </Button>
            </form>
        </div>
    )
}

export default CreateProduct
