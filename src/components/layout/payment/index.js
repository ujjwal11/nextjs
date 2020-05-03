import React, {useState} from 'react'
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';
import {connect} from 'react-redux'
import {formatterService} from '../../../_helper/formatterService'
import { validatename, validateLastName, postalCode, creditCardNumber, validateEmail, securityCode } from "../../../_helper/validation"
import {startPayment} from '../../../containers/Payment/action'
import FooterLinks from "../../../../src/components/layout/home/footerLinks"
import OrderSummaryComp from '../common/orderSummaryComp'

const Payment = (props) => {
    const Months = ['Month','January','February','March','April','May','June','July','August','September','October','November','December']
    const Years = ['Year',2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
    const [formData, SetFormData] = useState(props && props.cart && props.cart.billingAddress && Object.keys(props.cart.billingAddress).length > 0 ? props.cart.billingAddress : {})
    const [validationError, setValidationError] = useState({
        ERROR: false,
        errors: {}
    })

    const handleUserInput = (e) => {
        SetFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handlePayment = (e) => {
        e.preventDefault()
        let validateFormResponse = validateForm( formData )
        setValidationError(validateFormResponse)
        if(!validateFormResponse.ERROR){
            const token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null;
            const data = {
                paymentData: {
                    billingAddress: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        additionalStreetInfo : formData.additionalStreetInfo,
                        additionalAddressInfo : formData.additionalAddressInfo,
                        streetNumber: formData.streetNumber,
                        streetName: formData.streetName,
                        city: formData.city,
                        postalCode: formData.postalCode,
                        state: formData.state,
                        country: formData.country,
                        email: formData.email
                    },
                    creditCard: {
                        cardNumber : formData.cardNumber,
                        cardType: "Visa",
                        cardExpMonth: formData.expireMonth,
                        cardExpYear: formData.expireYear
                    }
                },
                Token: token.access_token
            }
            props.dispatch(startPayment(data))

        }
        else{
            setValidationError(validateFormResponse)
        }
    }


    return (
        <main role="main" className="container-fluid mainDiv">
            <div className="prodLists">
                <div className="row">
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        <div className="shippingContainer" id="shippingContainer">
                            <h2>Payment</h2>
                            <hr />
                            <h6><strong>Billing Address:</strong></h6><br />
                            <Form className="form">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*First Name</Label>
                                            <Input
                                                type="name"
                                                name="firstName"
                                                id="firstName"
                                                placeholder="First Name"
                                                defaultValue={formData.firstName}
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.firstName ? validationError.errors.firstName : ''}</p>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Last Name</Label>
                                            <Input
                                                type="name"
                                                name="lastName"
                                                id="lastName"
                                                placeholder="Last Name"
                                                defaultValue={formData.lastName}
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.lastName ? validationError.errors.lastName : ''}</p>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Address1</Label>
                                            <Input
                                                type="address"
                                                name="additionalStreetInfo"
                                                id="additionalStreetInfo"
                                                placeholder="Address1"
                                                className="inputWidth"
                                                defaultValue={formData.additionalStreetInfo}
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.addressOne ? validationError.errors.addressOne : ''}</p>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Address2</Label>
                                            <Input
                                                type="address"
                                                name="additionalAddressInfo"
                                                id="additionalAddressInfo"
                                                placeholder="Address2"
                                                className="inputWidth"
                                                defaultValue={formData.additionalAddressInfo}
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.addressTwo ? validationError.errors.addressTwo : ''}</p>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Country</Label>
                                            <Input
                                                type="name"
                                                name="country"
                                                id="country"
                                                placeholder="Country"
                                                defaultValue={formData.country}
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.country ? validationError.errors.country : ''}</p>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*State</Label>
                                            <Input type="select" name="state" id="state" className="inputWidth" defaultValue={formData.state} onChange={e => handleUserInput(e)}>
                                                <option>Select State</option>
                                                <option>Berlin</option>
                                                <option>Hamburg</option>
                                                <option>Hesse</option>
                                            </Input>
                                            <p className="validationError">{validationError.ERROR && validationError.errors.state ? validationError.errors.state : ''}</p>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*City</Label>
                                            <Input
                                                type="name"
                                                name="city"
                                                id="City"
                                                placeholder="City"
                                                defaultValue={formData.city}
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.city ? validationError.errors.city : ''}</p>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Zip Code</Label>
                                            <Input
                                                type="name"
                                                name="postalCode"
                                                id="postalCode"
                                                className="inputWidth"
                                                defaultValue={formData.postalCode}
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.postalCode ? validationError.errors.postalCode : ''}</p>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Street Number</Label>
                                            <Input
                                                type="name"
                                                name="streetNumber"
                                                id="streetNumber"
                                                placeholder="8745952474"
                                                defaultValue={formData.streetNumber}
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.streetNumber ? validationError.errors.streetNumber : ''}</p>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Street Name</Label>
                                            <Input
                                                type="name"
                                                name="streetName"
                                                id="streetName"
                                                placeholder="8745952474"
                                                defaultValue={formData.streetName}
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.streetName ? validationError.errors.streetName : ''}</p>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Card Number</Label>
                                            <Input
                                                type="name"
                                                name="cardNumber"
                                                id="cardNumber"
                                                placeholder="4569874521548596"
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            {/* <p className="validationError">{validationError.ERROR && validationError.errors.cardNumber ? validationError.errors.cardNumber : ''}</p> */}
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup>
                                            <Label>*Expiration Month</Label>
                                            <Input type="select" name="expireMonth" id="expireMonth" className="inputWidth" onChange={e => handleUserInput(e)}>
                                                {
                                                    Months.map((s, i) => {
                                                        return (
                                                            <option key={i}>{s}</option>
                                                        )
                                                    })
                                                }
                                            </Input>
                                            <p className="validationError">{validationError.ERROR && validationError.errors.expireMonth ? validationError.errors.expireMonth : ''}</p>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-3">
                                        <FormGroup>
                                            <Label>*Expiration Year</Label>
                                            <Input type="select" name="expireYear" id="expireYear" className="inputWidth" onChange={e => handleUserInput(e)}>
                                                {
                                                    Years.map((s, i) => {
                                                        return (
                                                            <option key={i}>{s}</option>
                                                        )
                                                    })
                                                }
                                            </Input>
                                            <p className="validationError">{validationError.ERROR && validationError.errors.expireYear ? validationError.errors.expireYear : ''}</p>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Security Code</Label>
                                            <Input
                                                type="text"
                                                name="securityCode"
                                                id="securityCode"
                                                placeholder="236"
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.securityCode ? validationError.errors.securityCode : ''}</p>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Email</Label>
                                            <Input
                                                type="text"
                                                name="email"
                                                id="email"
                                                placeholder="test@gmail.com"
                                                className="inputWidth"
                                                defaultValue={formData.email}
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.email ? validationError.errors.email : ''}</p>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <Button onClick={e => handlePayment(e)} className="btn btn-primary" color="primary">Continue To Review Order</Button>
                                    </div></div>
                            </Form>
                        </div>
                    </div>
                    <OrderSummaryComp />
                </div>
                <FooterLinks />
            </div>
        </main>
    )
}

