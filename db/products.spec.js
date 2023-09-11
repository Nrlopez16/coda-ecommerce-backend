Testing:

require('dotenv').config();

const { getAllProducts } = require('../db/products');
const {client} = require('../db/index');


/* THIS IS A TEST FOR getAllProducts */

    let productsFromDatabase;
    describe('Database', () => {
        beforeAll(async() => {
            client.connect();
            //"control" test data
            const {rows} = await client.query(`
            SELECT * FROM products`)
            productsFromDatabase = rows;
        });
        afterAll(async() => {
            client.end();
        })
        //Test for 'getAllProducts' db adapter. selects and returns an array of all products
        describe('getAllProducts', () => {
            
            it('Selects & returns an array of products', async () => {
                expect(await getAllProducts()).toEqual(productsFromDatabase)
            })
        })
    })
