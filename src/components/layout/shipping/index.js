import React, {useState} from 'react'
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';
import FooterLinks from "../../../../src/components/layout/home/footerLinks"
import {connect} from 'react-redux'
import {formatterService} from '../../../_helper/formatterService'
import { validatename, validateLastName, phone, postalCode } from "../../../_helper/validation"
import {startShipping} from '../../../containers/Shipping/actions'
import OrderSummaryComp from '../common/orderSummaryComp'

const Shipping = props => {
    const [formData, SetFormData] = useState(props && props.cart && props.cart.shippingAddress && Object.keys(props.cart.shippingAddress).length > 0 ? props.cart.shippingAddress : {})
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

    const handleShippingForm = (e) => {
        e.preventDefault()
        let validateFormResponse = validateForm( formData );
        setValidationError(validateFormResponse)
        if(!validateFormResponse.ERROR){
            const shippingMethodData = props && props.shippingMethod.filter(function (r) { return r.name === formData.shippingMethod });
            const token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null;
            const data = {
                shippingData: {
                    shippingAddress: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        additionalStreetInfo : formData.additionalStreetInfo,
                        additionalAddressInfo : formData.additionalAddressInfo,
                        country: formData.country,
                        state: formData.state,
                        city: formData.city,
                        postalCode: formData.postalCode,
                        phone: formData.phone
                    },
                    shippingMethodId: shippingMethodData[0].id
                },
                Token: token.access_token
            }
            props.dispatch(startShipping(data))
        }
        else{
            setValidationError(validateFormResponse)
        }
    }

    return (
        <main role="main" className="container-fluid mainDiv">
            <div className="prodLists">
                <Row>
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        <div className="shippingContainer" id="shippingContainer">
                            <h2>Shipping</h2>
                            <hr />
                            <Form className="form ">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*First Name</Label>
                                            <Input
                                                type="name"
                                                name="firstName"
                                                id="firstName"
                                                placeholder="First Name"
                                                className="inputWidth"
                                                defaultValue={formData.firstName}
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
                                                id="city"
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
                                            <Label>*Mobile</Label>
                                            <Input
                                                type="mobile"
                                                name="phone"
                                                id="phone"
                                                placeholder="8745952474"
                                                defaultValue={formData.phone}
                                                className="inputWidth"
                                                onChange={e => handleUserInput(e)}
                                            />
                                            <p className="validationError">{validationError.ERROR && validationError.errors.phone ? validationError.errors.phone : ''}</p>
                                        </FormGroup>
                                    </div>
                                    <div className="col-lg-6">
                                        <FormGroup>
                                            <Label>*Shipping Method</Label>
                                            <Input type="select" name="shippingMethod" id="shippingMethod" className="inputWidth" onChange={e => handleUserInput(e)}>
                                                {
                                                    props.shippingMethod.map((s, i) => (
                                                        <option key={i}>{s.name}</option>
                                                    ))
                                                }
                                            </Input>
                                            <p className="validationError">{validationError.ERROR && validationError.errors.shippingMethod ? validationError.errors.shippingMethod : ''}</p>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Button onClick={e => handleShippingForm(e)} className="btn btn-primary" color="primary">Continue To Payment</Button>
                                    </div>
                                </div>

                            </Form>
                        </div>
                    </div>
                    <OrderSummaryComp />
                </Row>
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
    if(!phone(props.phone)) {
        ERROR = true
        errors.phone = "please enter valid phone number"
    }
    if(!postalCode(props.postalCode)){
        ERROR = true
        errors.postalCode = "please enter valid postal code"
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
		errors.lastName = "valid lastName is required"
    }
    if(!props.additionalStreetInfo){
        ERROR = true
		errors.additionalStreetInfo = "enter first address"
    }
    if(!props.additionalAddressInfo){
        ERROR = true
		errors.additionalAddressInfo = "enter second address"
    }
    if(!props.shippingMethod){
        ERROR = true
		errors.shippingMethod = "please select a shipping method"
    }
	return {ERROR, errors}
}

export default connect(state => state)(Shipping)
