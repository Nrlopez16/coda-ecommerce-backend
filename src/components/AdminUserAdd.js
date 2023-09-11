import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';

import {
    useHistory
} from 'react-router-dom';


const AdminUserAdd = (props) => {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ emailFirstHalf, setEmailFirstHalf ] = useState('');
    const [ emailSecHalf, setEmailSecHalf ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ loginMessage, setLoginMessage ] = useState('');
    const [ alertShow, setAlertShow ] = useState(false);
    const [ newUserToken, setNewUserToken ] = useState(null);


    const history = useHistory();

    
    const registerHandler = async (event) => {
        try {
            event.preventDefault();
            console.log('first name ', firstName)
            console.log('last name ', lastName)
            console.log('email ', emailFirstHalf+'@'+emailSecHalf+'.com')
            console.log('username ', username)
            console.log('isAdmin ', isAdmin)

            //const response = await axios.post(`/api/users/register`, {firstName, lastName, email: emailFirstHalf+'@'+emailSecHalf+'.com', username, password, isAdmin, imageURL: null})

            //const {data} = response;

            //setLoginMessage(data.message);
           // setAlertShow(true);
            
            /*if(data.token) {
              
                setFirstName('');
                setLastName('');
                setUsername('');
                setPassword('');
                setNewUserToken(data.token);

            }*/
        } catch(error) {
            console.log(error);
        }
    }

    /*const messageHandler = () => {
        return <Alert variant="danger" show={alertShow}><Alert.Heading>{loginMessage}</Alert.Heading></Alert>
    }

    useEffect(() => {
        if(newUserToken) {
        history.push('/home');
        }
    }, [newUserToken]);*/

    return <> 
       
       <Form onSubmit={registerHandler}>
            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName} onChange={(event) => {setFirstName(event.target.value)}} placeholder="First Name" required/>
                <Form.Text className="text-muted">
                Please Input User's First Name
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={(event) => {setLastName(event.target.value)}} placeholder="Last Name" required/>
                <Form.Text className="text-muted">
                Please Input User's Last Name
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Email</Form.Label>
                <div style={{display: 'flex'}}>
                <Form.Control type="text" value={emailFirstHalf} onChange={(event) => {setEmailFirstHalf(event.target.value)}} placeholder="example" required/>
                <Form.Text className="text-muted">@</Form.Text>
                <Form.Control type="text" value={emailSecHalf} onChange={(event) => {setEmailSecHalf(event.target.value)}} placeholder="handle" required/>
                <Form.Text className="text-muted">.com</Form.Text>
                </div>
                <Form.Text className="text-muted">
                Please Input User's Email
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(event) => {setUsername(event.target.value)}} placeholder="Enter Username" required/>
                <Form.Text className="text-muted">
                Please Create User's Username
                </Form.Text>
            </Form.Group>

            <Form.Group style={{margin: '1rem'}}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} minLength="8" maxLength="15" onChange={(event) => {setPassword(event.target.value)}}placeholder="Password" required/>
                <Form.Text className="text-muted">
                Please Create User's Password
                </Form.Text>
            </Form.Group>
            <Form.Group>
            <Form.Check type="checkbox" style={{marginLeft: '1rem', marginTop: '1rem'}}  onChange={(e) => {
        if(e.target.value === 'on'){
            setIsAdmin(true)
        }else{
            setIsAdmin(e.target.value)}}} label="Set As Admin? " />
            </Form.Group>
            <Button style={{marginLeft: '1rem'}} variant="primary" type="submit">
                Create
            </Button>
        </Form>
    </>

}

export default AdminUserAdd;