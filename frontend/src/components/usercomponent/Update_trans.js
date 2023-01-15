import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const update_trans = () => {
  const { id } = useParams()
  const url = `http://localhost:8000/Tracker/v1/transaction-update/${id}/`
  const [data, setData] = useState({
    amount: "",
    category: "",
  })

  function handle(e) {
    e.preventDefault()
    const updata = { ...data }
    updata[e.target.id] = e.target.value
    setData(updata)
    console.log(updata)

  }
  function submit(e) {
    // console.log('post
    e.preventDefault();
    axios.post(url, {
      user: 0,
      trans_id: id,
      amount: data.amount,
      category: data.category
    }).then(res => {
      console.log(res.data)
    })
  }

  return (
    <section id="update_trans">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px', width: '47%' }}>
              <div className="card-body p-md-5">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update transaction</p>

                <form onSubmit={(e) => submit(e)}>

                  <div className="form-outline mb-4">
                    <input type="number" id="amount" value={data.amount} onChange={(e) => handle(e)} className="form-control" />
                    <label className="form-label" for="form1Example1">Amount</label>
                  </div>

                  <div className="form-outline mb-4">
                    <select value={data.category} onChange={(e) => handle(e)} id="category" className="form-select" aria-label="Default select example">
                      <option selected>Select Category</option>
                      <option value="Food">Food</option>
                      <option value="Travel">Travel</option>
                      <option value="Project Work">Project Work</option>
                      <option value="Rent">Rent</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-outline-primary btn-block">Update Transaction</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default update_trans