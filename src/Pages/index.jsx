import { useEffect, useState } from "react";
import axios from "axios";

import Product from "../Components/Product";
import { connect } from "react-redux";


function Index({emptyList}) 
{
    let [products, setProducts] = useState([]);
    let [errorMessage, setErrorMessage] = useState(undefined);

    const getProducts = () => {

        errorMessage = setErrorMessage(undefined);

        axios.get("https://scandapi-production.up.railway.app/")
        .then(response => {
            if(response.data.message || !response){
                errorMessage = setErrorMessage(response.data.message);
            }else{
                products = setProducts(response.data);
            }
        }).catch(e => {
            errorMessage = setErrorMessage(e);
        });;
    }

    useEffect( () => {
        getProducts();
        return () => {
            emptyList();
        } 
        // eslint-disable-next-line
    }, []);

    return <>
        
        { errorMessage && 
                <div className="error-message">
                    <p>{errorMessage} </p>
                </div>
        }

        <div className="products-container">

            {products.length > 0 ? products.map( product => {
                return <Product key={product.SKU} product={product} />
            }) : <div className="text-center no-data-exist"> No products exist</div> }

        </div>

    </>
}

const mapStateToProps = (state) => ({
    productSKUs: state.productsIds 
  });
  
  const mapDispatchToProps = (dispatch) => ({
    emptyList: () => dispatch({type : 'emptyList'}),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Index);