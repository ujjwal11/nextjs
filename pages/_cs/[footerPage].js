import React from 'react';
import {connect} from 'react-redux'
import { useRouter } from 'next/router';
import Footer from "../../src/containers/Footer/footerView"
import Header from "../../src/containers/Header/headerView"
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import FooterDataView from '../../src/containers/FooterData/footerDataView'
import {FooterDataApi} from '../../src/api/footerDataApi'

const FooterPages = props => {
    return (
        <React.Fragment>
            <Header navData={props.navData.megaNavData}/>
            <FooterDataView FooterData={props.FooterData} ctxQuery={props.ctxQuery}/>
        </React.Fragment>
    )
}

FooterPages.getInitialProps = async ({req, ctx}) => {
    const {footerPage} = ctx.query
    const { store, isServer } = ctx
    if(isServer){
        store.dispatch(loadDataMegaNav())
        var FooterData = await FooterDataApi.footerData(footerPage)
    }else{
        var FooterData = await FooterDataApi.footerData(footerPage)
    }
    return {isServer, ctxQuery: ctx.query, FooterData: FooterData}
}

export default connect(state=>state)(FooterPages)