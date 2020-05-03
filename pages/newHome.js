import React, {Component} from 'react'
import Footer from "../src/containers/Footer/footerView"
import Header from "../src/containers/Header/headerView"
import HomeView from "../src/containers/HomeContent/homeView"
import MegaNavView from "../src/containers/MegaNavContent/megaNavView"
import {connect} from 'react-redux'
import NewHomeView from '../src/containers/NewHome/newHomeView'
// import {loadHomePageData} from '../src/containers/HomeContent/actions'
import {loadDataMegaNav} from '../src/containers/MegaNavContent/actions'
import {Homeapi} from '../src/api/homeaApi'


const NewHome = (props) => {
      return (
        <body>
            <Header navData={props.navData.megaNavData}/>
          <NewHomeView newHomeData={props.NewHome}/>
          <Footer />
          </body>
      );
}

NewHome.getInitialProps = async ({ req, ctx }) => {

  const { store, isServer } = ctx
  
    if (isServer) {
      store.dispatch(loadDataMegaNav())
      var newHomeDataServer = await Homeapi.newHomeApi()

    }else{
      var newHomeData = await Homeapi.newHomeApi()

    }
  return {isServer, NewHome : newHomeDataServer ? newHomeDataServer : newHomeData }
}

export default connect(state=>state)(NewHome)
