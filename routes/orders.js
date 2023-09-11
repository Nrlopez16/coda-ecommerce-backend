const express = require('express');
const ordersRouter = express.Router();

const { requireAdmin, requireUser } = require("./utils");
const {JWT_SECRET} = process.env
const jwt = require('jsonwebtoken');

const {
    getAllOrders,
    getCartByUser,
    createOrder,
    cancelOrder
} = require('../db/orders');
const { addProductToOrder } = require('../db/order_products');
const { getUserById } = require('../db/users');




ordersRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
  
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
    
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
        });
    }
  
  });
  
  ordersRouter.use((req, res, next) => {
    if(req.user) {
        console.log("User is set:", req.user)
    }
    next();
  })


//fix requireAdmin
    ordersRouter.get('/', async (req, res, next ) => {
        try {
            const orders = await getAllOrders();
            res.send(orders);

        } catch (error) {
            next(error)
        }
    } )


    ordersRouter.get('/cart', async ( req, res, next ) => {
        try {
            if(req.user){
                const cart = await getCartByUser(req.user.id);
                res.send(cart);

            } else {
                const cart = await getCartByUser(3); //id:3 empty cart in db, //get relevant order by id
                res.send(cart); 
            }

        } catch(error) {
            next(error);
        }
    });

    //fix requireUser
    ordersRouter.post('/', async (req, res, next ) => {
        const { status, userId, datePlaced } = req.body;
        try {
            const newOrder = await createOrder({status, userId, datePlaced});
            res.send(newOrder);

        } catch (error) {
            next(error)
        }
    } )

    //fix requireUser
    ordersRouter.post('/:orderId/products', async (req, res, next ) => {
        const { orderId } = req.params
        const { productId, price, quantity } = req.body;
        try {
            const newOrderProduct = await addProductToOrder({orderId, productId, price, quantity});
            res.send(newOrderProduct);

        } catch (error) {
            next(error)
        }
    } )


//=====PATCH /orders/:orderId (**):Update an order, notably change status
    ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
        const {getOrderById} = req.params;
        const {id, status} = req.body;

        try{
            
            const order = await getOrderById(id);
            if(order && order.user.id !== req.user.id){
                res.send({
                    name: "UnauthorizedUserError",
                    message: "You are not allowed to update the status of the order until you signed in."
                })
            }else {
                const updatedStatus = await updateOrder(status)
                    res.send(updatedStatus)
            }
        } catch({name, message}){
            next({
                name:"updatedOrderMessage",
                message:"Great News! Your order status has been updated!"
            })}
        })


//=====DELETE /orders/:orderId (**):Update the order's status to cancelled
    ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
        const {getOrderById} = req.params;
        const {id, status} = req.body;

        try{
            const order = await getOrderById(id);
            
            if(order && order.user.id !== req.user.id){
                req.send({
                    name: "UnauthorizedUserError",
                    message: "You are not allowed to update the status of the order until you signed in."
                })
            } else {
                const deletedOrder = await cancelOrder(status)
                res.send(deletedOrder)
            }
        } catch (error){
            next (error)
        }
    })


module.exports = ordersRouter;
