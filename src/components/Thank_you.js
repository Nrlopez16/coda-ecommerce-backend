import React from 'react';

const ThankYou = (props) => {
    console.log('Thankyou', ThankYou)
    const {order} = props;

    return (
        <html>
            <head>
                <title>
                    Thank you for your order!
                </title>
            </head>
            <body>
                <section>
                    <div id = "thankyou">
                    <p>
                        Your order number is {order && order.id}
                        If you have any questions, please email
                        <a href="mailto:orders@codalorians.com">orders@codalorians.com</a>.
                    </p>
                    </div>
                </section>
            </body>
        </html>
        )
}

export default ThankYou;