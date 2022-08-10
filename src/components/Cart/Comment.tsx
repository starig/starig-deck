import React, {FC} from 'react';
import {Toast} from "react-bootstrap";
import {IComment} from "../../redux/slices/desk/types";


const Comment: FC<IComment> = ({
    author,
    comment
                               }) => {

    return (
        <Toast className={'mb-3'}>
            <Toast.Header>
                <strong className="me-auto">{author}</strong>
            </Toast.Header>
            <Toast.Body>{comment}</Toast.Body>
        </Toast>
    )
}

export default Comment;