import { useState } from "react";
import { connect } from "react-redux";
import {Link } from "react-router-dom";
import axios from "axios";


function Navbar({productSKUs, emptyList})
{
    const [buttonValue, setButtonValue] = useState(window.location.pathname);      

    const sendDataForDelete = (productsSKUs) => {
        if(productSKUs.length === 0) return false;
        axios({
            url : "https://scandapi-production.up.railway.app/delete.php",
            // For testing purpose :
            // url : "https://localhost/api/delete.php",
            method : "POST",
            headers : {"Content-Type": "application/json"},
            data : JSON.stringify(productsSKUs),
        }).then(response => {
            if(response.data.message){
                alert(response.data.message);
            }else{
                window.location.href = "/";
            }
        });
    }

    return <>
        <header id="app-header">
            <div className="logo">
                {buttonValue === "/" ? 'product list' : 'product add'}
            </div>

            {
                buttonValue === "/" && <div className="header-btns">
                <div>
                    <Link to='/add-product' onClick={() => setButtonValue("/add-product")} className="add-btn">  ADD </Link>
                </div>
                {/* { productSKUs.length > 0 && */
                    <div>
                    <button id="delete-product-btn" onClick={() => sendDataForDelete(productSKUs)} className="del-btn"> MASS DELETE </button>
                </div>
                }

             </div>
            }

            {
                buttonValue === "/add-product" && <div className="header-btns">
                <div>
                    <button type="submit" form="product_form" className="add-btn"> Save</button>
                </div>

                <div>
                    <Link to='/' onClick={() => setButtonValue("/")} className="del-btn">  Cancel </Link>
                </div>

             </div>
            }

        </header>
    </>
}

const mapStateToProps = (state) => ({
    productSKUs: state.productsIds 
  });


export default connect(mapStateToProps)(Navbar);