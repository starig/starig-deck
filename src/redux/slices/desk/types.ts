export interface IComment {
    comment: string,
    author: string;
    cartId: number;
}

export interface ICart {
    id: number;
    author: string;
    title: string;
    description: string;
    type: number;
    comments: IComment[];
}

export interface DeskSliceState {
    carts: ICart[];
    id: number
}