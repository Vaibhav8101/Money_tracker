import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
const Maketransaction = () => {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8)
  const url = `http://localhost:8000/Tracker/v1/transaction-create/`
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
    // console.log('h')
    e.preventDefault();
    axios.post(url, {
      user: 0,
      trans_id: small_id,
      amount: data.amount,
      category: data.category
    }).then(res => {
      console.log(res.data)
    })
  }
  return (
    <div>
      <section className="vh-100" id="newtransaction">
        <div className="container mt-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11 ">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Make transaction</p>

                  <form onSubmit={(e) => submit(e)}>

                    <div className="form-outline mb-4">
                      <input type="number" id="amount" placeholder='Enter amount' value={data.amount} onChange={(e) => handle(e)} className="form-control" />

                    </div>

                    <div className="form-outline mb-4">
                      <select value={data.category} id="category" onChange={(e) => handle(e)} className="form-select" aria-label="Default select example">
                        <option selected>Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="ProjectWork">Project Work</option>
                        <option value="Rent">Rent</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-outline-primary btn-block">Pay</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Maketransaction