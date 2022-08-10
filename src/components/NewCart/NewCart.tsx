import React, {FC, useState} from 'react';
import {Button, Dropdown, Form, InputGroup, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectTypes} from "../../redux/slices/types/selectors";
import {selectType} from "../../redux/slices/types/slice";
import {selectUser} from "../../redux/slices/user/selectors";
import {addCart} from "../../redux/slices/desk/slice";
import {selectId} from "../../redux/slices/desk/selectors";

interface INewCart {
    newCartVisible: boolean;
    handleNewCart: () => void;
}

const NewCart: FC<INewCart> = ({
                     newCartVisible,
                     handleNewCart
                 }) => {
    const dispatch = useDispatch();
    const types = useSelector(selectTypes);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const author = useSelector(selectUser);
    const type = types.defaultTypes.indexOf(types.defaultTypes[types.selectedType]);
    const id = useSelector(selectId);
    const newCart = {
        author: author.name,
        title,
        description,
        type,
        comments: [],
        id
    }
    const createCart = (item) => {
        dispatch(addCart(item));
        setTitle('');
        setDescription('');
    }
    return (
        <Modal show={newCartVisible} onHide={handleNewCart}>
            <Modal.Header closeButton>
                <Modal.Title>Create a new cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Choose cart type:</h5>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {
                            types.types[types.selectedType]
                        }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            types.types.map((type, id) =>
                                <Dropdown.Item key={id}
                                               onClick={() => dispatch(selectType(id))}>
                                    {type}
                                </Dropdown.Item>)
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <InputGroup className="mt-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Title
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </InputGroup>
                <InputGroup className="mt-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Description
                    </InputGroup.Text>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleNewCart}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    handleNewCart();
                    createCart(newCart);
                }}>
                    Create cart
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewCart;