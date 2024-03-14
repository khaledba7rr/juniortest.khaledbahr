import { useState } from "react";

import axios from "axios";

function AddProduct(){
    let [type , setType] = useState('');

    let [errorMessage, setErrorMessage] = useState(undefined);

    const getCurrentValue = (typeName, formData) => {
        if(typeName === "dvd"){
            return formData.get("size");
        }
        else if(typeName === "book"){
            return formData.get("weight");
        }
        else{
            return `${formData.get("height")}x${formData.get("width")}x${formData.get("length")}`;
        }
    }

    const specialDataValidation = (type, form) => {

        let formData = new FormData(form);

        if(type === null) return true; 

        if(type === "book"){
            return formData.get("weight").trim().length === 0 ? true : false; 
        }
        if(type === "dvd"){
            return formData.get("size").trim().length === 0 ? true : false; 
        }
        if(type === "furniture"){
            if(formData.get("height").trim().length === 0 || formData.get("width").trim().length === 0 || formData.get("length").trim().length === 0){
                console.log("right !");
                return true;
            }
            else {
                return false;
            }
        }

        return true;
    }

    const onChangeOption = (value) => {
        type = setType(value);
        console.log(value);
    }

    const addNewProduct = (event) => {
        event.preventDefault();

        errorMessage = setErrorMessage(undefined);

        const formData = new FormData(event.target);

        if(formData.get('type') === null){
            errorMessage = setErrorMessage("Please, submit required data");
            return false;
        }

        if( formData.get("SKU").trim().length === 0 || formData.get("name").trim().length === 0 ||
         formData.get("price").trim().length === 0 || formData.get('type').trim().length === 0 || specialDataValidation( formData.get("type") , event.target)){

            errorMessage = setErrorMessage("Please, submit required data");
            return false;
        }

        const params = new URLSearchParams();

        params.append("SKU", formData.get("SKU"));
        params.append("name", formData.get("name"));
        params.append("price", formData.get("price"));
        params.append("type", formData.get("type"));
        params.append("value", getCurrentValue(formData.get("type"), formData));

        axios.post("https://scandapi-production.up.railway.app/", params)
        .then( async response => {
            if(!response.data.code){
                errorMessage = setErrorMessage(response.data.message);
            }
            else{
                window.location.href = "/";
            }
        });
    }

    let handleChange = () => {
    }

    return <>
            <div className="add-product-title">
                <h2>add new product</h2>
            </div>

            {errorMessage && 
                <div className="error-message">
                    <p>{errorMessage} </p>
                </div>
            }
        <div className="add-product-container">

            <form id="product_form" onSubmit={addNewProduct} onChange={handleChange}>

                <div className="input-container">
                    <label htmlFor="sku" >SKU </label>
                    <input id="sku" name="SKU" type="text" placeholder="#SKU" required />
                </div>

                <div className="input-container ">
                    <label htmlFor="name" >Name</label>
                    <input id="name" name="name" type="text" placeholder="Name" required />
                </div>

                <div className="input-container ">
                    <label htmlFor="price" >Price</label>
                    <input id="price" name="price" type="number" step="0.01" min="0" placeholder="Price" required />
                </div>

                <div className="input-container ">

                    <label>Type</label>

                    <select name="type" id="productType" onChange={ event => onChangeOption(event.target.value)  } >
                        <option selected disabled value="">SELECT</option>
                        <option  value="dvd" >DVD</option>
                        <option  value="book" >Book</option>
                        <option  value="furniture" >Furniture</option>

                    </select>

                </div>

                <div className={`special-type-data d-none ${type === 'dvd' && 'show-type' }`}>
                    <p>please, provide the disk size in megabytes.</p>

                    <div className="input-container">
                        <label htmlFor="size" >Size(MB)</label>
                        <input id="size" name="size" type="number" min="0" placeholder="Size (MB)" required={type === 'DVD-disc' ? true : false}/>
                    </div>

                </div>

                <div className={`special-type-data d-none ${type === 'book' && 'show-type' }`}>
                    <p>please, provide the book weight in kilograms.</p>

                    <div className="input-container">
                        <label htmlFor="weight" >Weight(KG)</label>
                        <input id="weight" name="weight" type="number" min="0" placeholder="Weight (KG)" required={type === 'Book' ? true : false} />
                    </div>

                </div>

                <div className={`special-type-data d-none ${type === 'furniture' && 'show-type'}`}>

                    <p>please, provide dimensions in HxWxL format.</p>

                    <div className="input-container">
                        <label htmlFor="height" >Height (CM)</label>
                        <input id="height" name="height" type="number" min="0" placeholder="Height (CM)" required={type === 'Furniture' ? true : false} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="width" >Width (CM)</label>
                        <input id="width" name="width" type="number" min="0" placeholder="width (CM)" required={type === 'Furniture' ? true : false} />
                    </div>

                    <div className="input-container">
                        <label htmlFor="length" >Length (CM)</label>
                        <input id="length" name="length" type="number" min="0" placeholder="Length (CM)" required={type === 'Furniture' ? true : false}  />
                    </div>
                </div>

                {/* <div className="submit-btn">
                    <button type="submit" name="submit_button" >Save</button>
                </div> */}
            </form>
        </div>  

    </>
}



export default AddProduct;