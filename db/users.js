const {client} = require('./index');
const bcrypt = require('bcrypt');

const SALT_COUNT = 10;

//Week 2: Users backend database Adopters -------------->
async function createUser({firstName, lastName, email, imageURL, username, password, isAdmin}) {
    const hashedPassword = await bcrypt.hash(
        password, SALT_COUNT
        );
    try{
        const {rows:[user]} = await client.query(`
        INSERT INTO users (firstName, lastName, email, imageURL, username, password, isAdmin)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,[firstName, lastName, email, imageURL, username, hashedPassword, isAdmin]);
        return user;
    }catch (error) {
        throw error;
     }
    }


    

async function getUser({username, password}) {
    try {
        const {rows:[user]} = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
        `,[username]);
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log('matching password!!');
            delete user.password;
            return user;
        }else if (!isMatch) {
            console.log('password does not match');
        }
        } catch (error) {
            throw error;
        }
}

async function getAllUsers(){
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM users
        `);
        
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
    try {
        const {rows:[user]} = await client.query(`
        SELECT *
        FROM users
        WHERE id=$1
        `, [id]);
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
        `,[username]);

        if(!rows || !rows.length){
            return null
        }
        const [user] = rows;
        return user;
    }catch (error) {
        throw error;
    }
}


module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByUsername
}
