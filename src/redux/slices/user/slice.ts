import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "./types";

let initialName = '';

if (localStorage.getItem('userName') !== null) {
    initialName = localStorage.getItem('userName');
}

const initialState: IUser = {
    name: initialName,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserName: (state, action: PayloadAction<string>) => {
            if (action.payload !== '') {
                state.name = action.payload;
                localStorage.setItem('userName', action.payload);
            } else {
                alert('ERROR: empty username')
            }
        }
    }
});

export const {changeUserName} = userSlice.actions;

export default userSlice.reducer;