import React from 'react';
import {connect} from 'react-redux'
import { useRouter } from 'next/router'
import Footer from "../../src/containers/Footer/footerView"
import Header from "../../src/containers/Header/headerView"
import {loadDataMegaNav} from '../../src/containers/MegaNavContent/actions'
import PlpView from "../../src/containers/Plp/plpView"
import {startSearch} from '../../src/containers/Header/actions'
import {startSelectedFacets} from '../../src/store/shared/actions'
import {facetValueHandler} from '../../src/_helper/helper'

const Search = (props) => {
    const router = useRouter()

    const { page, offset } = router.query

    return (
        <React.Fragment>
            <Header navData={props.navData.megaNavData}/>
          <PlpView 
              plpData={props.category} 
              page={page ? parseInt(page) : null} offset={offset ? parseInt(offset) : null}
              query={router.query}
              path={router.asPath}
              ctxQuery={props.ctxQuery}
              />
          <Footer />
        </React.Fragment>
    );
}

Search.getInitialProps = async ({req, ctx}) => {
    const { store, isServer } = ctx
    const {page, offset, param, facetValues} = ctx.query
    if(isServer){
        store.dispatch(loadDataMegaNav())
        const data = {
            query : param,
            offset : offset,
            facetValues : facetValues,
        }
        store.dispatch(startSearch(data))

        // console.log('paras>>>',param)
        // console.log('facetVal>>>',facetValues)
        // console.log('facetVal>>>', typeof facetValues)

        // facetValueHandler(facetValues, isServer, store)
        if(facetValues && Array.isArray(facetValues)){
            let data = {}
            facetValues.map((s) => {
              data = {
                key : s.split(':')[1],
                value : s.split(':')[0],
                isServer : isServer
              }
              store.dispatch(startSelectedFacets(data))
            })
        }
        else if(facetValues && typeof facetValues === "string") {
            const data = {
                key: facetValues.split(':')[1],
                value: facetValues.split(':')[0],
                isServer: isServer
            }
            store.dispatch(startSelectedFacets(data))
        }
        else{
            const data = {
              key : '',
              value : '',
              empty : true
            }
            store.dispatch(startSelectedFacets(data))
        }
        
    }else{
        const data = {
            query : param,
            offset : offset,
            facetValues : facetValues,
        }
        store.dispatch(startSearch(data))
        // console.log('in the else part in param.sj')
        // console.log('in the >>>>>', facetValues)
        // console.log('in the >>>>>', ctx.query)

        // if(facetValues && typeof facetValues === "string") {
        // console.log('isme kab kab aa rha hai ye dikha...')
        //     const data = {
        //         key: facetValues.split(':')[1],
        //         value: facetValues.split(':')[0],
        //         isServer: false
        //     }
        //     store.dispatch(startSelectedFacets(data))
        // }
        
    }

    return {isServer, ctxQuery: ctx.query}
}

export default connect(state=>state)(Search)