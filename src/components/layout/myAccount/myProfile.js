import React, { useState } from 'react'
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';
import {connect} from 'react-redux'
import {startUpdateUserProfile} from '../../../containers/MyAccount/action'

const MyProfile = (props) => {
    const [formData, SetFormData] = useState({})

    const userProfileData = props && props.user && props.user.data && Object.keys(props.user.data).length > 0 ? props.user.data : {}

    const handleUserInput = (e) => {
        SetFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const saveChanges = (e) => {
        if(formData && Object.keys(formData).length > 0){
            const Token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : ''
            const data = {
                userData : {
                    ...formData
                },
                Token : Token.access_token
            }
            props.dispatch(startUpdateUserProfile(data))
        }
    }

    return(
        <div className="myAccountContainerHeading">
           
            <h5>
                My Profile
            </h5>
            <hr />
            <div className="col-sm-12 col-md-12 col-lg-9 pl-0">
            <div>
                <div className="profileInfoHeading">
                    Personal Information
                </div>
            </div>
            <div>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Input 
                                className="myProfileinput"
                                type="text"
                                name="firstName"
                                id="firstName"
                                defaultValue={userProfileData.firstName}
                                onChange={e => handleUserInput(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input 
                                className="myProfileinput" 
                                type="text"
                                name="lastName"
                                id="lastName"
                                defaultValue={userProfileData.lastName}
                                onChange={e => handleUserInput(e)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <div>
                <div className="profileInfoHeading">
                    Email Address
                </div>
            </div>
            <div>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Input
                                className="myProfileinput"
                                type="email"
                                name="email"
                                id="email"
                                defaultValue={userProfileData.email}
                                onChange={e => handleUserInput(e)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </div><br />
            </div>
            <div>
                {
                    formData && Object.keys(formData).length > 0 ?
                    <br />
                    :
                    null
                }
                {
                    formData && Object.keys(formData).length > 0 ?
                    <Button color="primary" onClick={e => saveChanges(e)}>Save Changes</Button>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default connect(state => state)(MyProfile)