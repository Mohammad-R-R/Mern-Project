import React from 'react'
import axios from 'axios';
import {useState } from 'react'
import AddProductForm from './AddProductForm';
const CreateProduct = (props) => {
    const [error, setError]= useState([]);
    const createProduct = product => {
        console.log(product)
        console.log(product._id)
        console.log(product.productName)
        axios.post('http://localhost:8000/api/product/new', product)
            .then(res=>{
                console.log("hereee")
                
            })
            .catch(err=>{
              const errorResponse = err.response.data.errors; // Get the errors from err.response.data
              const errorArr = []; // Define a temp error array to push the messages in
              for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                  errorArr.push(errorResponse[key].message)
              }
              // Set Errors
              setError(errorArr);
          })    
        }   
    return (
        <div>
             <AddProductForm onSubmitProp={createProduct}  supermarketName={props.name} initialName="" initialPrice="" initialImg="" name={props.name} name_error={error} />
        </div>
    )
}

export default CreateProduct
