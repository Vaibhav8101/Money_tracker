import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const Friend_group_add = () => {
    const {id}=useParams()
    const url=`http://localhost:8000/Tracker/v1/friend-group-create/`
    const[data,setData]=useState({  
      trans_id:"",  
      name:""
    })
  
    function submit(e){
      e.preventDefault();
      axios.post(url,{
        user:0,
        trans_id:id,
        name:data.name
      }).then(res=>{
        console.log(res.data)
      })
    }
    function handle(e){
        const updata={...data}
        updata[e.target.id]=e.target.value
        setData(updata)
        // console.log(updata)
  
    }
  return (
    <div className="container h-100 mt-4">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{borderRadius: '25px',width:'75%'}}>
            <div className="card-body p-md-5">
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Friend</p>
  
             <form onSubmit={(e)=>submit(e)}>
    
    <div className="form-outline mb-4">
      <input type="text" id="name" value={data.name} onChange={(e)=>handle(e)} className="form-control" />
      <label className="form-label" for="form1Example1">Name</label>
    </div>
 
    <button type="submit" className="btn btn-outline-primary btn-block">Add Friend</button>
  </form>
  </div>
  </div>
  </div>
  </div>
  </div>
  )
}

export default Friend_group_add