import React,{useEffect,useState} from "react";
import axios from "axios";
import Table from './table'

const Friendlist = () => {
    const [friendvalue,updateFriends]=useState({});
  
    let api=`http://localhost:8000/Tracker/v1/friends/`
    
    useEffect(()=>{
      const fetchFriend=async(url)=>{
        try {
            const resp = await axios.get(url);
            const Friendlist=await resp.data
            
            // console.log(Friendlist[0])
            updateFriends(Friendlist[0])
            // console.log(friendvalue)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
      fetchFriend(api)},[]);
    console.log(friendvalue)
  return (
    <div><Table name={friendvalue.name} state={friendvalue.state} mobile_num={friendvalue.mobile_num} />
    
    </div>
  )
}

export default Friendlist