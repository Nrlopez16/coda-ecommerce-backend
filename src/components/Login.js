import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import './Login.css';
import {
    useHistory
} from 'react-router-dom';

import {callApi} from '../api'

import {storeCurrentUser, storeCurrentToken} from '../auth'
import {Footer} from './index'

const LoginComponent = (props) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loginMessage, setLoginMessage ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);

    const {token, setToken, user, setUser} = props;
    const history = useHistory();

    
    const loginHandler = async (event) => {
        try {
            event.preventDefault();

            const response = await axios.post(`/api/users/login`, {username, password})

            const {data} = response;
            
            setUsername('');
            setPassword('');
            setLoginMessage(data.message);
            if(data.token) {
                storeCurrentToken(data.token)
                setToken(data.token);
            }

            setAlertShow(true);

            const user = await callApi(
                {token: data.token, url:'/api/users/me'}
            )
            if(user && user.username) {
                setUser(user)
                storeCurrentUser(user)
            }
        } catch(error) {
            console.log(error);
        }
    }

    const messageHandler = () => {
        return <Alert className="loginAlerts" variant="danger" show={alertShow}><Alert.Heading>{loginMessage}</Alert.Heading></Alert>
    }

    useEffect(() => {
        if(token) {
        setUser(user);
        history.push('/home');
        }
    }, [token]);

    return <> 
       <Image className="loginImg" src="https://cdn.shopify.com/s/files/1/1298/4787/files/Web_Banner-2_1400x.progressive.png.jpg?v=1588688871" fluid />

        
       <Form className="loginForm" onSubmit={loginHandler}>
        
           <h1 className="messageAlert">{messageHandler()}</h1>
            
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control className="loginInput" type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} placeholder="Enter Username" required/>
                <Form.Text className="text-muted">
                Please Enter Your Username
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className="loginInput" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}}placeholder="Password" required />
                <Form.Text className="text-muted">
                Please Enter Your Password
                </Form.Text>
            </Form.Group>
            <Button className="loginBtn" variant="primary" type="submit">
                Login
            </Button>
        </Form>
        <Footer/>

    </>

}

export default LoginComponent;