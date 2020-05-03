import React from 'react';
import {connect} from 'react-redux'
import { useRouter } from 'next/router'
import Footer from "../../src/containers/Footer/footerView"
import Header from "../../src/containers/Header/headerView"
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import BloomReachSearchView from "../../src/containers/Bloomreach/bloomReachSearchView"
import {searchService} from "../../src/api/searchApi"

const BloomReachSearch = (props) => {
    return (
        <React.Fragment>
            <Header navData={props.navData.megaNavData}/>
            <BloomReachSearchView searchData={props.searchData}/>
          <Footer />
        </React.Fragment>
    );
}

BloomReachSearch.getInitialProps = async ({req, ctx}) => {
    const { store, isServer } = ctx
    if(isServer){
        store.dispatch(loadDataMegaNav())
        var bloomReachSearchQueryData = await searchService.bloomSearchQueryData(ctx.query.param)
    }else{
        var bloomReachSearchQueryData = await searchService.bloomSearchQueryData(ctx.query.param)
    }
        

    return {isServer, searchData : bloomReachSearchQueryData}
}

export default connect(state=>state)(BloomReachSearch)