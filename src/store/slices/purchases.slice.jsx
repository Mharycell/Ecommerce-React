import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
});

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases/", getConfig())
        .then(res => {
            console.log(res.data)
            dispatch(setPurchases(res.data.data.purchases))
        })

        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
			.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases/', {}, getConfig)
			.then(() => dispatch(setCart([])))
			.finally(() => dispatch(setIsLoading(false)))
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;


// despachar thunk en el componente
//crear  exportar action
//despachar la acción en el then
//crear el getConfig, colocar lo del localstorage y exportarlo
//colocar el getConfig en el axios del thunk