import React, { Component } from 'react';
import "../mui-components/body.css";
import products from "../resources/products.json";

export default class Body extends Component {

    constructor(){
        super();
        this.state = {
            product: {...products}
        }
        console.log(this.state.product)
    }
  render() {
    return (
      <>
        <div className='body-grid'>
            <div className='products'>
                <div><h2>Products</h2></div>
                {/* {this.renderProduct} */}
            </div>
            <div className='filters'>
                <div><h4>Filters</h4></div>
            </div>
        </div>
      </>
    )
  }
}
