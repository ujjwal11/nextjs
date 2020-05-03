import React from 'react'
import {connect} from 'react-redux'
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';
import {formatterService} from '../../../_helper/formatterService'

const OrderSummaryComp = (props) => {
    return (
        <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="shippingContainer" id="shippingRightPanel">
                <h2>Order Summary</h2>
                <hr />
                <div className=" row ">
                    <div className="col-6">Subtotal</div>
                    <div className="col-6">€160.00</div>
                </div>
                <div className="row">
                    <div className="col-6">Shipping</div>
                    <div className="col-6">TBD</div>
                </div>
                <div className="row">
                    <div className="col-6">Sales Tax</div>
                    <div className="col-6">€30.00</div>
                </div>
                <div className="row">
                    <div className="col-6">Total</div>
                    <div className="col-6">€190.00</div>
                </div>
            </div>
            <div className="shippingContainer review-cart" id="shippingContainer">
                {
                    props && props.cart && Object.keys(props.cart).length > 0 && props.cart.lineItems && props.cart.lineItems.length > 0 ?

                        props.cart.lineItems.map((s, i) => (
                            <React.Fragment key={i}>
                                <div className="row">
                                    {/* <div className="col-12" className="shipHead">{s.name.en}</div> */}
                                </div>
                                <div className="row mb-5">
                                    <div className="col-4">
                                        <img className="img-fluid" src={s.variant.images[0].url}></img>
                                    </div>

                                    <div className="col-8">
                                        <div className="shipHead">{s.name.en}</div>
                                        <div className="shipHead-item"><strong>Item no</strong>: {s.productId}</div>

                                    </div>

                                </div>

                            </React.Fragment>
                        ))
                        :
                        null
                }
                <hr />
                <div className=" row orderSummaryTotal">
                    <Col >Each</Col> <Col>Quantity</Col> <Col>Total</Col>
                </div>
                {
                    props && props.cart && Object.keys(props.cart).length > 0 && props.cart.lineItems && props.cart.lineItems.length > 0 ?
                        props.cart.lineItems.map((s, i) => (
                            <React.Fragment key={i}>
                                <div className="row orderSummarytext">
                                    <Col>{formatterService.formatCurrency(s.price.value.centAmount, s.price.value.currencyCode)}</Col> <Col>{s.quantity}</Col> <Col>{formatterService.formatCurrency(s.totalPrice.centAmount, s.totalPrice.currencyCode)}</Col>
                                </div>
                            </React.Fragment>
                        ))
                        :
                        null
                }
            </div>
        </div>
    )
}

export default connect(state => state)(OrderSummaryComp)