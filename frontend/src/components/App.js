import { element } from "prop-types";
import React,{useEffect} from "react";
import  ReactDOM  from "react-dom";
import axios from "axios";
import Table from "./usercomponent/table"
import Friendlist from "./usercomponent/Friendlist";

function Hello(){
      return (
        <div><Friendlist /></div>
      )
}

ReactDOM.render(<Hello />,document.getElementById('app'))