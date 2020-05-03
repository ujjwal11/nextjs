import React from 'react'
import Shipping from '../../components/layout/shipping'

const ShippingView = props => {
    return (
        <Shipping shippingMethod={props.shippingMethod}/>
    )
}

export default ShippingView