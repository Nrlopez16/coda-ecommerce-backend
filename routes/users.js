const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
//remember to remove testing secret at submission
const {JWT_SECRET} = process.env || 'notSoSecret';
const bcrypt = require('bcrypt');

const {
    getUserByUsername, 
    getUserById,
    createUser,
    getAllUsers
} = require('../db/users');

const {
    updateUser
} = require('../db/admin');

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
    next();
});


usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.send(users)
});



//==== REQUIRE USER 
function requireUser(req, res, next) {
    if(!req.user) {
        next ({
            name: "Missing user error",
            message: "You must be logged in to perform this action"
        })
    }
    next();
}



//====Users -- POST/REGISTER API route
usersRouter.post('/register', async (req, res, next) => {

    const {firstName, lastName, email, username, password, isAdmin, imageURL} = req.body;

    try{
        const _user = await getUserByUsername(username);
        if (_user) {
            res.send({message: 'Sorry, looks like something went wrong. Please correct the following and submit again: - User Already Exists'});
        } else if (password.length < 8) {
            res.send({message: 'Sorry, looks like something went wrong. Please correct the following and submit again: - Your Password Must Be At Least 8 Characters In Length!'})
        } else {
            const user = await createUser({
                firstName, 
                lastName, 
                email, 
                username, 
                password, 
                isAdmin, 
                imageURL
            })
            let token = jwt.sign(user, JWT_SECRET);
    
            res.send({user, token})
        }
    } catch (error) {
        next (error);
    }
});


//====Users -- POST/USER LOGIN  API route
usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    
    try {
        const user = await getUserByUsername(username);

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch === true) {

            let token = jwt.sign(user, JWT_SECRET);

            res.send({ message: "You Have Successfully Logged In!", token});
         
            return user;

        } else if (isMatch === false) {
            res.send({message: "Username or Password Does Not Match"})

        } 

    } catch (error) {
        next (error);
        res.send({message: "Please Enter A Valid Username & Password "})
        
    }
})

//====Users -- GET/users/me (*) API route
usersRouter.get('/me', requireUser,  async(req, res, next) => {
    try {
        res.send(req.user)
    }catch (error) {
        next (error);
    }
})

usersRouter.get('/:userId', async (req, res, next ) => {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        res.send(user)

    } catch (error) {
        next(error)
    }
} )

usersRouter.get('/:userId/orders', requireUser, async (req, res, next ) => {
    const { userId } = req.params;
    try {
        const orders = await getOrdersByUser(req.user.id);
        console.log("user order", orders)
        res.send(orders)
        

    } catch (error) {
        next(error)
    }
} )


/* ------------------------------------------------------------ */
/* THIS IS THE PATCH /users/:userId (*admin) Only admins can update a user */

usersRouter.patch('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const { firstName, lastName, email, imageurl, username, password, isAdmin } = req.body
      try {     
          const updatedUser = await updateUser({id: userId, firstName, lastName, email, imageurl, username, password, isAdmin});
          res.send(updatedUser);
      } catch (error) {
        next(error);
    }
  });

module.exports = usersRouter;


