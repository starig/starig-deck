import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

interface INamePopup {
    setUserName: (value: string) => void;
    currentUserName: string;
}

const NamePopup: FC<INamePopup> = ({setUserName, currentUserName}) => {
    const [show, setShow] = useState<boolean>(currentUserName === null);
    const [localValue, setLocalValue] = useState<string>('');
    useEffect(() => {
        setShow(currentUserName === '');
    }, [currentUserName])

    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)} placement={'top'}>
                <Modal.Body>
                    <Form>
                        <Form.Group className={'mb-3'}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type={'string'} placeholder={'Enter your username'} value={localValue}
                                          onChange={(e) => setLocalValue(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => setUserName(localValue)}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default NamePopup;