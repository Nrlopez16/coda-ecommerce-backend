const {client} = require("./index")
const { getReviewsByProductId } = require('./reviews')

async function getAllProducts() {
    try{
        const { rows } = await client.query(`
            SELECT *
            FROM products
        `)

        return rows;
    } catch (error) {
        throw error;
    }
}

async function getProductById(id) {
    try{
        const { rows: [product] } = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1
        `, [id]);
        product.reviews = await getReviewsByProductId(product.id)
        product.reviews.forEach(review => {
            delete review.productId
        })

        return product;
    } catch (error) {
        throw error;
    }
}

async function getProductsByCategory(category) {
    try{
        const { rows } = await client.query(`
            SELECT *
            FROM products
            WHERE category=$1
        `, [category]);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function createProduct(product) {
    const {name, description, price, inStock, imageURL, category} = product;
    try{
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, price, inStock, imageURL, category)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [name, description, price, inStock, imageURL, category]);

        return product;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory
}