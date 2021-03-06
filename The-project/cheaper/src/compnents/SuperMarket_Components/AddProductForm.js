import React, { useState, useEffect } from 'react'
import {

    FormControl,
    InputLabel,
    OutlinedInput,
    Button
} from '@material-ui/core';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import "../../styles/style.css"
import {Link, navigate} from '@reach/router'
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
const AddProductForm = (props) => {
    const {onSubmitProp, initialName,initialPrice, initialImg, name_error, supermarketName}= props;
    const [productName, setPname] = useState(initialName);
    const [price, setPrice] = useState(initialPrice);
    // const [supermarketName, setSupermarketName] = useState(""); 
    const [error, setError]= useState(" ");
    const [error1, setError1]= useState(" ");
    var img=initialImg
    // var supermarketName="bravo"

    const [allProducts, setAllProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
      useEffect(()=>{
          axios.get('http://localhost:8000/api/products')
              .then(res=>{
                setAllProducts(res.data);
                  setLoaded(true);
              });
      },[]);
   
    
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
        var p = {productName, price, supermarketName, img}
        if(validatePName(productName) && validatePrice(price)){
            onSubmitProp({productName, price, supermarketName, img});
            setPname("");
            setPrice("");
            // setSupermarketName("")
        }
       
       
    }
    const validatePName=(pname)=>{
        var name_exists= allProducts.filter(product => (product.productName === pname));
        setPname(pname);
        if(pname===""){
            setError("Error: product name must not be empty");
            return false;

        }
        else if(pname.length<3){
            setError("Error: product name must be at least 3 characters")
            return false;
        }
        // else if(name_exists.length !==0){
        //     setError("Error: this product name is already exsits!!")
        //     return false;

        // }
        else{
            setError("")
            return true;
        }
        
    }
    const validatePrice=(price)=>{
        setPrice(price);
        if(price === ""){
        setError1("Error: price must not be empty");
            return false;

        }
        
        else{
            setError1("")
            return true;
        }
    }
    const onChange = (event) => {
        const value = event.target.value;
      
        // this will return C:\fakepath\somefile.ext
        console.log(value);
      
        const files = event.target.files;
      
        //this will return an ARRAY of File object
        console.log(files[0].name);
       img=(files[0].name);
    
    }
    return (
        <div style={{height:"600px"}}>
          
      <AppBar position="static">
        
<ul style={{listStyleType:"none",margin:"0px",padding:"0px",backgroundColor:"black",overflow:"hidden", height: "50px"}}>
   <div style={{display:"flex"}}>
      
     <Link to={"/supermarket/"+props.name} style={{ textDecoration: "none"}}> <h2 style={{color:"white"}}>Cheaper</h2></Link>

   <div style={{display:"flex", justifyContent:"space-between"}}>
   <h4 style={{color:"white", marginLeft:"10px"}}>Welcome, {props.name} | </h4>
 
   <h4> <Link style={{color:"white",textDecoration:"none"}} to="/"><li className="nav-item nav-link" style={{display:"inline"}}>  | Logout | </li></Link></h4>
   <h4> <Link style={{color:"white",textDecoration:"none"}} to={"/chatWith/"+props.name}><li className="nav-item nav-link" style={{display:"inline"}}>  | Open Chat </li></Link></h4>
  
   

  


   </div>
   


   </div>
  
    </ul>
       
      </AppBar>

            <h1>Add a Product</h1>
             {name_error.map((err, index) => <p className="error" key={index}>{err}</p>)}
            <form onSubmit={onSubmitHandler}>
            <br></br>
                <FormControl variant="outlined">
                    <InputLabel>Product Name</InputLabel>
                    <OutlinedInput type="text" onChange={(e)=>validatePName(e.target.value)} value={productName}/>
                    <p className="error">{error}</p>
                </FormControl>
                <br></br>
                <br></br>
                <FormControl variant="outlined">
                    <InputLabel>Price</InputLabel>
                    <OutlinedInput type="number" onChange={(e)=>validatePrice(e.target.value)} value={price}/>
                    <p className="error">{error1}</p>
                </FormControl>
                <br></br>
                <br></br>

                <FormControl variant="outlined">
                   
                    <OutlinedInput type="file" onChange={onChange} />
                </FormControl>
                <br></br>
                <br></br>
  
            
                    <Button type="submit" variant="contained" color="primary">
                    Add/Update
                    </Button>
                
            </form>

            <ul style={{listStyleType:"none",margin:"0px",padding:"0px",backgroundColor:"black",overflow:"hidden",  position:"relative",top:"160px"}}>



<div style={{position:"relative", color:"white"}}>
<h1>Contact Us</h1>
 <h3 style={{fontWeight:"bold"}}> email: cheaper@gmail.com</h3>
 <h3 style={{fontWeight:"bold"}}> phone: 059833747432</h3>
 <h3 style={{fontWeight:"bold"}}> facebook: cheaperWebsite</h3>
</div>



</ul>
        </div>
    )
}

export default AddProductForm
