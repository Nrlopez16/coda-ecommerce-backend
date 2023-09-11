const express = require('express');
const productsRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
} = require('../db/products');

const {
    getOrderByProduct
} = require('../db/orders');

const {
    getUserById
} = require('../db/users');

const {
    destroyProduct,
    updateProduct
} = require('../db/admin');

/* ------------------------------------------------------------ */
/* THIS IS THE GET/products ROUTER */

    productsRouter.get('/', async (req, res, next ) => {
        try {
            const products = await getAllProducts();
            res.send(products);
            return products;

        } catch (error) {
            next(error)
        }
    } )


/* ------------------------------------------------------------ */
/* THIS IS THE GET/product/:productId ROUTER */

    /* looks up product by id and sends back */
    productsRouter.get('/:productId', async ( req, res, next ) => {
        const { productId } = req.params;
        try {
            const productById = await getProductById(productId);
            res.send(productById);

        } catch(error) {
            next(error);
        }
    });


/* ------------------------------------------------------------ */
/* THIS IS THE GET/product/:category ROUTER */

    /* looks up product by category and sends back */
    productsRouter.get('/category/:category', async ( req, res, next ) => {
        const { category } = req.params;
        try {
            console.log('this is the params ', category)
            const productByCategory = await getProductsByCategory(category);
            res.send(productByCategory);
            

        } catch(error) {
            next(error);
           
        }
    });

/* ------------------------------------------------------------ */
/* THIS IS THE GET /products/:productId/orders (*admin) Get a list of all orders which have that product in them */

    productsRouter.get('/:productId/orders', async (req, res, next) => {
        const { productId } = req.params;
        try {
            const theOrders = await getOrderByProduct({id: productId});
            res.send(theOrders);
        } catch (error) {
            next(error);
        }
    });

/* ------------------------------------------------------------ */
/* THIS IS THE DELETE/products/:productId ROUTER for admins only */

productsRouter.delete('/:productId', async (req, res, next) => {
    const {productId} = req.params;
    const id = Number(productId);
    try {
        
        const product = await destroyProduct({id});
        res.send({ message: "You Have Deleted the Product From listing"});
        res.send(product);
        
    } catch (error) {
        next(error);
    }
})
/* ------------------------------------------------------------ */
/* THIS IS THE PATCH /products/:productId (*admin) Only admins can update a product */

productsRouter.patch('/:productId', async (req, res, next) => {
    const { productId } = req.params;
  
    try {     
            const updatedProduct = await updateProduct({id: productId, ...req.body});
            res.send(updatedProduct);    
            
    } catch (error) {
        next(error);
    }
  });

/* ------------------------------------------------------------ */
/* THIS IS THE POST /products (*admin) Only admins can create a new product */

  productsRouter.post('/', async (req, res, next) => {
    try {     
            const creatingProduct = await createProduct({...req.body});
            res.send(creatingProduct); 
    } catch (error) {
        next(error);
    }
  });



module.exports = productsRouter;
