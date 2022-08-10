import React, {FC, useState} from 'react';
import {ICart} from "../../redux/slices/desk/types";
import {Badge, Button, Card, Col, Container, InputGroup, Modal, Row} from "react-bootstrap";
import Comment from "./Comment";
import {useDispatch, useSelector} from "react-redux";
import {addComment, editCart} from "../../redux/slices/desk/slice";
import Form from "react-bootstrap/Form";
import {selectUser} from "../../redux/slices/user/selectors";
import {selectTypes} from "../../redux/slices/types/selectors";

const Cart: FC<ICart> = ({
                             id,
                             author,
                             title,
                             description,
                             comments,
                             type
                         }) => {
    const [show, setShow] = useState<boolean>(false);
    const [localTitle, setLocalTitle] = useState<string>(title);
    const [localDescription, setLocalDescription] = useState<string>(description);
    const [commentMessage, setCommentMessage] = useState<string>('');
    const dispatch = useDispatch();
    const onChangeCart = () => {
        dispatch(editCart({
            title: localTitle,
            author,
            description: localDescription,
            id,
            type,
            comments
        }))
        setShow(false);
    }
    const currentUser = useSelector(selectUser);
    const types = useSelector(selectTypes);

    const postComment = (message) => {
        dispatch(addComment({comment: message, author: currentUser.name, cartId: id}));
        setCommentMessage('');
    }
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Container>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3 mt-3 font-monospace" size="lg">
                                        <Form.Control
                                            className='w-auto border-0'
                                            placeholder="Username"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            value={localTitle}
                                            onChange={(e) => setLocalTitle(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <Row className={'mb-3'}>
                                        <Badge>
                                            @{author}
                                        </Badge>
                                    </Row>
                                    <Row>
                                        <Badge bg={'success'}>
                                            {types.types[type]}
                                        </Badge>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <InputGroup className="mb-3 mt-3 font-monospace" size="lg">
                                <Form.Control
                                    className='w-auto border-0'
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={localDescription}
                                    onChange={(e) => setLocalDescription(e.target.value)}
                                />
                            </InputGroup>
                        </Row>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Write your comment"
                                aria-label="Comment"
                                aria-describedby="basic-addon2"
                                value={commentMessage}
                                onChange={(e) => setCommentMessage(e.target.value)}
                            />
                            <Button variant="outline-secondary" id="button-addon2"
                                    onClick={() => postComment(commentMessage)}>
                                Add a comment
                            </Button>
                        </InputGroup>
                        <h5>
                             {comments.length > 0 && 'Comments (' + comments.length + ')'}
                        </h5>
                        {
                            comments.map((item, id) => <Comment key={id}
                                                                comment={item.comment}
                                                                cartId={item.cartId}
                                                                author={item.author}/>)
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onChangeCart}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card className={'mt-2'}>
                <Card.Header>
                    <Container>
                        <Row>
                            <Col>
                                <Card.Title><h3>{title}</h3></Card.Title>
                                <Card.Subtitle>@{author}</Card.Subtitle>
                            </Col>
                        </Row>
                    </Container>

                </Card.Header>
                <Card.Body>
                    <Button variant="primary"
                            onClick={() => setShow(true)}>Open
                        Cart</Button>
                </Card.Body>
            </Card>
        </>

    )
}

export default Cart;