import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import {Link} from 'react-router-dom';

import {getAllOrders} from '../api'

import {getCurrentUser, getCurrentToken} from '../auth'


const OrderBoard = (props) => {
    const {user} = props
    const [orderRender, setOrderRender] = useState([])
    const [selectedOrder, setSelectedOrder] = useState('')
    

    async function fetchUsers(){
      try{
    const data = await getAllOrders()
    console.log('data array ', data)
    setOrderRender(data)
      }catch(error){
        console.log(error)
      }
    }

    
    useEffect(() => {
        fetchUsers()
      },[selectedOrder]);
      console.log('set render ', orderRender)

    return <div>
        {orderRender.map(order => {
           return <div key={order.id} style={{border: '1px solid black', padding: '1rem',
        margin: '1rem', marginLeft: '3rem', marginRight: '3rem', textAlign: 'center', backgroundColor: '#F0FFFF',
        boxShadow: '0 5px 5px -5px'}} onClick={() => {console.log('selected user with id, ',order.id)}}>
            Order # {order.id}
        <div>Made by User With ID {order.userId}</div>
        <div>Placed at {order.datePlaced}</div>
        <div>Status: {order.status}</div>
            </div>
        })}
    </div>
}

export default OrderBoard;