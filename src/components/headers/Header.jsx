import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routesConstants';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userApi.isLogged;
    const [isAdmin] = state.userApi.isAdmin;
    const [cart] = state.userApi.cart;
    const [menu, setMenu] = useState(false);

    const handleLogout = async () => {
        await axios.get('/user/logout');

        localStorage.removeItem('firstLogin');

        window.location.href="/";
    };

    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product" className="px-5 opacity-70 text-xl hover:opacity-100">Create Product</Link></li>
                <li><Link to="/category" className="px-5 opacity-70 text-xl hover:opacity-100">Categories</Link></li>
            </>
        );
    };
    
    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history" className="px-5 opacity-70 text-xl hover:opacity-100">History</Link></li>
                <li><Link 
                    to="/" 
                    className="px-5 opacity-70 text-xl hover:opacity-100" 
                    onClick={handleLogout}>
                        Logout
                </Link></li>
            </>
        );
    };

    const handleMenuResponsive = {
        left: menu ? 0 : "-100%"
    }
 
    return (
        <header className="min-h-70px w-full overflow-hidden flex flex-wrap justify-around items-center border-b-2">
            <div className="hidden menu" onClick={() => setMenu(!menu)}>
                <MenuIcon />
            </div>
            {/* <ShoppingCartIcon /> */}

            <div className="flex-1 logo">
                <h1>
                    <Link to={ROUTES.DASHBOARD} className="uppercase from-gray-100 px-5 text-4xl">
                        {isAdmin ? 'Admin' : 'viluShop' }
                    </Link>
                </h1>
            </div>

            <ul className="flex flex-evenly px-5" style={handleMenuResponsive}>
                <li className="px-5 opacity-70 text-xl hover:opacity-100"><Link to={ROUTES.DASHBOARD}>
                    {isAdmin ? 'Products' : 'Shop'}
                </Link></li>

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li className="px-5 opacity-70 text-xl hover:opacity-100"><Link to={ROUTES.LOGIN}>Login / Register</Link></li>
                }

                <li className="hidden menu" onClick={() => setMenu(!menu)}>
                    <CloseIcon />
                </li>
            </ul>

            {
                isAdmin 
                ? ''
                :   <div className="relative mr-5">
                        <span className="bg-red-600 text-white absolute rounded-full py-0.2 px-1 text-xs -top--5px -right-0.5">
                            {cart.length}
                        </span>
                        <Link to={ROUTES.CART}>
                            <ShoppingCartIcon fontSize="large" />
                        </Link>
                    </div>
            }
        </header>
    )
}

export default Header
