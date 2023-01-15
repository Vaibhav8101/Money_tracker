import React from 'react';
import axios, { Axios } from 'axios';

const Table = (props) => {
  const delete_rec = (id, e) => {
    console.log(id)
    axios.delete(`http://localhost:8000/Tracker/v1/friend-delete/${id}/`).then(res => console.log("Deleted", res)).catch(
      err => console.log(err)
    )
  }
  return (

    <tbody>
      <tr>

        <td>{props.name}</td>
        <td>{props.state}</td>
        <td>{props.mobile_num}</td>
        <td><button type="button" className="btn btn-sm btn-outline-danger" onClick={(e) => { delete_rec(props.id, e) }}>Delete Friend</button></td>
      </tr>
    </tbody>
  );
}

export default Table