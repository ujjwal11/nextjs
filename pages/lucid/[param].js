import React, { Component } from 'react';
import Footer from "../../src/containers/Footer/footerView"
import Header from "../../src/containers/Header/headerView"
import LucidSearchView from "../../src/containers/LucidSearch/lucidSearchView"
import {connect} from 'react-redux'
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import {searchService} from "../../src/api/searchApi"
import Router from 'next/router'


const LucidSearchParam = (props) => {
    return (
        <React.Fragment>
            {/* <title>Cart | Mastek Store</title> */}
            <Header navData={props.navData.megaNavData} />
            <LucidSearchView searchData={props.searchData}/>
            <Footer />
        </React.Fragment>
    );
}

LucidSearchParam.getInitialProps = async ({ req,  ctx }) => {
    // console.log('ctxctxctxctxctx>>',ctx)
    // console.log('ctxctxctxctxctx>>',ctx.query)

    const { store, isServer } = ctx
    if (isServer){
        if(ctx.query && ctx.query.fq){
            const data = {
                q : `q=${ctx.query.q}`,
                query : ctx.query.fq
            }
            var lucidSearchQueryData = await searchService.lucidSearchFacetData(data)
        }
      store.dispatch(loadDataMegaNav())
      var lucidSearchQueryData = await searchService.lucidSearchQueryData(ctx.query.q)
    }
    else{
        if(ctx && ctx.query && ctx.query.fq){
            const q = ctx.asPath.split("?")[1].split("&")[0]
            let query = ctx.query.fq
            const data = {
                q : q,
                query : query
            }
            var lucidSearchQueryData = await searchService.lucidSearchFacetData(data)

        }else{
            let query = ctx.asPath.split("?")[1].slice(2)
            var lucidSearchQueryData = await searchService.lucidSearchQueryData(query)
        }
    }
    return {isServer, searchData : lucidSearchQueryData}
}


export default connect(state=>state)(LucidSearchParam)