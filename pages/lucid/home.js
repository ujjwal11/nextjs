import React, { Component } from 'react';
import Footer from "../../src/containers/Footer/footerView"
import Header from "../../src/containers/Header/headerView"
// import LucidSearchView from "../../src/containers/LucidSearch/lucidSearchView"
import LucidHomeView from "../../src/containers/LucidSearch/lucidHomeView"

import {connect} from 'react-redux'
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import {searchService} from "../../src/api/searchApi"


const LucidSearch = (props) => {
    return (
        <React.Fragment>
            {/* <title>Cart | Mastek Store</title> */}
            <Header navData={props.navData.megaNavData} />
            <LucidHomeView lucidSearchData={props.lucidSearchData} />
            <Footer />
        </React.Fragment>
    );
}

LucidSearch.getInitialProps = async ({ req,  ctx }) => {

    const { store, isServer } = ctx
    if (isServer) {
      store.dispatch(loadDataMegaNav())
      var lucidData = await searchService.lucidSearchHomeData()
    }
    else{
        var lucidData = await searchService.lucidSearchHomeData()
        // console.log('lucidData>>',lucidData)
    }
    return {isServer, lucidSearchData : lucidData}
}


export default connect(state=>state)(LucidSearch)