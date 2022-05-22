import React from 'react'
import {useState,useEffect} from "react"

function Product({numberWithCommas,addingNett1,key1,product}) {

  const productList = [{
    product_name : "product_1",
    units:[{
      name:"Pak",
      price:10000
    },{
      name:"Pcs",
      price:1000
    },{
      name:"Pcss",
      price:100
    },{
      name:"Pcsss",
      price:10
    }]
  },{product_name: "product_2",
    units:[{
      name:"Karton",
      price:120000
    },{
      name:"Pak",
      price:50000
    },{
      name:"Pcs",
      price:5000
    }]},{product_name: "product_3",
    units:[{
      name:"Karton",
      price:150000
    },{
      name:"Pak",
      price:10000
    },{
      name:"Pcs",
      price:1500
    }]}
  ]
  const [productSelect,setProd] = useState("");
  const [unitSelect,setUnit] = useState("");
  const [price,setPrice] = useState(0);
  const [quantity,setQuantity] = useState(1);
  const [totalNett,setNett] = useState(0);
  const addingNett = () => {
    if(unitSelect !== ""){
    setNett(quantity * price)}
  }

  const checkUnit = (p,n) =>{
    for(let j = 0;j<product.length;j++){
      if(p === product[j].prod && n === product[j].unit){
        return true
      }
    }
    return false
  }
  useEffect(()=>{
    addingNett();
    addingNett1(key1,totalNett,productSelect,unitSelect);
  },[unitSelect,price,quantity,totalNett])
  return (
    <div className='product-section'>
            <form className='select-3' >
              <div className='select-4' style={{width:"65%"}}>
                <p>Product</p>
                <select name="" id="" onChange={(e)=> {setProd(e.target.value);addingNett();addingNett1(key1,totalNett)}} onClick={()=>{addingNett()}}>
                  <option value="" disabled hidden selected>Select Product</option>
                  <option value={0}>Product 1</option>
                  <option value={1}>Product 2</option>
                  <option value={2}>Product 3</option>
                  
                </select>
              </div>
              <div className='select-4' style={{width:"35%"}}>
                <p>Unit</p>
                <select name="" id="" onChange={(e) => {setUnit(e.target.value);setPrice(productList[productSelect].units[unitSelect].price);if(unitSelect !== e.target.value)addingNett();}} onClick={()=>{setPrice(productList[productSelect].units[unitSelect].price);addingNett();addingNett1(key1,totalNett)}} >
                  {productSelect === "" ? <option value="">No data available</option> : <option value="" hidden disabled>Select Unit</option>}
                  {productSelect === "" ? "" : productList[productSelect].units.map((i)=>{
                      return(
                      <option key={productList[productSelect].units.indexOf(i)} value={productList[productSelect].units.indexOf(i)} onClick={()=>{setPrice(productList[productSelect].units[unitSelect].price);addingNett()}} hidden={checkUnit(productSelect,productList[productSelect].units.indexOf(i).toString())}>{i.name}</option>
                    )
                  })}
                </select>
              </div>
            </form>
            <form className='select-3'>
              <div className='select-4' style={{width:"20%"}}>
                <p>Quantity</p>
                <input onChange={(e) => {setQuantity(e.target.value);if(quantity !== "")addingNett();addingNett1(key1,totalNett)}} type="number" name="" id="" value={quantity} onClick={()=>{addingNett()}}/>
              </div>
              <div className='select-4' style={{width:"30%"}}>
                <p>Price</p>
                <input type="number" name="" id="" value={price} />
              </div>
              <div className='select-4' style={{width:"45%"}}>
                <p>Total Price</p>
                <input type="number" name="" id="" disabled  value={totalNett }/>
              </div>
            </form>
            <div className='total-container'>
                <div className='total-net'>
                    <h4>Total Nett Price</h4>
                    <h4 className='total-number'>{numberWithCommas(totalNett)}</h4>
                </div>
            </div>
          </div>
  )
}

export default Product