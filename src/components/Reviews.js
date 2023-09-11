import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import './Reviews.css';
import {
    useHistory,
    useParams
} from 'react-router-dom';

import {callApi, getProductById, makeReview} from '../api'

import {getCurrentUser} from '../auth' 

const ReviewComponent = (props) => {
    const {productId} = useParams();

    const [ title, setFormTitle ] = useState('');
    const [ content, setFormContent ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ user, setUser ] = useState(getCurrentUser())
    const [ reviewMessage, setReviewMessage ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);
    const [ theSelectedProdId, setTheSelectedProdId ] = useState({});
    

    const productIdGrabber = async () => {
        try{
            console.log("Here is the product Id man:", productId);
            const gettingTheProdId = await getProductById(productId);
            setTheSelectedProdId(gettingTheProdId);

        } catch(error) {
            throw error;
        }
        
    }

    /* const {imageurl} = props.product; */
    console.log("Here is the product:", theSelectedProdId);
    /* const {token, setToken, user, setUser} = props; */
    const history = useHistory();
    console.log("Here is the user information", user);
   /*  console.log("Here is the userId", user.id); */
    
    /* setUserId(user.id);
    console.log("This is the result of savinguserId",userId) */

    useEffect(() => {
        productIdGrabber();
    }, [])

    const reviewHandler = async (event) => {
        try {
            event.preventDefault();
            setUserId(user.id);
            console.log("Here is the result of setUserId", user.id, productId);

            const response = await makeReview( title, content, userId, productId)

            const {data} = response;
            console.log("This is the result:", data);
            /* setProductId(product.id);
            console.log("This is the result of setting the productId", productId); */
            setFormTitle('');
            setFormContent('');
            /* setReviewMessage(data.message); */
            /* if(data.token) {
                storeCurrentToken(data.token)
                setToken(data.token);
            } */

            setAlertShow(true);

            /* const user = await callApi(
                {token: data.token, url:'/api/users/me'}
            )
            if(user && user.username) {
                setUser(user)
                storeCurrentUser(user)
            } */
        } catch(error) {
            console.log(error);
        }
    }

    const messageHandler = () => {
        return <Alert className="reviewAlerts" variant="danger" show={alertShow}><Alert.Heading>{reviewMessage}</Alert.Heading></Alert>
    }

 /*    useEffect(() => {
        if(token) {
        setUser(user);
        history.push('/home');
        }
    }, [token]); */

    return <> 

       
       <Form className="reviewForm" onSubmit={reviewHandler}>
            <img style={{ width: '17rem', height: '18rem', margin: '1rem', textAlign:"center" }} src={`${theSelectedProdId.imageurl}`}/>
            <br></br><br></br>
            <h1>Create A Review</h1>
           <h1 className="messageAlert">{messageHandler()}</h1>
            
            <Form.Group controlId="reviewFormCreation">
                <Form.Label>Add A Headline</Form.Label>
                <Form.Control className="formInput" type="text" value={title} onChange={(event) => {setFormTitle(event.target.value)}} placeholder="Title Your Review" required/>
                <Form.Text className="text-muted">
                Please Give Your Review A Heading
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Add A Written Review</Form.Label>
                <Form.Control as="textarea" rows={3} className="formInput" type="text" value={content} onChange={(event) => {setFormContent(event.target.value)}}placeholder="What did you like or dislike?" required />
                {/* <Form.Text className="text-muted">
                Please Enter Your Password
                </Form.Text> */}
            </Form.Group>
            <Button className="submitBtn" variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    </>

}

export default ReviewComponent;