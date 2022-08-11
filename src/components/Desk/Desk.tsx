import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import {selectTypes} from "../../redux/slices/types/selectors";
import Type from "../Type/Type";
import TodoCarts from "./TodoCarts";
import InProgressCarts from "./InProgressCarts";
import TestingCarts from "./TestingCarts";
import DoneCarts from "./DoneCarts";

const Desk: FC = () => {
    const {types} = useSelector(selectTypes);
    console.log(types)

    return (
        <Container>
            <Row>
                {
                    types.map((type: string, id: number) => <Col key={id}>
                        <Type type={type} id={id}/>
                        {
                            id === 0 && <TodoCarts />
                        }
                        {
                            id === 1 && <InProgressCarts />
                        }
                        {
                            id === 2 && <TestingCarts />
                        }
                        {
                            id === 3 && <DoneCarts />
                        }
                    </Col>)
                }
            </Row>
        </Container>
    )
}

export default Desk;