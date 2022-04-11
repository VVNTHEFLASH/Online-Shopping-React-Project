import React, { Component } from 'react';
import "../mui-components/body.css";
import products from "../resources/products.json";
import Navbar from '../mui-components/navbar';
// import pen from "../images/pen.png";
import ReactDOM from 'react-dom';


export default class Body extends Component {

    constructor(props){
        super(props);
        this.state = {
            AddtoCart: [],
            product: [...products],
            checked: false,
            filter: "none",
            filterList: [
              {
                id: 11,
                name: "stationary",
                value: "stationary"
              },
              {
                id: 12,
                name: "groceries",
                value: "groceries"
              },
              {
                id: 13,
                name: "snacks",
                value: "snacks"
              },
              {
                id: 14,
                name: "sports",
                value: "sports"
              }
            ],
            activeFilter: [],
           
      };
      this.cartStorage = [];
      this.TotalPrice = parseInt(0);
    }

    createCartStorage = (Productname, Productprice, Productquantity) => {
      this.cartStorage.push({
        name: Productname,
        price: Productprice * Productquantity,
        quantity: Productquantity,
      });
    }

    AddtoCartHandler = e => {
      let ProductName = e.target.value;
      let list = products;

      for(let i=0;i<list.length;i++){
        if(list[i].name === ProductName){
          this.TotalPrice += list[i].price;
          var nameFoundInMainList = 0;
          for(let i=0;i<this.cartStorage.length;i++){
            if(this.cartStorage[i].name === ProductName){
              nameFoundInMainList = 1;
              this.cartStorage[i].quantity += 1;
              break;
            }
          }
          if(nameFoundInMainList === 0){
            this.createCartStorage(ProductName, list[i].price, 1)
          }
          break;
        }
      }
      this.renderCartList();
    }

    removeItemFromCart = e => {
      console.log(e.target.value, " is Deleted")
      var temp = [];
      this.TotalPrice = parseInt(0);
      for(let i = 0; i<this.cartStorage.length; i++){
        if(e.target.value !== this.cartStorage[i].name){
          temp.push(this.cartStorage[i])
          this.TotalPrice += this.cartStorage[i].price;
        }
      }
      this.cartStorage = temp;
      this.renderCartList();
    }
    renderCartList = () => {
      // console.log(this.state.cartStorage);
          const MapofList = this.cartStorage.map((item,key) => {
            return(
              <tr key={key}>
                <td>
                  <label>{item.name}</label>
                  <button onClick={this.removeItemFromCart} value={item.name} className='removeBtn'>Remove item</button>
                </td>
                <td>{item.quantity}</td>
                <td>${item.price * item.quantity}</td>
              </tr>
            )
          })

      ReactDOM.render(
        <>
            {MapofList}
        </>,document.getElementById('list')
      );
      ReactDOM.render(
        <>
          ${this.TotalPrice}
        </>,
        document.getElementById('totalPrice')
      )
    }

    buyNowHandler = () => {
      if(this.TotalPrice === 0){
        alert("Please Add Some Product to the Cart")
      }
      else{
        alert(`Your Order is Placed, And You Have to Pay ${this.TotalPrice} on Delivery`)
      }
    }


    onFilterChange(filter) {
      const { filterList, activeFilter } = this.state;
      if (filter === "ALL") {
        if (activeFilter.length === filterList.length) {
          this.setState({ activeFilter: [] });
        } else {
          this.setState({ activeFilter: filterList.map(filter => filter.value) });
        }
      } else {
        if (activeFilter.includes(filter)) {
          const filterIndex = activeFilter.indexOf(filter);
          const newFilter = [...activeFilter];
          newFilter.splice(filterIndex, 1);
          this.setState({ activeFilter: newFilter });
        } else {
          this.setState({ activeFilter: [...activeFilter, filter] });
        }
      }
    }
    // ---------------------------------------------------------
        // console.log(products)
        // {
        //   name: 'Pen', type: 'stationary', imgUrl: '', price: 10
        // }
    
    search = e => {
      const list = e.target.value;
      this.setState(() => {
        return {
          product: products.filter(item => {
            if(item.name.toLowerCase().includes(list.toLowerCase()))
            {
              return true;
            }
            else{
              return false;
            }
          }).map(item => item)
        }
      })
    }
// TO Handle to Check Box
    // handleCheckbox = (e) => {
    //   if (this.state.filter === e.target.value) this.setState({ filter: "none" });
    //   else this.setState({ filter: e.target.value, checked: true });
    // };
// Let Makes own Function for checkbox
    handleOwnCheckBox = e => {
      // let productList = this.state.product;

        this.setState(() => {
          return {
            product: products.filter(item => {
              if(item.type === e.target.value ){
                return true;
              }
              else{
                return false;
              }
            }).map(item => item)
          }
        })
      }



