import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {selectCarts} from "../../redux/slices/desk/selectors";
import Cart from "../Cart/Cart";

const TodoCarts: FC = () => {
    const carts = useSelector(selectCarts);
    return (
        <div>
            {
                carts.map((item, id) => item.type === 0 &&
                    <Cart author={item.author} title={item.title} description={item.description} key={id}
                          type={item.type} comments={item.comments} id={id}/>)
            }
        </div>
    )
}

export default TodoCarts;