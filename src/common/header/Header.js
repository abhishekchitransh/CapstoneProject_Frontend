import React, { Component } from "react";
import "./Header.css";
import * as Constants from "../Constants";
import * as Utils from "../Utils";
import * as UtilsUI from "../UtilsUI";
import { withStyles } from "@material-ui/core/styles";

class Header extends Component{
render(){
  const { classes } = this.props;

    return (      
        <div className="header-main-container">
          Food Ordering App         
        </div>      
    );
  }
}
export default Header;
