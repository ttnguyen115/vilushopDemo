import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routesConstants';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1, 0),
        },
    },
}));

function Login() {
    const classes = useStyles();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({ ...user, [name]: value});
    };
    
    const loginSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await axios.post('/user/login', {...user});

            localStorage.setItem('firstLogin', true);

            window.location.href = '/';
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <div className="border max-w-lg rounded p-8 my-12 mx-auto border-blue-400">
            <form action="" onSubmit={loginSubmit} className={classes.root}>
                <h2 className="uppercase tracking-widest text-gray-600 text-3xl">Login</h2>
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
                    className="w-full h-10 my-2.5 mx-0 py-0 px-1.5 border rounded"
                />

                <div className="flex justify-between items-center">
                    <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                    >
                        Login
                    </Button>

                    <Link 
                        to={ROUTES.REGISTER}
                        className="uppercase text-yellow-600 tracking-widest"
                    >
                        Register
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login
