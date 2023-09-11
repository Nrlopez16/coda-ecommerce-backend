import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import {destroyProduct, getUserById, makeReview} from '../api'
import {
  useHistory
} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const SelectedProd = (props) => {
  const {user} = props
    const {id, name, description, price, imageurl, instock, category, reviews} = props.selected
    const [editingProduct, setEditingProduct] = useState(false)
    const [reviewDisplay, setReviewDisplay] = useState(false)
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newInStock, setNewInStock] = useState(false)
    const [newImageURL, setNewImageURL] = useState(null)
    const [newCategory, setNewCategory] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [missing, setMissing] = useState('')
    const [ toggle, setToggle ] = useState(false);
    const history = useHistory();

    const submittedProduct = async () => {
      try{
          //const newProduct = await apiFuncName({name, description, price, inStock, imageURL, category})
          if(newName && newDescription && newPrice && newCategory){
          console.log('name: ', newName, ',description: ', newDescription, ',price: ', newPrice, ',inStock: ',
          newInStock, ',imageURL: ', newImageURL, ',category: ', newCategory)
      setEditingProduct(false)
          
        } else{
          setMissing('Missing Fields Above')
        }
      }catch(error){
          console.error(error)
      }
  }

  const submittedReview = async () => {
    try{
        /* const newProduct = await makeReview({name, description, price, inStock, imageURL, category}) */
      if(reviewBody){
        //const newProduct = await apiFuncName({name, description, price, inStock, imageURL, category})
        console.log('review: ', reviewBody)
    setReviewDisplay(false)}
    }catch(error){
        console.error(error)
    }
}

  const handleSubmit = (event) => {
      event.preventDefault()
      submittedProduct()
  }

  const reviewSubmit = (event) => {
    event.preventDefault()
    submittedReview()
}

/* THIS IS TO HARD DELETE A PRODUCT */
  const handleProductDelete = async (event) => {

    try {
      await destroyProduct(event.target.id);
      setToggle(true);

    } catch(error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if(!toggle === false) {
      history.push('./');
    }
  }, [toggle])

    return <><Card style={{ width: '60rem', maxWidth: '100%', height: '52rem', margin: '1rem', 
    boxShadow: '0 6px 10px -5px', backgroundColor: '#e6faff' }}>
    {editingProduct ?
     <div>
     <Form.Group style={{marginLeft: '1rem', marginRight: '1rem', marginTop: '1rem', height: '45.9rem'}}>
 <h4 style={{paddingLeft: '1rem'}}>Product Name</h4>
<Form.Control value={newName} type="text" placeholder={name} onChange={(e) => {setNewName(e.target.value)}} />
<br />
 <h4 style={{paddingLeft: '1rem'}}>Description</h4>
<Form.Control value={newDescription} type="text" placeholder={description} onChange={(e) => {setNewDescription(e.target.value)}} />

<h4 style={{paddingLeft: '1rem'}}>Price</h4>
<Form.Control value={newPrice} type="integer" placeholder={price} onChange={(e) => {setNewPrice(e.target.value)}} />

<h4 style={{paddingLeft: '1rem'}}>image URL</h4>
<Form.Control value={newImageURL} type="text" placeholder={imageurl} onChange={(e) => {setNewImageURL(e.target.value)}} />

<h4 style={{paddingLeft: '1rem'}}>Category</h4>
<Form.Control value={newCategory} type="text" placeholder={category} onChange={(e) => {setNewCategory(e.target.value)}} />

 <Form.Check type="checkbox" style={{marginLeft: '1rem', marginTop: '1rem'}}  onChange={(e) => {
     if(e.target.value === 'on'){
      setNewInStock(true)
     }else{
      setNewInStock(e.target.value)}}} label="In Stock? " />
      <div style={{display: 'flex'}}>
<Button type="submit" onClick={handleSubmit} style={{marginLeft: '1rem', marginTop: '1rem'}} variant="success">Enter</Button>
<h4 style={{paddingLeft: '3rem', paddingTop: '1.3rem', color: 'red'}}>{missing}</h4>
</div>
</Form.Group>
 </div> 
     : <><Card.Img style={{width: '23rem', backgroundColor: '#e6faff'}}variant="top" src={imageurl ? imageurl : "https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg"} />
    <Card.Body style={{backgroundColor: '#e6faff'}}>
<Card.Title>{name}</Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
<ListGroupItem style={{backgroundColor: '#e6e6e6'}}>{category}</ListGroupItem>
<ListGroupItem style={{backgroundColor: '#e6faff'}}>{price}</ListGroupItem>
    </ListGroup></>}
    
    <div style={{height: '4rem', backgroundColor: '#e6e6e6'}}>
    <Card.Body>
      {instock ? <Button style={{float: 'left'}} variant="primary" size="sm">Add To Cart</Button>
         : <Button style={{float: 'left'}} href="#" variant="secondary" size="sm" disabled>Out of Stock</Button> } 

      {user && user.isadmin ? <>
      <Button id={id} onClick={(event) => {event.preventDefault()}, handleProductDelete} style={{float: 'right'}} variant="danger" size="sm">Delete Listing</Button>

      <Button style={{float: 'right', marginRight: '1rem'}} onClick={() => {setEditingProduct(!editingProduct)}}variant="info" size="sm">{editingProduct ? 'Cancel':'Edit Listing'}</Button></>
       : <Link style={{float: 'right'}} to={`/product/${id}/reviews`} variant="secondary" size="sm">Leave A Review</Link> }   
      
    </Card.Body>
    </div>
    {reviewDisplay ? <div style={{display: 'flex'}}>
    <Form.Control value={reviewBody} type="text" placeholder="Enter Review Here" onChange={(e) => {setReviewBody(e.target.value)}} />
    <Button type="submit" onClick={reviewSubmit} variant="success">Enter</Button>
    </div> : null}

    
  </Card>
  <div style={{paddingBottom: '1rem'}}>
      {reviews ? reviews.map(review => {
        return <div style={{backgroundColor: '#e6faff', margin: '1rem', 
        boxShadow: '0 6px 10px -5px', borderRadius: '15px'}}>
          <div style={{padding: '1rem', marginLeft: '1rem'}}>"{review.title}" Said User #{review.userId}</div>
          <div style={{padding: '1rem', marginLeft: '1rem'}}>"{review.content}"</div></div>
      }) : null}
    </div></>
}




export default SelectedProd;