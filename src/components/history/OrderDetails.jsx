import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GlobalState } from '../../GlobalState';

function OrderDetails() {
    const state = useContext(GlobalState);
    const [history] = state.userApi.history;
    const [orderDetails, setOrderDetails] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item);
            })
        }
    }, [params.id, history]);

    console.log(orderDetails);
    if (orderDetails.length === 0) return null;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className="min-w-max" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Postal Code</TableCell>
                            <TableCell align="center">Country Code</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{orderDetails.address.recipient_name}</TableCell>
                            <TableCell component="th" scope="row" align="center">{orderDetails.address.line1 + " - " + orderDetails.address.city}</TableCell>
                            <TableCell align="center">{orderDetails.address.postal_code}</TableCell>
                            <TableCell align="center">{orderDetails.address.country_code}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper} className="mt-10">
                <Table className="min-w-max" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Products</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orderDetails.cart.map(item => (
                            <TableRow key={item._id}>
                                <TableCell component="th" scope="row" align="center"><img src={item.images.url} alt=""/></TableCell>
                                <TableCell align="center">{item.title}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="center">$ {item.quantity * item.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default OrderDetails
