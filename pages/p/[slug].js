import React from 'react';
import {connect} from 'react-redux'
import { useRouter } from 'next/router';
import Footer from "../../src/containers/Footer/footerView"
import Header from "../../src/containers/Header/headerView"
import MegaNavView from "../../src/containers/MegaNavContent/megaNavView"
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import {loadProductData} from '../../src/containers/PDP/actions'
import PdpView from '../../src/containers/PDP/pdpView'
import {loadHomePageData} from '../../src/containers/HomeContent/actions'

// import FooterLinks from "../../src/components/layout/home/footerLinks"


const Product = props => {
    const pdpTitle = props && props.pdp && Object.keys(props.pdp).length > 0 && props.pdp.current && Object.keys(props.pdp.current).length > 0 ? props.pdp.current.name.en : ''
    return (
        <React.Fragment>
            <Header navData={props.navData.megaNavData} />
            <PdpView
                pdpData={props.pdp}
                pdpTitle={pdpTitle}
            />
            {/* <FooterLinks /> */}
            <Footer />
        </React.Fragment>
    )
}

Product.getInitialProps = async ({ req,  ctx }) => {
    const {slug} = ctx.query
    const { store, isServer } = ctx
    if (isServer) {
        store.dispatch(loadDataMegaNav())
        store.dispatch(loadHomePageData())

    }
    store.dispatch(loadProductData(slug))
    store.dispatch(loadHomePageData())
}

export default connect(state=>state)(Product)