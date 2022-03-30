import React, { Component } from 'react';
import "../mui-components/body.css";
import products from "../resources/products.json";
// import pen from "../images/pen.png";


export default class Body extends Component {

    constructor(){
        super();
        this.state = {
            product: {...products}
      }
    }
        // console.log(products)
        // {
        //   name: 'Pen', type: 'stationary', imgUrl: '', price: 10
        // }
    renderProduct = () => {
      return(
        <>
        {products.map((item,key) => {
          return(
            <div className='Card' key={key}> 
            <div className='Card-Media'>
              <img src={item.imgUrl} alt="Product" />
            </div>
            <div className='Card-Content'>
              <strong>{item.name}</strong>
              <p>${item.price}</p>
            </div>
            <div className='Card-Footer'>
              <button>Buy Now</button>
              <button>Add To Cart</button>
            </div>
          </div>
          )
        })}

        </>
      )
    }

  render() {
    return (
      <>
        <div className='body-grid'>
            <div className='products'>
                <div className='product-head'>
                  <h2>Products</h2>
                </div>
                <div className='renderedProducts'>
                  <this.renderProduct />
                </div>
            </div>
            <div className='filters'>
                <div><h4>Filters</h4></div>
            </div>
        </div>
      </>
    )
  }
}
