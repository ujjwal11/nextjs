import React, { Component, useState } from 'react'
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';
import FooterLinks from "../../../../src/components/layout/home/footerLinks"
import MyProfile from "./myProfile"
import AddressBook from "./addressBook"
import MyXlRewards from "./myXlRewards"
import OrderHistory from "./orderHistory"
import PaymentMethods from "./paymentMethod"
import WishList from "./wishList";
import {tokenService} from '../../../api/token'
import Router from "next/router";
import {emptyAddTOCart} from '../../../containers/PDP/actions'
import {connect} from 'react-redux'


const MyAccount = (props) => {
    const [Value, setValue] = useState('')

    const handleClick = (e,str) => {
        const newstr = str.charAt(0).toUpperCase() + str.slice(1);
        setValue(newstr)
    }

    const Map = {
        "MyProfile": MyProfile,
        "OrderHistory": OrderHistory,
        "AddressBook" : AddressBook,
        "MyXlRewards" : MyXlRewards,
        "PaymentMethods" : PaymentMethods,
        "WishList" : WishList
    }

    let MyComponent = Value
    let Tagname = Map[MyComponent];

    const userLogout = async(e) => {
        const data = await tokenService.logout()
        // console.log('data when hit api >>>>', data)
        if(data && Object.keys(data).length > 0 && data.status === 200){
            localStorage.setItem('userToken', JSON.stringify(data.data));
            Router.push(`/`)
            props.dispatch(emptyAddTOCart())
        }

    }

    // const userProfileData = props && props.user && props.user.data && Object.keys(props.user.data).length > 0 ? {
    //     firstName : props.user.data.firstName,
    //     lastName : props.user.data.lastName,
    //     email : props.user.data.email
    // } : {}

    return (
        <main role="main" className="container-fluid mainDiv">
            <div className="prodLists">
                <Row>
                    <Col md="3">
                        <div className="myAccountContainer">
                            <h5>My Account</h5>
                            <hr />
                            <div>
                                <ul className="unorderListStyle" >
                                    <li className="listStyle" onClick={e => handleClick(e, "myProfile")}>
                                        My Profile
                                    </li>
                                    <li className="listStyle" onClick={e => handleClick(e, "orderHistory")}>
                                        Order History
                                    </li>
                                    <li className="listStyle" onClick={e => handleClick(e, "addressBook")}>
                                        Manage Addresses
                                    </li>
                                    <li className="listStyle" onClick={e => handleClick(e, "paymentMethods")}>
                                        Payment Methods
                                    </li>
                                    <li className="listStyle" onClick={e => handleClick(e, "wishList")}>
                                        Wish List
                                    </li>
                                    {/* <li className="listStyle" onClick={e => handleClick(e, "myXlRewards")}>
                                        My XL Rewards
                                    </li> */}
                                </ul>
                                <Button onClick={e => userLogout(e)}>Logout</Button>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        {
                            Value ?
                                <Tagname />
                                :
                                <MyProfile />
                        }
                    </Col>
                </Row>
                <FooterLinks />
            </div>
        </main>
    )
}

export default connect(state => state)(MyAccount)