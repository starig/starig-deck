import React, {FC, useEffect, useState} from 'react';
import {Button, Col, Container, InputGroup, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/slices/user/selectors";
import {changeUserName} from "../../redux/slices/user/slice";
import NamePopup from "./NamePopup";
import NewCart from "../NewCart/NewCart";

const Header: FC = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState<string>(user.name);
    const [newCartVisible, setNewCartVisible] = useState<boolean>(false);
    const handleNewCart = () => setNewCartVisible(!newCartVisible);
    useEffect(() => {
        dispatch(changeUserName(userName));
    }, [userName])

    const onChangeInput = (username: string) => {
        setUserName(username);
    }
    return (
        <>
            <NamePopup setUserName={setUserName} currentUserName={userName}/>
            <Container fluid={false}>
                <Row xs={'auto'} className={'align-items-center justify-content-center'}>
                    <Col>
                        <InputGroup className="mb-3 mt-3 font-monospace" size="lg">
                            <Form.Control
                                className='w-auto border-0'
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={userName}
                                onChange={(e) => onChangeInput(e.target.value)}
                            />

                        </InputGroup>
                    </Col>
                    <Col className={''}>
                        <Button variant="primary" onClick={handleNewCart}>
                            New cart +
                        </Button>
                        <NewCart handleNewCart={() => setNewCartVisible(!newCartVisible)} newCartVisible={newCartVisible}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Header;