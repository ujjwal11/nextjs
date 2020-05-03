import React from 'react'
import Header from "../../src/containers/Header/headerView"
import Footer from "../../src/containers/Footer/footerView"
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import {connect} from 'react-redux'
import ReviewView from '../../src/containers/Review/reviewView'

const Review  = props => {
    return (
        <React.Fragment>
            <title>Review | Mastek Store</title>
            <Header navData={props.navData.megaNavData}/>
            <ReviewView />
            <Footer />
        </React.Fragment>
    )
}

Review.getInitialProps = async ({req, ctx}) => {
    const { store, isServer } = ctx

    if(isServer) {
        store.dispatch(loadDataMegaNav())
    }
    return {isServer}
}

export default connect(state=>state)(Review)