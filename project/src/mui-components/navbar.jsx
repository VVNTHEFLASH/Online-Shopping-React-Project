import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import "../mui-components/navbar.css";

export default class Navbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchedProduct: "",

    }
  }


  render() {
    return (
      <>
          <div className='navbar'>
            <div className='navbar-title'>
                <h1>Online Super Market</h1>
            </div>
            <div className='navbar-search'>
                <TextField varient='outlined'
                id='search-bar' label='Search'
                onChange={this.props.search} />
                
            </div>
          </div>
      </>
    )
  }
}
