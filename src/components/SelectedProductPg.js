import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {getAllProducts, getProductById} from '../api'

import {Prod, SelectedProd} from './index'

const SelectedBoard = (props) => {
    const {productId} = useParams()
    const {fetchId, user} = props
    const [initialRender, setInitialRender] = useState([])
    const [selectedId, setSelectedId] = useState(fetchId)
    const [selected, setSelected] = useState({})
    const [categorysel, setCategorysel] = useState('')

    async function fetchProducts(){
      try{
        const data = await getAllProducts()
        const chosenOne = await getProductById(productId)
        console.log('data array ', data)
        console.log('chosen array ', chosenOne)
        setInitialRender(data)
        setSelected(chosenOne)
      }catch(error){
        console.log(error)
      }
    }
    useEffect(() => {
    fetchProducts()
      },[]);
      console.log('set render ',initialRender)

    return<div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', height: '55.5rem'}}>
    <div>
        <SelectedProd selected={selected} user={user} />
        </div> 
    <div style={{display: 'flex', borderLeft: '1px solid grey', 
     backgroundColor: 'lightgrey', float: 'right', flexDirection: 'column', overflow: 'scroll'}}>
{initialRender.map((product) => {
    if(product.id !== selectedId){
    return <Prod key={product.id} product={product} setSelectedId={setSelectedId} setCategorysel={setCategorysel} />
}
})}
    </div>
    </div>
}

export default SelectedBoard;
