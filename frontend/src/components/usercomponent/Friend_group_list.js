import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from './table'
import { useParams } from 'react-router-dom'
import Friend_group_table from "./Friend_group_table";

const Friend_group_list = () => {
  const { id } = useParams()
  const [friendvalue, updateFriends] = useState({});

  let api = `http://localhost:8000/Tracker/v1/friend-group/${id}`

  useEffect(() => {
    const fetchFriend = async (url) => {
      try {
        const resp = await axios.get(url);
        const Friend_group_list = await resp.data

        // console.log(Friend_group_list)
        updateFriends(Friend_group_list)
        // console.log(friendvalue)
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
    fetchFriend(api)
  });
  // console.log(friendvalue)

  return (

    <div className="container mt-5" style={{ backgroundColor: 'white', borderRadius: '1rem', width: '46%' }}>
      <div style={{
        textAlign: 'center', paddingTop: '1rem',
        fontSize: '33px'
      }}><strong>Friend List</strong></div>
      <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
        <table className="table" style={{ width: '37%' }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          {friendvalue && friendvalue.map && friendvalue.map((item, key) => {
            return (
              <Friend_group_table id={item.id} name={item.name} />
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default Friend_group_list