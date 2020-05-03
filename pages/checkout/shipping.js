import React from 'react'
import Header from "../../src/containers/Header/headerView"
import Footer from "../../src/containers/Footer/footerView"
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import {connect} from 'react-redux'
import ShippingView from '../../src/containers/Shipping/shippingView'
import {shippingMethod} from '../../src/api/shippingMethodApi'

const Shipping  = props => {
    const shippingMethod = props.shippingMethodData && Object.keys(props.shippingMethodData).length > 0 && props.shippingMethodData.results && props.shippingMethodData.results.length > 0 ? props.shippingMethodData.results : []
    return (
        <React.Fragment>
            <title>Shipping | Mastek Store</title>
            <Header navData={props.navData.megaNavData}/>
            <ShippingView shippingMethod={shippingMethod}/>
            <Footer />
        </React.Fragment>
    )
}

Shipping.getInitialProps = async ({req, ctx}) => {
    const { store, isServer } = ctx

    if(isServer) {
        store.dispatch(loadDataMegaNav())
    }
    else{
        const token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null
        var shippingMethodData = await shippingMethod.getAllShippingMethods(token)
    }
    return {isServer, shippingMethodData : shippingMethodData}
}

export default connect(state=>state)(Shipping)