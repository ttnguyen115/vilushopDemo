import React, { useContext, useEffect } from 'react'
import { GlobalState } from '../../GlobalState';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as ROUTES from '../../constants/routesConstants';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';


function OrderHistory() {
    const state = useContext(GlobalState);
    const [history, setHistory] = state.userApi.history;
    const [isAdmin] = state.userApi.isAdmin;
    const [token] = state.token;

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data);
                } else {
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    });
                    setHistory(res.data);
                }
            }

            getHistory();
        }
    }, [token, isAdmin, setHistory]);


    return (
        <div className="overflow-x-auto">
            <h2 className="text-4xl text-center font-bold mt-2">History</h2>

            <h4 className="text-center text-xl my-3 tracking-widest">You have {history.length} ordered</h4>

            <TableContainer component={Paper}>
                <Table className="min-w-max" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Payment ID</TableCell>
                            <TableCell align="center">Date Of Purchased</TableCell>
                            <TableCell align="center">Detail</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {history.map(item => (
                            <TableRow key={item._id}>
                                <TableCell component="th" scope="row">
                                    {item.paymentID}
                                </TableCell>
                                <TableCell align="center">{new Date(item.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                                <TableCell align="center">
                                    <Link to={`${ROUTES.HISTORY}/${item._id}`}>
                                        <Button variant="contained" color="primary">
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default OrderHistory
