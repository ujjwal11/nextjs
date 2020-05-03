import React, { Component } from 'react';
import Cart from "../../components/layout/cart"


class CartView extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }

    render() {
        return (
            <Cart />
        );
    }
}

export default CartView