if (process.env.NODE_ENV !== 'production'){
    require('dotenv').load()
}
const Stripe = require('stripe')
const stripe = Stripe(process.env.stripe_SECRET)
console.log(stripePublicKey)

const express = require('express');
const cors = require('cors');
const { pixelsToPercent } = require('framer-motion/types/render/dom/layout/scale-correction');


app.use(express.json());
app.use(cors());


app.post("/checkout", async(req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;

    try{
        const {token, stripe} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotencyKey = uuid();
        const charge = await strip.charges.create({
            amount: {total}*100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            },
            idempotencyKey:"y9J3UsKw9zLvhyRK"
        });
        
        const session = await stripe.checkout.sessions.create({
            success_url: 'https://fathomless-retreat-94739.herokuapp.com/thank-you',
            cancel_url: 'https://fathomless-retreat-94739.herokuapp.com/error',
            payment_method_types: ['card'],
            mode: 'payment',
        })
        {
        // console.log("Charge: ", {charge});
        // // success_url: 'https://fathomless-retreat-94739.herokuapp.com/thank_you',
        // // cancel_url: 'https://fathomless-retreat-94739.herokuapp.com/error',
        // status = "success";
        // // res.json(storeCurrentCart([]))
    }} catch (error) {
        // console.error("Error", error);
        // status = "error";
        res.status(500).end()
    }
    res.json({error, status});
})



app.listen(5000)
