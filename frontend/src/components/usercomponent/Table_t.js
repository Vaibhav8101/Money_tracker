import React from 'react'
import axios from 'axios'

const Table_t = (props) => {
  const delete_rec = (id, e) => {
    console.log(id)
    axios.delete(`http://localhost:8000/Tracker/v1/transaction-delete/${id}/`).then(res => console.log("Deleted", res)).catch(
      err => console.log(err)
    )
  }
  return (


    <tbody>
      <tr>
        <td><a href={`http://localhost:8000/react/friend-trans-detail/${props.id}/`}>{props.id}</a></td>
        <td>{props.amount}</td>
        <td>{props.date}</td>
        <td>{props.category}</td>
        <td>
          <td><button type="button" onClick={(e) => { delete_rec(props.id, e) }} className="btn btn-sm btn-outline-danger">Delete Transaction</button></td>
          <td><a href={`http://localhost:8000/react/update_t/${props.id}`} className='btn btn-sm btn-primary'>Update Transaction</a></td>
        </td>
      </tr>
    </tbody>
  )
}

export default Table_t