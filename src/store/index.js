import { configureStore } from "@reduxjs/toolkit";
import productsIdsReducer from "../Redux/reducers";



const store = configureStore({
    reducer : productsIdsReducer
});

export default store;