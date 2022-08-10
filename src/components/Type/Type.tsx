import React, {FC, useState} from 'react';
import {Form, InputGroup} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {changeTypeName, selectType} from "../../redux/slices/types/slice";

interface IType {
    type: string;
    id: number;
}

const Type: FC<IType> = ({
    type,
    id
              }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>(type)
    const renameType = (name: string, typeNumber: number) => {
        dispatch(selectType(typeNumber));
        dispatch(changeTypeName(name));
        setValue(name);

    }

    return (
        <InputGroup>
            <Form.Control
                className='w-auto border border-primary'
                onChange={(e) => renameType(e.target.value, id)}
                value={value}
            />
        </InputGroup>
    )
}

export default Type;