    renderProduct = (filteredList) => {
      return(
        <>
        {filteredList.map((item,key) => {
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
              {/* <button>Buy Now</button> */}
              <button value={item.name} onClick={this.AddtoCartHandler}>Add To Cart</button>
            </div>
          </div>
          )
        })}
        </>
      )
    }


  render() {
    // ------------------------------------------------------------------
    const { filterList, activeFilter } = this.state;
    let filteredList;
    if (
      activeFilter.length === 0 ||
      activeFilter.length === filterList.length
    ) {
      filteredList = this.state.product;
    } else {
      filteredList = this.state.product.filter(item =>
        this.state.activeFilter.includes(item.type)
      );
    }

// --------------------------------------------------------------
    return (
      <>
      {/* Linking Navbar data to Body Component */}
        <Navbar {...this.state} search={this.search}/>
        <div className='body-grid'>
            <div className='products'>
                <div className='product-head'>
                  <h2>Products</h2>
                </div>
                <div className='renderedProducts'>
                  {this.renderProduct(filteredList)}
                </div>
            </div>
            {/* Filter Inputs */}
            <div className='filters'>
              {/* ---------------- */}
            <div className="searchContainer">
              <div className="filter-container">
          <label htmlFor="myInput">All</label>
          <input
            id="myInput"
            type="checkbox"
            onClick={() => this.onFilterChange("ALL")}
            defaultChecked={activeFilter.length === filterList.length}
          />
          {this.state.filterList.map(filter => (
            <React.Fragment>
              <label htmlFor={filter.id}>{filter.name}</label>
              <input
                id={filter.id}
                type="checkbox"
                defaultChecked={activeFilter.includes(filter.value)}
                onClick={() => this.onFilterChange(filter.value)}
              />
            </React.Fragment>
          ))}
        {/* <ul style={{ marginLeft: "70px" }}>
          {filteredList.map(item => (
            <div key={item.id}>
              <li>
                {item.name} -- {item.type}
              </li>
            </div>
          ))}
        </ul> */}
        <div>
          <div className='listCart'>
            {/* {this.renderCartList} */}
            <table className='cartmenu'>
              <thead>
                <tr>
                  <th colSpan={3}>Cart</th>
                </tr>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody id='list'>

              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <td colSpan={2} id="totalPrice">{this.TotalPrice}</td>
                </tr>
                <tr id='buynowRow'>
                  <td colSpan={3}><button id='buynow' onClick={this.buyNowHandler}>Buy Now</button></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        </div>
      </div>
      {/* --------------- */}
                {/* <div><h4>Filters</h4></div> <br />
                <div>
                  <div className='fByType'>
                    <strong>Filter By Type</strong>
                    <div>
                    <input type="checkbox" 
                    name='type' 
                    id='' value="stationary" 
                    onClick={this.handleOwnCheckBox} 
                    />Stationary <br />
                    <input type="checkbox"
                    name='type' id='' 
                    value="groceries" 
                    onClick={this.handleOwnCheckBox} 
                    />Groceries <br />
                    <input type="checkbox"
                    name='type' id='' 
                    value="snacks" 
                    onClick={this.handleOwnCheckBox}
                    />Snacks <br />
                    <input type="checkbox"
                    name='type' id='' 
                    value="sports" 
                    onClick={this.handleOwnCheckBox}
                    />Sport <br />
                    </div>
                  </div>
                  <div>
                    <strong>Filter By Price</strong>
                    <div>
                      <input type="checkbox" name="price" id="" />$0 - $10 <br />
                      <input type="checkbox" name="price" id="" />$11 - $100 <br />
                      <input type="checkbox" name="price" id="" />$111 - $1000 <br />
                      <input type="checkbox" name="price" id="" />$1111 - $3000 <br />
                      <input type="checkbox" name="price" id="" />$3001 - $5000 <br />
                      <input type="checkbox" name="price" id="" />$5000 Above <br />
                    </div>
                  </div>
                </div> */}
            </div>
        </div>
      </>
    )
  }
}
