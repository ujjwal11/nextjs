import React, { Component } from 'react';
import Footer from "../src/containers/Footer/footerView"
import Header from "../src/containers/Header/headerView"
import {connect} from 'react-redux'
import {loadDataMegaNav} from '../src/containers/MegaNavContent/actions'
import CartView from "../src/containers/Cart/cartView"


const Cart = props => {

    return (
        <React.Fragment>
            <title>Cart | Mastek Store</title>
            <Header navData={props.navData.megaNavData} />
            <CartView />
            <Footer />
        </React.Fragment>
    );
}

Cart.getInitialProps = async ({ req,  ctx }) => {

    const { store, isServer } = ctx
    if (isServer) {
      store.dispatch(loadDataMegaNav())
    }
    return {isServer}
}


export default connect(state=>state)(Cart)
