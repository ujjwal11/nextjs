import React from 'react';
import Footer from "../../../src/containers/Footer/footerView"
import Header from "../../../src/containers/Header/headerView"
import MegaNavView from "../../../src/containers/MegaNavContent/megaNavView"
import {connect} from 'react-redux'
import {loadDataMegaNav} from '../../../src/containers/MegaNavContent/actions'
import {loadPlpData} from '../../../src/containers/Plp/actions'
import {startSelectedFacets} from '../../../src/store/shared/actions'
import PlpView from "../../../src/containers/Plp/plpView"
import {handleCat, stringHandle, parseCookie} from "../../../src/_helper/helper"
import { useRouter } from 'next/router'


const Categories = (props) => {
  // console.log('idr kab aa rha hai????', props)
  const router = useRouter()
  const { page, offset, facetValues } = router.query
  const {categoryid, subcategoryId, childCatId} = props.ctxQuery
  const plpTitle = handleCat(categoryid, subcategoryId, childCatId)
  return (
    <React.Fragment>
      {/* <title>{plpTitle.category} | Mastek Store</title> */}
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



Categories.getInitialProps = async ({ req,  ctx }) => {
  const { store, isServer } = ctx
  const {categoryid, subcategoryId, childCatId, subChildCatId, page, offset, facetValues, router} = ctx.query
  const authHeader = parseCookie(ctx)

  if (isServer) {
    store.dispatch(loadDataMegaNav())
      const dataObj = {offset, facetValues, categoryid, subcategoryId, childCatId, subChildCatId, page, authHeader }
      // console.log('dataObj>>',dataObj)
      store.dispatch(loadPlpData(dataObj))

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
      }else if(facetValues && typeof facetValues === "string"){
        const data = {
          key : facetValues.split(':')[1],
          value : facetValues.split(':')[0],
          isServer : isServer
        }
        store.dispatch(startSelectedFacets(data))
      }else{
        const data = {
          key : '',
          value : '',
          empty : true
        }
        store.dispatch(startSelectedFacets(data))
      }
  }else{
      const categoryIds = stringHandle(ctx.asPath)
      const {categoryid, subcategoryId, childCatId} = categoryIds
      const dataObj = { categoryid, subcategoryId, childCatId, offset, page, facetValues, authHeader }
      store.dispatch(loadPlpData(dataObj))
  }
  return {isServer, ctxQuery: ctx.query}
}

export default connect(state=>state)(Categories)
