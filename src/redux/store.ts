import { configureStore } from '@reduxjs/toolkit';
import deskSlice from "./slices/desk/slice";
import userSlice from "./slices/user/slice";
import typesSlice from "./slices/types/slice";

export const store = configureStore({
    reducer: {
        desk: deskSlice,
        user: userSlice,
        types: typesSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;