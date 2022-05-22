import React ,{useEffect,useState} from 'react';
import axios from 'axios'

function useFetch(url) {
    const [data,setData] = useState(null);
    const [loading,setLoad] = useState(false)
    const [error,setError] = useState(null)
  
    useEffect(()=>{
      setLoad(true);
      axios.get(url).then((response)=>{
        setData(response.data)
      }).catch((err)=>{
        setError(err)
      }).finally(()=>{
        setLoad(false);
      })
    },[url])
  
    return {data,loading,error};
}

export default useFetch