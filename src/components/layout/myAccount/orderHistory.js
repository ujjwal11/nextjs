import React from 'react'
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';


const OrderHistory = () => {
    return(
        <Container className="myAccountContainerHeading">
            <h5>
                Your Orders
            </h5><hr />
            You have no recent orders...
        </Container>
    )
}

export default OrderHistory