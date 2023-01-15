import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from './table'

const Friendlist = () => {
  const [friendvalue, updateFriends] = useState({});

  let api = `http://localhost:8000/Tracker/v1/friends/`

  useEffect(() => {
    const fetchFriend = async (url) => {
      try {
        const resp = await axios.get(url);
        const Friendlist = await resp.data

        // console.log(Friendlist)
        updateFriends(Friendlist)
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

    <div className="container mt-5" style={{ backgroundColor: 'white', borderRadius: '1rem' }}>
      <div style={{
        textAlign: 'center',
        paddingTop: '1rem',
        fontSize: '33px'
      }}><strong>Friend List</strong></div>
      <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <table className="table table-bordered" style={{ width: '39%' }}>
          <thead className="thead-dark">
            <tr className="active">
              <th scope="col">Name</th>
              <th scope="col">state</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          {friendvalue && friendvalue.map && friendvalue.map((item, key) => {
            return (
              <Table key={key} id={item.id} name={item.name} state={item.state} mobile_num={item.mobile_num} />
            )
          })}
        </table>
      </div>
    </div>

  )
}

export default Friendlist