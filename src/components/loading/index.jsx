import React from 'react'
import ReactLoading from 'react-loading';

export const Loading = ({ type, color }) => (
    <ReactLoading 
        type={type} 
        color={color} 
        width={'5%'} 
        className="mx-auto my-5"
    />
);

