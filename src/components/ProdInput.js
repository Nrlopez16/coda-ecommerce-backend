import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {createProduct} from '../api'
import {
    useHistory
} from 'react-router-dom';


const ProductInput = (props) => {
    const [adminToggle, setAdminToggle] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [inStock, setInStock] = useState(false)
    const [imageURL, setImageURL] = useState(null)
    const [category, setCategory] = useState('')
    const [missing, setMissing] = useState('')
    const history = useHistory();

    const addProduct = async (event) => {
        try {
            event.preventDefault();
            if(name && description && price && category){
            console.log('name: ', name, ',description: ', description, ',price: ', price, ',inStock: ',
             inStock, ',imageURL: ', imageURL, ',category: ', category)


             const response = await createProduct(name, description, price, inStock, imageURL, category)
 
             const {data} = response;
             console.log("Here is data from the form:", data);
             setMissing('')
             setName('');
             setDescription('');
             setPrice('');
             setInStock(true);
             setCategory('');
             if(response) {
                setAdminToggle(true)
                history.push('/products');
             }} else{
                 setMissing('Missing Fields Above')
             }
 
        }catch(error){
            console.error(error)
        }
    }

    /* createProduct(product) */

    useEffect(() => {
        if(!setAdminToggle(false)) {
            setAdminToggle(true);
            console.log("loook")
            console.log('this is the result of adminToggle', adminToggle)
            return
        }
        
    }, [adminToggle]);

    return <div>
        <Form className="adminProductAdd" onSubmit={addProduct}>
            <Form.Group style={{marginLeft: '1rem', marginRight: '1rem'}}>
                <h4 style={{paddingLeft: '1rem'}}>Product Name</h4>
            <Form.Control value={name} type="text" placeholder="" onChange={(e) => {setName(e.target.value)}} />
            <br />
                <h4 style={{paddingLeft: '1rem'}}>Description</h4>
            <Form.Control value={description} type="text" placeholder="" onChange={(e) => {setDescription(e.target.value)}} />

            <h4 style={{paddingLeft: '1rem'}}>Price</h4>
            <Form.Control value={price} type="text" placeholder="" onChange={(e) => {setPrice(e.target.value)}} />

            <h4 style={{paddingLeft: '1rem'}}>image URL</h4>
            <Form.Control value={imageURL} type="text" placeholder="" onChange={(e) => {setImageURL(e.target.value)}} />

            <h4 style={{paddingLeft: '1rem'}}>Category</h4>
            <Form.Control value={category} type="text" placeholder="" onChange={(e) => {setCategory(e.target.value)}} />

                <Form.Check type="checkbox" style={{marginLeft: '1rem', marginTop: '1rem'}}  onChange={(e) => {
                    if(e.target.value === 'on'){
                        setInStock(true)
                    }else{
                        setInStock(e.target.value)}}} label="In Stock? " />
                        <div style={{display: 'flex'}}>
                        <Button type="submit" /* onClick={handleSubmit} */ style={{marginLeft: '1rem', marginTop: '1rem'}} variant="success">Enter</Button>
                        <h4 style={{paddingLeft: '3rem', paddingTop: '1.3rem', color: 'red'}}>{missing}</h4>
            </div>
            </Form.Group>
        </Form>
    </div>
}
export default ProductInput;