import React, { useState } from "react";
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';
import Router from 'next/router'
import {addressServices} from "../../../api/addressApi"
import {connect} from 'react-redux'
import AddressBookk from "./addressBook"
import {addAddressStart, updateAddressStart} from "../../../store/shared/actions"

const AddressHandle = (props) => {
    const [formData, SetFormData] = useState(props.Addressdata && Object.keys(props.Addressdata).length > 0 ? props.Addressdata : {})
    const [cancelFlag, SetCancelFlag] = useState(false)
    // console.log('all props',props)

    const handleUserInput = (e) => {
        SetFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitClick = () => {
        const Token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : ''
        if(props.stringToPass === "addNewAddress"){
            const data = {
                Token : Token.access_token,
                formData : formData
            }
            props.dispatch(addAddressStart(data))
            setInterval(()=>{
                SetCancelFlag(true)
            }, 2000)
            
        }else{
            const data = {
                Token : Token.access_token,
                formData : formData,
                updateId : props.Addressdata.id
            }
            props.dispatch(updateAddressStart(data))
            setInterval(()=>{
                SetCancelFlag(true)
            }, 2000)
        }
    }

    const cancelHandleClick = () => {
        SetCancelFlag(true)
    }

    if(cancelFlag){
        return (
            <AddressBookk />
        )
    }else{
        return (
            <Container className="myAccountContainerHeading">
                <h5 className="AddNewAdd">
                   {props.stringToPass === "addNewAddress" ? "ADD A NEW ADDRESS" : "EDIT ADDRESS"}
                </h5><br />
                <div>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="houseNumber"
                                    id="houseNumber"
                                    placeholder="House number"
                                    defaultValue={formData.houseNumber}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="streetName"
                                    id="streetName"
                                    placeholder="Street name"
                                    defaultValue={formData.streetName}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="streetNumber"
                                    id="streetNumber"
                                    placeholder="Street Number"
                                    defaultValue={formData.streetNumber}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="apartment"
                                    id="apartment"
                                    placeholder="Apartment / Suite"
                                    defaultValue={formData.apartment}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="building"
                                    id="building"
                                    placeholder="Building"
                                    defaultValue={formData.building}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="City"
                                    defaultValue={formData.city}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="postalCode"
                                    id="postalCode"
                                    placeholder="Postal code"
                                    defaultValue={formData.postalCode}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="state"
                                    id="state"
                                    placeholder="State"
                                    defaultValue={formData.state}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Input 
                                    className="myProfileinput"
                                    type="text"
                                    name="country"
                                    id="country"
                                    placeholder="Country"
                                    defaultValue={formData.country}
                                    onChange={e => handleUserInput(e)}
                                />
                            </FormGroup>
                        </Col>
                    </Row><br/>
                    <Row className="buttonMargin">
                        <Button color="primary" onClick={handleSubmitClick}>Submit</Button>
                        <Button className="cancelButton" onClick={cancelHandleClick}>Cancel</Button>
                    </Row>
                </div><br />
                
            </Container>
        )
    }
}

export default connect(state => state)(AddressHandle)