import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

import {Link} from 'react-router-dom';

import {getAllUsers} from '../api'

import {getCurrentUser, getCurrentToken} from '../auth'


const UserBoard = (props) => {
    const {user} = props
    const [userRender, setUserRender] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    

    async function fetchUsers(){
      try{
    const data = await getAllUsers()
    console.log('data array ', data)
    setUserRender(data)
      }catch(error){
        console.log(error)
      }
    }

    
    useEffect(() => {
        fetchUsers()
      },[selectedUser]);
      console.log('set render ', userRender)

    return <div>
        {userRender.map(user => {
           return <div key={user.id} style={{border: '1px solid black', padding: '1rem',
        margin: '1rem', marginLeft: '3rem', marginRight: '3rem', textAlign: 'center', backgroundColor: '#F0FFFF',
        boxShadow: '0 5px 5px -5px'}} onClick={() => {console.log('selected user with id, ',user.id)}}>
            <Link to={`/user/${user.id}`} style={{textDecoration: 'none', color: 'black'}}>{user.username}</Link>
            </div>
        })}
    </div>
}

export default UserBoard;