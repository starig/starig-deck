import {DeskSliceState, ICart, IComment} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let defaultCarts = [];
if (localStorage.getItem('carts') === null) {
    localStorage.setItem('carts', JSON.stringify([]))
} else {
    defaultCarts = [JSON.parse(localStorage.getItem('carts'))];
}

const initialCarts = JSON.parse(localStorage.getItem('carts'));
let initialId;
if (JSON.parse(localStorage.getItem('id')) === null) {
    initialId = 0;
} else {
    initialId = JSON.parse(localStorage.getItem('id'));
}


const initialState: DeskSliceState = {
    carts: initialCarts,
    id: initialId,
}


export const deskSlice = createSlice({
    name: 'desk',
    initialState,
    reducers: {
        addCart: (state, action: PayloadAction<ICart>) => {
            state.carts = [...state.carts, action.payload];
            state.id++;
            localStorage.setItem('id', JSON.stringify(state.id));
            localStorage.setItem('carts', JSON.stringify(state.carts));
        },
        editCart: (state, action: PayloadAction<ICart>) => {
            state.carts[action.payload.id] = action.payload;
        },
        addComment: (state, action: PayloadAction<IComment>) => {
            state.carts[action.payload.cartId].comments = [...state.carts[action.payload.cartId].comments, action.payload];
            localStorage.setItem('carts', JSON.stringify(state.carts));
        },
        editComment: (state, action: PayloadAction<string>) => {

        }
    }
});

export const { addCart, editCart, addComment } = deskSlice.actions;

export default deskSlice.reducer;