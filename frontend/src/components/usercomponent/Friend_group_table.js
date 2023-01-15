import React from 'react'
import axios from 'axios'


const Friend_group_table = (props) => {
    
    const delete_rec=(id,e)=>{
        console.log(id)
        axios.delete(`http://localhost:8000/Tracker/v1/friend-group-delete/${id}/`).then(res=>console.log("Deleted",res)).catch(
          err=>console.log(err)
        )
      }
  return (
    <tbody>
    <tr>
      <td>{props.name}</td>
      <td><button type="button" className="btn btn-outline-danger" onClick={(e)=>{delete_rec(props.id,e)}}>Delete Friend</button></td>
    </tr>
  </tbody>
  )
}

export default Friend_group_table