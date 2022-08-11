import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const defaultTypes = ['TODO', 'In Progress', 'Testing', 'Done'];
if (localStorage.getItem('types') === null) {
    localStorage.setItem('types', JSON.stringify(defaultTypes))
}
const initialTypes = JSON.parse(localStorage.getItem('types'));

const initialState = {
    types: initialTypes,
    defaultTypes: defaultTypes,
    selectedType: 0,
}


export const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        changeTypeName: (state, action: PayloadAction<string>) => {
            if (action.payload !== '') {
                state.types[state.selectedType] = action.payload;
                localStorage.setItem('types', JSON.stringify(state.types));
            } else {
                alert('ERROR: empty type name');
            }

        },
        selectType: (state, action: PayloadAction<number>) => {
            state.selectedType = action.payload
        }
    }
})

export const { changeTypeName, selectType } = typesSlice.actions

export default typesSlice.reducer