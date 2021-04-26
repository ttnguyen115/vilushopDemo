import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';

const useStyles = makeStyles(theme => ({
    btn: {
        marginLeft: theme.spacing(2),
    },

    createBtn: {
        padding: '16px',
        marginLeft: theme.spacing(2),
    }
}))

function Categories() {
    const classes = useStyles();
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [categories] = state.categoriesApi.categories;
    const [category, setCategory] = useState('');
    const [callback, setCallback] = state.categoriesApi.callback;
    const [onEdit, setOnEdit] = useState(false);
    const [id, setId] = useState(false);

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        
        try {
            if (onEdit) {
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
    
                alert(res.data.msg);
            } else {
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
    
                alert(res.data.msg);
            }
            
            setCategory(''); 
            setOnEdit(false);
            setCallback(!callback); 
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const handleEdit = async (id, name) => {
        setId(id);
        setCategory(name);
        setOnEdit(true);
    }
    
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="max-w-2xl flex flex-wrap justify-around my-7 mx-auto">
            <form onSubmit={handleCreateCategory}>
                <input 
                    type="text" name="category" value={category} required
                    onChange={e => setCategory(e.target.value)}
                    className="p-4 border border-gray-600 rounded"
                />
                
                <Button variant="contained" color="primary" className={classes.createBtn} type="submit">
                    {onEdit ? 'Save' : 'Create'}
                </Button>
            </form>

            <div className="">
                {
                    categories.map(category => (
                        <div key={category._id} className="flex min-w-max justify-between items-center my-2 p-3 border border-gray-500">
                            <p>{category.name}</p>
                            <div className="">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small" 
                                    className={classes.btn}
                                    onClick={() => handleEdit(category._id, category.name)}
                                >
                                    Edit
                                </Button>

                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="small" 
                                    className={classes.btn}
                                    onClick={() => handleDelete(category._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
