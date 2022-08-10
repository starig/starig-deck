import {RootState} from "../../store";

export const selectCarts = (state: RootState) => state.desk.carts;
export const selectId = (state: RootState) => state.desk.id;