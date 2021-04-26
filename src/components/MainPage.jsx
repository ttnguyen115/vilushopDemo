import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as ROUTES from '../constants/routesConstants';
import { GlobalState } from '../GlobalState';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './notfound/NotFound';
import DetailProduct from './products/DetailProduct';
import Products from './products/Products';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';


function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userApi.isLogged;
    const [isAdmin] = state.userApi.isAdmin;

    return (
        <Switch> 
            <Route path={ROUTES.DASHBOARD} component={ Products } exact  />

            <Route path={ROUTES.LOGIN} component={isLogged ? NotFound : Login} exact />
            <Route path={ROUTES.REGISTER} component={isLogged ? NotFound : Register} exact  />

            <Route path={ROUTES.CATEGORY} component={isAdmin ? Categories : NotFound} exact  />
            <Route path={ROUTES.CREATE} component={isAdmin ? CreateProduct : NotFound} exact  />
            <Route path={`${ROUTES.EDIT}/:id`} component={isAdmin ? CreateProduct : NotFound} exact  />
            
            <Route path={ROUTES.HISTORY} component={isLogged ? OrderHistory : NotFound} exact  />
            <Route path={`${ROUTES.HISTORY}/:id`} component={isLogged ? OrderDetails : NotFound} exact  />

            <Route path={ROUTES.CART} component={Cart} exact  />

            <Route path={`${ROUTES.DETAIL}/:id`} component={DetailProduct} exact />
               
            <Route path={ROUTES.NOTFOUND} component={NotFound} exact />
        </Switch>
    )
}

export default Pages
