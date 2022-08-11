import React, {FC, useState} from 'react';
import {InputGroup, Toast} from "react-bootstrap";
import {IComment} from "../../redux/slices/desk/types";
import {useDispatch} from "react-redux";
import {deleteComment, editComment} from "../../redux/slices/desk/slice";
import Form from "react-bootstrap/Form";


const Comment: FC<IComment> = ({
                                   comment,
                                   author,
                                   cartId

                               }) => {
    const [commentText, setCommentText] = useState<string>(comment);
    const dispatch = useDispatch();
    const updateComment = (text) => {
        dispatch(editComment({
            comment,
            newValue: text,
            author,
            cartId
        }));
    }
    const removeComment = () => {
        dispatch(deleteComment({
            comment,
            author,
            cartId
        }))
    }
    return (
        <Toast className={'mb-3'} onClose={removeComment}>
            <Toast.Header>
                <strong className="me-auto">Comment by @{author}</strong>
            </Toast.Header>
            <Toast.Body>
                <InputGroup className="mb-3 mt-3 font-monospace" size="sm">
                    <Form.Control
                        className='w-auto border-0'
                        placeholder="Comment"
                        aria-label="Comment"
                        aria-describedby="basic-addon1"
                        onBlur={() => {
                            updateComment(commentText);
                        }}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                </InputGroup>
            </Toast.Body>

        </Toast>
    )
}

export default Comment;