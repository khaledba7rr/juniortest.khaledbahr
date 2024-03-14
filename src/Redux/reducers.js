
const initalState = {
    productsIds : [],
};


const productsIdsReducer = (state = initalState, action) => {
    switch(action.type){
            case 'addProduct' :
                return {...state.productsIds, productsIds : state.productsIds.concat(action.payload) }
            case 'removeProduct' :
                return {...state.productsIds, productsIds : state.productsIds.filter(item => item !== action.payload) }
            case 'emptyList' :
                return {...state.productsIds, productsIds : [] }
            default:
                return state;
    }
}


export default productsIdsReducer;