const validateForm  = props => {
	let ERROR = false;
    let errors = {};
	if(!props.firstName){
		ERROR = true
		errors.firstName = "valid name is required."
    }
    if(!props.streetNumber) {
        ERROR = true
        errors.streetNumber = "please enter street number"
    }
    if(!props.streetName) {
        ERROR = true
        errors.streetName = "please enter street name"
    }
    if(!postalCode(props.postalCode)){
        ERROR = true
        errors.postalCode = "please enter valid postalCode"
    }
    if(!props.city){
        ERROR = true
        errors.city = "please enter valid city"
    }
    if(!props.state || props.state === "Select State"){
        ERROR = true
        errors.state = "please select a valid state"
    }
    if(!props.country){
        ERROR = true
        errors.country = "please enter valid country code ex-IN"
    }
    if(!props.lastName){
		ERROR = true
		errors.lastName = "valid last name is required"
    }
    if(!props.additionalStreetInfo){
        ERROR = true
		errors.additionalStreetInfo = "enter first address"
    }
    if(!props.additionalAddressInfo){
        ERROR = true
		errors.additionalAddressInfo = "enter second address"
    }
    // if(!creditCardNumber(props.cardNumber)){
    //     ERROR = true
	// 	errors.cardNumber = "please enter a valid card number"
    // }
    if(!validateEmail(props.email)){
        ERROR = true
		errors.email = "please enter valid email id"
    }
    if(!securityCode(props.securityCode)){
        ERROR = true
		errors.securityCode = "please enter valid security code"
    }
    if(!props.expireMonth){
        ERROR = true
		errors.expireMonth = "please enter valid expire month"
    }
    if(!props.expireYear){
        ERROR = true
		errors.expireYear = "please enter valid expire year"
    }
	return {ERROR, errors}
}

export default connect(state => state)(Payment)