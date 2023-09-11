import Axios from 'axios';
import React from 'react';
import {StripeProvider, Elements, CardElement} from 'react-stripe-elements';
import {StripeCheckout, ReactStripeCheckout} from 'react-stripe-checkout'; 
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe();

const stripePublicKey = process.env.stripe_Publishable



   class Checkout extends React.Component{  

        render() {
            return (
                <StripeCheckout
                    token={this.onToken}    
                    key= 'pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX'
                    stripeKey='pk_test_51Husm9IEsmL7CmEu27mWMP2XxUgTeWW1rZzlVw4XykcEoHUFGkc66iYkdadeL2j2zebv9n8w5hVqptTivC9DeTng00tZSDJ0VX'
                    email='info@codalorians.co'
                    panelLabel="Place Order"
                    amount="10000"
                    currency='USD'
                    billingAddress={false}
                    shippingAddress
                    zipCode={false}
                    locale='auto'
                    allowRememberMe={true}
                    opened={this.onOpened}
                    closed={this.onClosed}
                    triggerEvent = 'onTouchTap'
                    label="Pay with 💳"
                >
                    </StripeCheckout>
                
            )
            
        }
}

export default Checkout;

