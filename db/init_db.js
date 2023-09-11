// code to build and initialize DB goes here
const {client} = require('./index');

const {createProduct, getAllProducts} = require('./products')
const {createUser} = require('./users')
const {createOrder, getAllOrders} = require('./orders');

const {addProductToOrder} = require('./order_products');
const { makeReview } = require('./reviews');

async function dropTables() {
  console.log('Dropping All Tables...');

//drop tables in correct order
  try {
    await client.query(`
    DROP TABLE IF EXISTS reviews
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    `)
    console.log('finished doing stuff')
  } catch(error) {
    console.log('Error Dropping Tables');
  }
}

async function createTables() {

  try {
    
    console.log("Starting to build tables...")
    
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        imageURL VARCHAR(255) DEFAULT 'https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg',
        inStock BOOLEAN DEFAULT false,
        category VARCHAR(255) NOT NULL
      );
     CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR (255) NOT NULL,
          email VARCHAR (255) UNIQUE NOT NULL,
          imageURL VARCHAR(255) DEFAULT NULL,
          username VARCHAR (255) UNIQUE NOT NULL,
          password VARCHAR (255) UNIQUE NOT NULL,
          isAdmin BOOLEAN DEFAULT false
        );
      CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      status VARCHAR(255) DEFAULT 'created',
      "userId" INTEGER REFERENCES users(id),
      "datePlaced" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );  
    CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT (0)
      );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content VARCHAR(255) DEFAULT NULL,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id)
    );
    `);


    console.log("Finished building tables!")
  } catch (error) {
    console.log('error here ', error)
  }
}

async function populateInitialUsers() {
  try {
    const seedUsers = [
      {firstName:'cecilia', lastName:'lam', email:'cecilia@example.com', username:'cecilia', password:'cecilia123', isAdmin: false},
      {firstName:'katiana', lastName:'CV', email:'kati-cv@example.com', username:'kati', password:'katicv123', isAdmin: true},
      {firstName:'trin', lastName:'padilla', email:'trinp@example.com', username:'trin', password:'padilla123', isAdmin: true},
      {firstName:'nicholas', lastName:'lopez', email:'nicholas@example.com', username:'nicholas', password:'nicholas123', isAdmin: true},
    ]
    const users = await Promise.all(seedUsers.map(createUser));
    console.log('users created');
    console.log(users);
  }catch(error) {
    console.error('Error populating users!!')
    throw error;
  }
}


async function populateInitialData() {
  console.log('Starting to create products...');
  try {
    // creating default dummy data for products
    const productsToCreate = [
      { name: 'Epiphone Les Paul 1960 Tribute Plus Faded Cherry Sunburst 2015', description: 'A high-end Epiphone', price: 600, imageURL:'https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_70cf2e04-f127-4efe-ae88-dd80f7197c8e_2000x.jpg?v=1606160021', inStock: true , category: 'guitar'},
      { name: 'Meris: Enzo', description: 'From Meris: Enzo is a multi-voice synthesizer that will track your guitar for tight monosynth leads, complex chord polyphony, or multi-note sequenced arpeggiation... ', price: 299, imageURL: 'https://cdn.shopify.com/s/files/1/0343/4368/2183/products/cqtjcph3bwukjcxzpdwd_2000x.jpg?v=1594474704', inStock: true , category: 'effectpedal'},
      { name: 'Gibson Custom 1959 Les Paul Standard', description: 'A solid body electric guitar', price: 500, imageURL:'https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_99e44014-9c43-49ef-bc71-529e81e3c57f_2000x.jpg?v=1602034195', inStock: true , category: 'guitar'},
      { name: 'Fender American Professional II', description: '3-Tone Sunburst', price: 2200, imageURL:'https://cdn.shopify.com/s/files/1/0343/4368/2183/products/01139807001_2000x.jpg?v=1605308707', inStock: true , category: 'guitar'},
      { name: 'Fender American Professional II', description: 'Jazz Bass roasted pine', price: 2200, imageURL:'https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_c05bfb67-036e-4feb-87cf-65055b6457f0_2000x.jpg?v=1602203506', inStock: true , category: 'guitar'},
      { name: 'Fender American Professional II', description: '3-Tone Sunburst', price: 2200, imageURL:'https://cdn.shopify.com/s/files/1/0343/4368/2183/products/01139807001_2000x.jpg?v=1605308707',inStock: true , category: 'guitar'},
      { name: 'Marshall Reverse Jubilee 20W Head', description: '20W 2525H has two footswitchable channels', price: 1500, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_16df905f-1f5d-48d0-b47b-df9c90c625a2_2000x.jpg?v=1598553363", inStock: true , category: 'amplifier'},
      { name: 'Tone King Imperial MKII 20W 1x12 Combo Lacquered Tweed', description: 'all tube circuitry, traditional spring reverb and a highly resonant cabinet', price: 3500, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/fhpjoppbzucmtjslespp_2000x.jpg?v=1594409821", inStock: true , category: 'amplifier'},
      { name: 'Meris Hedra 3-Voice Rhythmic Pitch Shifter', description: 'Hedra is a 3-voice rhythmic pitch shifter capable of adding 3 harmony voices to your instrument. ', price: 299, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/gc0kojdw4cpyaor6f5oa_2000x.jpg?v=1594792891", inStock: true , category: 'effectpedal'},
      { name: 'Sonor AQ2 Safari 10/13/16/6x13 4pc. Drum Kit Titanium Quartz', description: 'With the AQ2 Series drums you can sound like the pros.', price: 699, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_70304f5a-b380-4b47-bb6d-93801376139b_2000x.jpg?v=1607448394", inStock: true , category: 'drums'},
      { name: 'Strymon BigSky Reverberator Pedal', description: 'The world below you fades into the distance, and you are elevated into a glow of lush, glorious, radiant reverbs.', price: 479, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_20e3a3fc-ada6-4860-bdd0-575c3a4b1ed5_2000x.jpg?v=1601422828", inStock: true , category: 'effectpedal'},
      { name: 'Strymon El Capistan Tape Echo Pedal', description: 'El Capistan provides three different tape machine types in one, each with three unique modes.', price: 299, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_0faae02f-f5a9-4296-b80a-3a2303e79ca5_2000x.jpg?v=1598547201", inStock: true , category: 'effectpedal'},
      { name: 'Strymon Compadre Dual Voice Compressor & Boost', description: 'Mix in some dry signal for natural attack even with extreme compression settings.', price: 299, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_5fbae37c-17d8-49c9-8170-b7a073cfd0cb_2000x.jpg?v=1601434170", inStock: true , category: 'effectpedal'},
      { name: 'Hendrix 6.5x14 Perfect Ply Snare Drum Walnut Gloss', description: 'It has a warm rounded deep tone with the coveted punchy low end that so many drummers are looking for.', price: 450, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_9e4302e2-bb3c-4399-835d-3866a16eb144_2000x.jpg?v=1606850654", inStock: true , category: 'drums'},
      { name: 'Roland FP-10 88-Key Digital Piano', description: 'FP-10 is the ideal instrument for home use, whether you’re practicing techniques in the spare room or giving performances in the living room. ', price: 589.99, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/hhszsqypcle9pgxrixuw_2000x.jpg?v=1594789241", inStock: true , category: 'piano'},
      { name: 'Roland GO-61P-A 61-Key Digital Piano', description: 'With natural sound derived from Roland’s premium digital pianos, you’ll want to keep using this piano even after you step up to a full-size instrument.', price: 499.99, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/qyhafeh8rwrusn1bljt9_2000x.jpg?v=1594801368", inStock: true , category: 'piano'},
      { name: 'Fender Player Jazz Bass Buttercream B-STOCK', description: 'Features an alder body with gloss finish, two Player Series single-coil pickups and standard control set.', price: 635.00, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_fc788fdf-77da-415f-b540-5aed9f6a8f4e_2000x.jpg?v=1607455792", inStock: true , category: 'bass'},
      { name: 'Warm Audio WA-251 Large Diaphragm Tube Condenser Microphone', description: 'The WA-251 is an all vacuum tube, large diaphragm, transformer balanced, multi-pattern, large condenser microphone, based on the classic ‘251', price: 799.00, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_bdc500d8-3902-4eaa-991e-ae05910e9fd4_2000x.jpg?v=1600872526", inStock: true , category: 'microphone'},
      { name: 'Shure MV7-S Podcast Microphone Silver', description: 'Inspired by the legendary SM7B, the MV7 is a dynamic microphone with both USB and XLR outputs', price: 249.00, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/media_35fd2630-4a74-4c26-8ab4-3d680419136b_2000x.jpg?v=1603831783", inStock: true , category: 'microphone'},
      { name: 'Shure SM58 Stage Performance Kit', description: 'The Stage Performance Kit combines the world’s most legendary microphone with an XLR cable and robust mic stand to give you all you need for performing live.', price: 129.00, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/myj51ldhkvcthelgsajw_afe105ac-d089-4d70-80b8-d1c5c7c0d993_2000x.jpg?v=1594797061", inStock: true , category: 'microphone'},
      { name: 'Shure SM58S', description: 'The legendary Shure SM58® vocal microphone is designed for professional vocal use in live performance, sound reinforcement, and studio recording.', price: 100.00, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/adw62i7sm8l0hrgvn9nv_2000x.jpg?v=1594774555", inStock: true , category: 'microphone'},
      { name: 'Audix SCX1 Studio Condenser Mic', description: 'Known for its high sensitivity, pin-point accuracy, low profile and consistency', price: 499.00, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/n2ogdcpbdcjsecdoojjc_2000x.jpg?v=1594774393", inStock: true , category: 'microphone'},
      { name: 'Shure Beta 52A Dynamic Kick Drum Microphone', description: 'The Shure BETA®52A is a high output dynamic microphone with a tailored frequency response designed specifically for kick drums', price: 189.00, imageURL: "https://cdn.shopify.com/s/files/1/0343/4368/2183/products/t3ytq6mxbhmswlkfsy39_440359d1-82dc-4048-ad21-364931f801bf_2000x.jpg?v=1594774527", inStock: true , category: 'microphone'},

    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products Created');
    console.log(products);
  } catch (error) {
    console.error('Error creating products!!!')
    throw error;
  }
}

async function populateInitialOrders() {
  console.log("creating orders...")
  try {
    const seedOrders = [
      {status:'created', userId:'1', datePlaced:'2020-06-22 18:10:25-07'},
      {status:'cancelled', userId:'2', datePlaced:'2011-06-22 10:10:25-07'},
      {status:'created', userId:'3', datePlaced:'2019-06-22 11:10:25-07'}
    ]
    const orders = await Promise.all(seedOrders.map(createOrder));
    console.log('orders created');
    console.log(orders);
  }catch(error) {
    console.error('Error populating orders!!')
    throw error;
  }
}

async function populateInitialOrderProducts() {
  try {
    console.log('starting to create order products...');
    const [order1, order2, order3] = await getAllOrders();
    const [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8] = await getAllProducts();

    const orderProductsToCreate = [
      {
        productId: prod1.id,
        orderId: order1.id,
        price: prod1.price,
        quantity: 2
      },
      {
        productId: prod2.id,
        orderId: order1.id,
        price: prod2.price,
        quantity: 5 
      },
      {
        productId: prod3.id,
        orderId: order1.id,
        price: prod3.price,
        quantity: 1 
      },
      {
        productId: prod1.id,
        orderId: order2.id,
        price: prod1.price,
        quantity: 7 
      },
      {
        productId: prod5.id,
        orderId: order2.id,
        price: prod5.price,
        quantity: 2 
      }
    ]
    const orderProducts = await Promise.all(orderProductsToCreate.map(addProductToOrder));
    console.log('order_products created: ', orderProducts)
    console.log('Finished creating order_products!')
  } catch (error) {
    throw error;
  }
}

async function populateInitialReviews() {
  console.log('Starting to create initial reviews...')
  try {
    const seedReviews = [{productId: "1", title:"Too Cool!", content:"This worked perfectly for my home setup", userId:"1"}]
    const reviews = await Promise.all(seedReviews.map(makeReview));
   console.log(reviews);
    console.log("Finished making reviews...")
  } catch (error) {
    console.error('Error making reviews...')
    throw error;
  }

}

async function buildTables(){
  try{
client.connect()
await dropTables()
await createTables()
  }catch(error){
    throw error
  }
}

buildTables()
  //.then(buildTables)
  .then(populateInitialUsers)
  .then(populateInitialData)
  .then(populateInitialOrders)
  .then(populateInitialOrderProducts)
  .then(populateInitialReviews)
  .catch(console.error)
  .finally(() => client.end());
