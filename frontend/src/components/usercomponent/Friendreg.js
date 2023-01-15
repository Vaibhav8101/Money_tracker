import { Axios } from 'axios';
import React, { useState } from 'react'
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
const Friendreg = () => {
  const url = `http://localhost:8000/Tracker/v1/friend-create/`
  const [data, setData] = useState({
    name: "",
    email_id: "",
    state: "",
    address: "",
    mobile_num: ""

  })

  function submit(e) {
    e.preventDefault();
    axios.post(url, {
      user: 0,
      name: data.name,
      email_id: data.email_id,
      state: data.state,
      address: data.address,
      mobile_num: data.mobile_num
    }).then(res => {
      console.log(res.data)
    })
  }
  function handle(e) {
    const updata = { ...data }
    updata[e.target.id] = e.target.value
    setData(updata)
    // console.log(updata)

  }

  return (
    <div><section className="vh-100" id="newfriend">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">


                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add Friend</p>

                <form className="mx-1 mx-md-4" onSubmit={(e) => submit(e)}>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="name" onChange={(e) => handle(e)} value={data.name} className="form-control" placeholder='Enter Friend Name' />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">

                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="email_id" onChange={(e) => handle(e)} value={data.email_id} className="form-control" placeholder='Enter email' />

                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="state" onChange={(e) => handle(e)} value={data.state} className="form-control" placeholder='Enter state' />

                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">

                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="address" onChange={(e) => handle(e)} value={data.address} className="form-control" placeholder='Enter address' />

                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="number" id="mobile_num" onChange={(e) => handle(e)} value={data.mobile_num} className="form-control" placeholder='Mobile Number' />

                    </div>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className="btn btn-outline-primary btn-lg">Add Friend</button>
                  </div>

                </form>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section></div>
  )
}

export default Friendreg