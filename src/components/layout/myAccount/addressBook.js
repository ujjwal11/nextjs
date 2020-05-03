import React, { useState } from "react";
import {Container, Col, Form, FormGroup, Label, Input, Button, Row} from 'reactstrap';
import AddressHandle from "./addressHandle";
import {connect} from 'react-redux'
import {addressServices} from "../../../api/addressApi"



const AddressBook = (props) => { 
    const [newAddressAdd, SetNewAddressAdd] = useState(false)
    const [editAddress, SetEditAddress] = useState(false)
    const [editAddressIndex, SetEditAddressIndex] =  useState()
    const userAddressData = props.user && props.user.data && Object.keys(props.user.data).length > 0 ? props.user.data : {}

    const AddressHandleClick = (e, str, data, index) => {
        if(str === "addNewAddress"){
            SetNewAddressAdd(true)
        }else{
            SetEditAddressIndex(index)
            SetEditAddress(true)
        }
    }

    const cancelChanges = (e) => {
        SetNewAddressAdd(false)
        SetEditAddress(false)
    }

    const deleteAddress = (e, id) => {
        const Token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : ''
        const data = {
            Token : Token.access_token,
            id : id,
        }
        addressServices.deleteAddress(data)
    }

    // console.log('userAddressData>>>',userAddressData)

    if(newAddressAdd || editAddress){
        const stringToPass = newAddressAdd ? "addNewAddress" : "editAddress"
        const Addressdata = stringToPass === "editAddress" ? userAddressData.addresses : {}
        const data = {
            ...Addressdata[editAddressIndex],
        }

        return (
            <AddressHandle
                Addressdata={data}
                stringToPass={stringToPass}
                cancelChanges={cancelChanges}
            />
        )
    }else{
        return (
            <Container className="myAccountContainerHeading">
                <h5 style={{textAlign:"left"}}>
                    Manage Addresses
                </h5><br />
                <div className="addressBook">
                    <p className="addressBookPara" onClick={e => AddressHandleClick(e, "addNewAddress")}>
                      +  ADD A NEW ADDRESS
                    </p>
                </div>
                {
                    userAddressData && userAddressData.addresses && userAddressData.addresses.length > 0 ?
                    
                    userAddressData.addresses.map((s,i) => (
                        <div className="row mt-3" key={i}>
                            <div className="col-sm-12 col-md-6 col-lg-4 mb-3"><div className="p-3 border bg-light">
                                <div className="text-right">
                                    <span className="editNDelete" onClick={e => AddressHandleClick(e, "editAddress", s, i)}>
                                        <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                    </span>
                                    <span className="editNDelete" onClick={e => deleteAddress(e, s.id)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <p className="card-text">
                                    {s.firstName}   {s.mobile}  {s.building},{s.apartment},{s.streetNumber},{s.streetName},{s.city},{s.state},{s.country} - {s.postalCode}
                                </p>
                            </div>
                            </div>
                        </div>
                    ))
                    :
                    null
                }
            </Container>
        )
    }
}

export default connect(state => state)(AddressBook)