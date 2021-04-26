import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routesConstants';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1, 0),
        },
    },
}));

function Register() {
    const classes = useStyles();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({ ...user, [name]: value});
    };
    
    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/register', {...user});
            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="border max-w-lg rounded p-8 my-12 mx-auto border-blue-400">
            <form action="" onSubmit={registerSubmit} className={classes.root}>
            <h2 className="uppercase tracking-widest text-gray-600 text-3xl">Register</h2>
                <TextField 
                    label="Name" 
                    variant="outlined"
                    type="name"
                    name="name"
                    required
                    placeholder="Name"
                    value={user.name}
                    onChange={onChangeInput}
                    className="w-full h-10 my-4 mx-0 py-0 px-1.5 border rounded"
                />

                <TextField 
                    label="Email" 
                    variant="outlined"
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={user.email}
                    onChange={onChangeInput}
                    className="w-full h-10 my-4 mx-0 py-0 px-1.5 border rounded"
                />

                <TextField 
                    label="Password" 
                    variant="outlined"
                    autoComplete="on"
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                    value={user.password}
                    onChange={onChangeInput}
                    className="w-full h-10 my-4 mx-0 py-0 px-1.5 border rounded"
                />

                <div className="flex justify-between items-center">
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                    >
                        Register
                    </Button>

                    <Link to={ROUTES.LOGIN} className="uppercase text-yellow-600 tracking-widest">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;
