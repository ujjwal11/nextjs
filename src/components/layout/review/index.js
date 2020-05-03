import React from 'react'
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';
import FooterLinks from "../../../../src/components/layout/home/footerLinks"
import {orderReviewService} from '../../../api/orderReviewApi'
import {connect} from 'react-redux'
import {formatterService} from '../../../_helper/formatterService'

const Review = props => {

   const submitOrder = async() => {
    const Token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : ''
    console.log('asd')
    const orderData = await orderReviewService.orderReview(Token.access_token)
    console.log('orderData>>>', orderData)
   }

    return (
        <main role="main" className="container-fluid mainDiv">
            <div className="prodLists">
                <Row>
                    {
                        props.cart && Object.keys(props.cart).length > 0 && props.cart.shippingAddress && Object.keys(props.cart.shippingAddress).length > 0 ?
                            <div className="col-lg-8 col-md-7 col-sm-12">
                                <div className="shippingContainer" id="shippingContainer">
                                    <h2>Shipping</h2>
                                    <hr />
                                    <h6><strong>Shipping Address:</strong></h6>
                                    <div className="row">
                                        <div className="col-12">{props.cart.shippingAddress.firstName} {props.cart.shippingAddress.lastName}</div>
                                        <div className="col-12">{props.cart.shippingAddress.additionalStreetInfo}</div>
                                        <div className="col-12">{props.cart.shippingAddress.additionalAddressInfo}</div>
                                        <div className="col-12">{props.cart.shippingAddress.country}</div>
                                        <div className="col-12">{props.cart.shippingAddress.state}, {props.cart.shippingAddress.city} - {props.cart.shippingAddress.postalCode}</div>
                                        <div className="col-12">{props.cart.shippingAddress.phone}</div>
                                    </div>
                                    <h6 className="mt-3"><strong>Shipping Method:</strong></h6>
                                    <div className="row">
                                        <div className="col-5">Total</div>
                                        <div className="col-4">€20.00</div>
                                    </div>
                                </div>
                                <div className="shippingContainer review-cart" id="shippingContainer">
                                    <h2>Payment</h2>
                                    <hr />
                                    <h6><strong>Billing Address:</strong></h6><br />
                                    <div className="row">
                                        <div className="col-12">{props.cart.billingAddress.firstName} {props.cart.billingAddress.lastName}</div>
                                        <div className="col-12">{props.cart.billingAddress.additionalStreetInfo}</div>
                                        <div className="col-12">{props.cart.billingAddress.additionalAddressInfo}</div>
                                        <div className="col-12">{props.cart.billingAddress.streetNumber}, {props.cart.billingAddress.streetName}</div>
                                        <div className="col-12">{props.cart.billingAddress.country}</div>
                                        <div className="col-12">{props.cart.billingAddress.state}, {props.cart.billingAddress.city} - {props.cart.billingAddress.postalCode}</div>
                                    </div>
                                    <h6 className="mt-3"><strong>Payment Method:</strong></h6>
                                    <div className="row">
                                        <div className="col-5">Card Number</div>
                                        <div className="col-4">74748596587</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">Expiry Month</div>
                                        <div className="col-4">Apr</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">Expiry Year</div>
                                        <div className="col-4">2022</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <Button color="primary" onClick={e => submitOrder(e)} className="mt-3">Order Submit</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }

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
                                                    <div className="shipHead-item"><strong>Item no</strong>: {s.productId}
                                                    </div>
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
                </Row>
                <FooterLinks />
            </div>
        </main>
    )
}

export default connect(state => state)(Review)