import React, { useEffect, useState } from "react";
import axios from "axios";
import Table_t from "./Table_t";
import '../../css/transaction.css'

const TransactionList = () => {
  const [transactionvalue, updateTransaction] = useState({});
  const [searchTerm, setSearchTerm] = useState("")
  let api = `http://localhost:8000/Tracker/v1/transactions/`

  useEffect(() => {
    const fetchTransaction = async (url) => {
      try {
        const resp = await axios.get(url);
        const TransactionList = await resp.data

        // console.log(TransactionList)
        updateTransaction(TransactionList)
        // console.log(transactionvalue)
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
    fetchTransaction(api)
  });
  console.log(transactionvalue)

  return (

    <div className="container mt-5" style={{ backgroundColor: 'white', borderRadius: '1rem' }}>
      <div style={{
        textAlign: 'center',
        paddingTop: '1rem',
        fontSize: '33px'
      }}><strong>Transactions</strong></div>
      <div style={{ paddingTop: '1rem' }}><input type="text" style={{
        marginLeft: '31%',
        width: '33%', border: '2px solid gray',
        borderRadius: '0.25rem'
      }} placeholder="search by Date.." onChange={(e) => { setSearchTerm(e.target.value) }} />
        <input type="text" style={{
          marginLeft: '2%',
          width: '33%', border: '2px solid gray',
          borderRadius: '0.25rem'
        }} placeholder="search by Category.." onChange={(e) => { setSearchTerm(e.target.value) }} /></div>
      <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <table className="table table-sm table-bordered" style={{ width: '37%' }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Trans_ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Category  </th>
              <th scope="col">Operations  </th>
            </tr>
          </thead>
          {transactionvalue && transactionvalue.map && transactionvalue.filter(val => {
            if (searchTerm === '') {
              return val
            }
            else if (val.category.toLowerCase().includes(searchTerm.toLowerCase()) || val.date.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val;
            }
          }).map((item, key) => {
            return (
              <Table_t key={key} id={item.trans_id} amount={item.amount} date={item.date} category={item.category} />
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default TransactionList