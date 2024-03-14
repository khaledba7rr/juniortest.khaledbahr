import { connect } from "react-redux";

const Product = ({product, addSKU, removeSKU}) => {

    return <>
            <div className="product">   
                <input type="checkbox" onClick={(event) => event.target.checked ? addSKU(product.SKU) : removeSKU(product.SKU)} className="delete-checkbox"></input>
                <p>{product.SKU}</p>
                <p>{product.name}</p>
                <p>{product.price}$</p>
                <p>{product.type} : {product.value} </p>
            </div>
    </>;
}

const mapStateToProps = (state) => ({
    productSKUs: state.productsIds 
  });
  
  const mapDispatchToProps = (dispatch) => ({
    addSKU: (SKU) => dispatch({type : 'addProduct', payload : SKU}),
    removeSKU: (SKU) => dispatch({type : 'removeProduct', payload : SKU}),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Product);