const {client} = require("./index")
const { getOrderById } = require('../db/orders');


/* THIS IS FOR THE updateProduct ADAPTER */

async function updateProduct({ id, name, description, price, imageurl, inStock, category }) {
    const fields = { name, description, price, imageurl, inStock, category }
    const setString = Object.keys(fields).map(
      (key, index) => `${key}=$${index + 1}`
    ).join(', ');
    if (setString.length === 0) {
      return;
    }
    try {
      const { rows: [product] } = await client.query(`
    UPDATE products
    SET ${setString}
    WHERE id=${id}
    RETURNING *
    `, Object.values(fields))
  
      return product;
  
    } catch (error) {
      throw error;
    }
  };

/* THIS IS FOR THE destroyProduct ADAPTER */

async function destroyProduct({id}) {
    try {
        const {rows: order_products} = await client.query(`
        DELETE FROM order_products
        WHERE "productId"=$1
        AND "orderId" NOT IN
        (SELECT orders.id FROM orders
        JOIN order_products ON orders.id = order_products."orderId"
        WHERE orders.status = 'complete'
        AND order_products."productId" = ${id})
        RETURNING *;
        `, [id]);
        console.log(order_products)
        const { rows: [product] } = await client.query (`
        DELETE from products
        WHERE id=$1
        RETURNING *;
        `, [id]);
        return product;
    } catch (error) {
        throw error;
    }
};

/* THIS IS FOR THE updateUser ADAPTER */
const updateUser = async ({id, ...fields})=>{
    const setString = Object.keys(fields).map(
        (key, index) => `${ key }=$${ index + 1}`
    ).join(', ');
    
    const objVal = Object.values(fields)
    if( setString.length === 0){
        return;
    }
    
    objVal.push(id);

    try {
        const {rows: [user]} = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id = $${objVal.length}
            RETURNING *;
        `, objVal);
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    updateProduct,
    destroyProduct,
    updateUser
}