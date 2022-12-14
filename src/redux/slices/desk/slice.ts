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
            if (action.payload.title !== '' && action.payload.description !== '') {
                state.carts = [...state.carts, action.payload];
                state.id++;
                localStorage.setItem('id', JSON.stringify(state.id));
                localStorage.setItem('carts', JSON.stringify(state.carts));
            } else {
                alert('ERROR: empty title or description')
            }
        },
        editCart: (state, action: PayloadAction<ICart>) => {
            if (action.payload.title !== '' && action.payload.description !== '') {
                state.carts[action.payload.id] = action.payload;
                localStorage.setItem('carts', JSON.stringify(state.carts));
            } else {
                alert('ERROR: empty title or description')
            }
        },
        deleteCart: (state, action: PayloadAction<ICart>) => {
            const carts = [...state.carts];
            const cartIndex = action.payload.id;
            carts.splice(cartIndex, 1);
            state.carts = carts;
            localStorage.setItem('carts', JSON.stringify(state.carts));
        },
        addComment: (state, action: PayloadAction<IComment>) => {
            if (action.payload.comment !== '') {
                state.carts[action.payload.cartId].comments = [...state.carts[action.payload.cartId].comments, action.payload];
                localStorage.setItem('carts', JSON.stringify(state.carts));
            } else {
                alert('ERROR: empty comment')
            }
        },
        editComment: (state, action: PayloadAction<IComment>) => {
            function findIndexOfComment(comment) {
                return comment.comment === action.payload.comment
            }

            if (action.payload.comment !== '') {
                const comments = state.carts[action.payload.cartId].comments;
                const commentIndex = comments.findIndex(findIndexOfComment);
                comments[commentIndex].comment = action.payload.newValue;
                localStorage.setItem('carts', JSON.stringify(state.carts));
            } else {
                alert('ERROR: empty comment')
            }

        },
        deleteComment: (state, action: PayloadAction<IComment>) => {
            const comments = state.carts[action.payload.cartId].comments;

            function findIndexOfComment(comment) {
                return comment.comment === action.payload.comment
            }

            const commentIndex = comments.findIndex(findIndexOfComment);
            comments.splice(commentIndex, 1);
            localStorage.setItem('carts', JSON.stringify(state.carts));
        }
    }
});

export const {addCart, editCart, addComment, editComment, deleteCart, deleteComment} = deskSlice.actions;

export default deskSlice.reducer;