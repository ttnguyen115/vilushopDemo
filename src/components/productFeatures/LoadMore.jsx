import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState';
import { Button } from '@material-ui/core';

function LoadMore() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsApi.page;
    const [result] = state.productsApi.result;

    return (
        <div className="flex justify-center mb-7">
            {
                result < page * 9 
                ? ""
                : <Button color="primary" variant="contained" size="small"
                    onClick={() => setPage(page + 1)}
                >
                    Load More
                </Button>
            }
        </div>
    )
}

export default LoadMore
