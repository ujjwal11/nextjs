import React from 'react'
import Header from "../../src/containers/Header/headerView"
import Footer from "../../src/containers/Footer/footerView"
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import {connect} from 'react-redux'
import PaymentView from '../../src/containers/Payment/paymentView'


const Payment = props => {
    return(
        <React.Fragment>
            <title>Payment | Mastek Store</title>
            <Header navData={props.navData.megaNavData}/>
            <PaymentView />
            <Footer />
        </React.Fragment>
    )
}

Payment.getInitialProps = async ({req, ctx}) => {
    const { store, isServer } = ctx

    if(isServer) {
        store.dispatch(loadDataMegaNav())
    }
    return {isServer}
}

export default connect(state=>state)(Payment)