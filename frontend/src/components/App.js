import { element } from "prop-types";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Table from "./usercomponent/table"
import Friendlist from "./usercomponent/Friendlist";
import TransactionList from "./usercomponent/Transaction";
import Friendreg from "./usercomponent/Friendreg";
import Maketransaction from "./usercomponent/Maketransaction";
import Update_trans from "./usercomponent/Update_trans";
import Friend_group_table from "./usercomponent/Friend_group_table";
import Friend_group_list from "./usercomponent/Friend_group_list";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Friend_group_add from "./usercomponent/Friend_group_add";
import DisplayAmount from "./usercomponent/DisplayAmount";

function Hello() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/react" element={
          <div className="container">
            <div className="row">
              <div className="container"><DisplayAmount /></div>
            </div>
            <div className="row">
              <div className="col"><Friendlist /></div>
              <div className="col"><TransactionList /></div>
            </div>
            <div className="row">
              <div className="col"><Friendreg /></div>
              <div className="col"><Maketransaction /></div>
            </div>
          </div>} />
        <Route path="/react/update_t/:id" element={
          <div className="container">
            <div className="row">
              <div className="col"><Friend_group_list /></div>
              <div className="col"><Friend_group_add /></div>
            </div>
            <div className="row">
              <div className="col"><Update_trans /></div>
            </div>
          </div>} />
        <Route path="/react/friend-trans-detail/:id" element={<Friend_group_list />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<Hello />, document.getElementById('app'))