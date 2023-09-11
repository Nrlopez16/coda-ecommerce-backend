import React, { useState, useEffect } from 'react';

import {useParams} from 'react-router-dom'
import {getOrderById} from '../api'


const Order = (props) => {
    const {orderId} = useParams();
    const [order, setOrder] = useState([]);

    const fetchOrder = async () => {
        try{
            const singleOrder = await getOrderById(orderId)
            setOrder(singleOrder)
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOrder()
    },[]);

    return <div >
        <h1>Single Order</h1>
        {order? 
            <p>This page is under construction!</p>  
            : <p>order.id, order.status, order.datePlaced</p>
        }
    </div>
}

export default Order;