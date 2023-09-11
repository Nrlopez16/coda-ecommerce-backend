const express = require('express');
const opRouter = express.Router();

const { requireUser } = require("./utils");

const {
    updateOrderProduct,
    destroyOrderProduct,
    getOrderProductById
} = require('../db/order_products');

const { getOrderById } = require('../db/orders');

//fix requireUser
opRouter.patch('/:orderProductId', async ( req, res, next ) => {
    try {
        const { orderProductId } = req.params;
        
        const {quantity, price} = req.body;
        const updatedOP = await updateOrderProduct({id: orderProductId, quantity, price})
       
        res.send(updatedOP);

    } catch(error) {
        next(error);
    }
});

//fix requireUser
opRouter.delete('/:orderProductId', async ( req, res, next ) => {
    try {
        const { orderProductId} = req.params;
        
        const deletedOP = await destroyOrderProduct(orderProductId)
        res.send(deletedOP);

    } catch(error) {
        next(error);
    }
});

module.exports = opRouter;