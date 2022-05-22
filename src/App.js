import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react"
import Product from './component/Product';
import useFetch from "./component/useFetch";

function App() {
  const [product,setProduct] = useState([{index:0,total:0,prod:"",unit:""}]);
  const {data,loading,error} = useFetch("https://randomuser.me/api/?results=5");
  const [nameSelect,setName] = useState("");
  const [distSelect,setDist] = useState("");
  const [grandTotal,setGrandtotal] = useState(0);
  let total = 0;
  useEffect(()=>{
    childTotal()
  },[product])

  const numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  const checkConfirm = () =>{
    for(let j = 0;j<product.length;j++){
      if((product[j].prod === "" || product[j].unit === undefined ) && (product[j].unit === "" || product[j].unit === undefined)){
        return true
      }
    }
    return false
  }
  const childTotal = () =>{
    let newTotal = 0
    for(let j = 0;j<product.length;j++){
      newTotal+=product[j].total
    }
    setGrandtotal(newTotal);
  }
  const addingNett = (n,t,p,u) =>{
    product[n].total = t;
    product[n].prod = p;
    product[n].unit = u;
    setProduct([...product]);
  }
  const newData = [];
  const ifValid = ()=>{
    if(data){
      return(
      newData[0].map((i)=>{
        return(
          <option key={newData[0].indexOf(i)} value={i.name.first + " " + i.name.last}>{i.name.first + " " + i.name.last}</option>
        )
      }
      ))
    }else{
      return false
    }
  }
  const printProduct = () =>{
    return(
    product.map((i)=>{
      return(<Product product={product} key={product.indexOf(i)} key1={product.indexOf(i)} grandTotal={grandTotal} addingNett1={addingNett} numberWithCommas={numberWithCommas}/>)
    }))
  }
  if(error) console.log(error)
  if(loading) return <h1 className='load-screen'>LOADING ...</h1>
  if(data) newData.push(data.results)
  return (
    <div className="App">
      <h1 className='header'>Create Order</h1>
      <div className='input-container'>
        <div className='detail-input'>
          <span className='detail-header'>Detail</span>
          <div className='select-2'>
          <div className='select-1'>
            <p>Name</p>
            <form action="">
            <select name="" id="" onChange={e=> setName(e.target.value)}>
              <option value="" disabled selected hidden>Name</option>
              <option value="test">Test1</option>
            {ifValid()}
            </select>
            </form>
          </div>
          <div className='select-1'>
            <p>Distribution Center</p>
            <select name="" id="" onChange={e=> setDist(e.target.value)} disabled={nameSelect === "" ? true : false}>
              <option value="" hidden>{nameSelect === "" ? "No Data available" : "Select DC"}</option>
              <option value="DC Tanggerang">DC Tanggerang</option>
              <option value="DC Cikarang">DC Cikarang</option>
            </select>
          </div>
          </div>
          <div className={(nameSelect && distSelect) === "" ? "hidden-area" :"active-area" }>
          <div className='select-2'>
            <div className='select-1'>
              <p>Payment Method</p>
              <select name="" id="">
              <option value="" selected hidden>Select Payment</option>
                <option value="">Cash H+1</option>
                <option value="">Cash H+3</option>
                <option value="">Cash H+7</option>
                <option value="">Transfer H+1</option>
                <option value="">Transfer H+3</option>
                <option value="">Transfer H+7</option>
              </select>
            </div>
            <div className='select-1'>
              <p>Expire Date</p>
              <input type="date" className='date-pick' />
            </div>
          </div>
          <div className={`textbox-1 ${(nameSelect && distSelect) === "" ? "hidden-area" :"active-area"}`}>
            <p>Notes</p>
            <textarea name="" id="" cols="50" rows="6"></textarea>
          </div>
          </div>
        </div>
        <div className={`product-container ${(nameSelect && distSelect) === "" ? "hidden-area" :"active-area"}`}>
          <span>Product</span>
          <div>
          {printProduct()}
          </div>
          <button className='new-button' onClick={()=>setProduct([...product,{index:(product.length-1)+1,total:0,prod:"",unit:""}])}>NEW ITEM +</button>
        </div>
        <div className={`grand-total ${(nameSelect && distSelect) === "" ? "hidden-area" :""}`}>
          <h4>Total</h4>
          <h3>{numberWithCommas(grandTotal) }</h3>
        </div>
        <div className='submit-container'>
          <button className={`confirm-button ${!checkConfirm() ? "": "confirm-inactive"}`} disabled>CONFIRM</button>
          <button className='cancel-button'>CANCEL</button>
        </div>
      </div>
    </div>
  );
}

export default App;
