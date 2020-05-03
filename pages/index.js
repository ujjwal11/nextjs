import React, {Component} from 'react'
import Footer from "../src/containers/Footer/footerView"
import Header from "../src/containers/Header/headerView"
import HomeView from "../src/containers/HomeContent/homeView"
import MegaNavView from "../src/containers/MegaNavContent/megaNavView"
import {connect} from 'react-redux'
import {loadHomePageData} from '../src/containers/HomeContent/actions'
import {loadDataMegaNav} from '../src/containers/MegaNavContent/actions'



const Home = (props) => {
  
  // console.log("props is here>>>>>>><<<<<<<<<<", props)
  return (
    <React.Fragment>
      <title>Home | Mastek Store</title>
      <Header navData={props.navData.megaNavData} />
      {/* <MegaNavView navData={props.navData.megaNavData} /> */}
      <HomeView data={props.home} />
      <Footer />
    </React.Fragment>
  )
}

Home.getInitialProps = async ({ req, ctx }) => {

  const { store, isServer } = ctx
  
    if (isServer) {
      store.dispatch(loadHomePageData())
      store.dispatch(loadDataMegaNav())
    }else{
      store.dispatch(loadHomePageData())

    }
  return {isServer}
}

export default connect(state=>state)(Home)
