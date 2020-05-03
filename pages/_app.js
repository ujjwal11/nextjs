import App, {Container} from 'next/app'
import React from 'react'
import {Provider} from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import {connect} from 'react-redux'
import {loadHomePageData} from '../src/containers/HomeContent/actions'
import {loadToken} from '../src/store/shared/actions'
import {loadUserData} from '../src/store/shared/actions'
import createStore from '../src/store/configureStore'
import {startActiveCart} from '../src/containers/PDP/actions'      
// import TagManager from 'react-gtm-module'
import { trackPageView } from '../src/_helper/helper';
import Router from 'next/router';

import '../node_modules/react-multi-carousel/lib/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import '../public/dist/css/bootstrap.min.css'
import '../public/dist/css/app.css'

// const tagManagerArgs = {
//     gtmId: 'GTM-MTF8WJT'
// }

// import navigator from 'navigator';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//       navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (registration) {
//         console.log('SW registered: ', registration)
//       }).catch(function (registrationError) {
//         console.log('SW registration failed: ', registrationError)
//       })
//     })

// }

class CtApp extends App {

    registerSW = async() => {
       if('serviceWorker' in navigator){
           try {
               await navigator.serviceWorker.register('./sw.js')
           } catch(e){
               console.log(`SW registration failed`)
           }
       } 
    }

    static async getInitialProps({Component, ctx}) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ctx})
        }
        return {pageProps}
    }

    componentDidMount() {
        var token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null
        // if(!token){
            this.props.store.dispatch(loadToken(token))
            // this.props.store.dispatch(loadHomePageData())
        // }
        if(token && token.authenticated === true){
            this.props.store.dispatch(loadUserData())
        }
        var cartValue = this.props.store.getState() && this.props.store.getState().cart && Object.keys(this.props.store.getState().cart).length > 0
        if(cartValue === false && token !== null){
            this.props.store.dispatch(startActiveCart(token.access_token))
        }
        // TagManager.initialize(tagManagerArgs)
        Router.onRouteChangeComplete = url => {
            trackPageView(url);
        };
        this.registerSW();
    }

    render() {
        const {Component, pageProps, store} = this.props
        
        return (
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
        )
    }

}

export default withRedux(createStore) (withReduxSaga(CtApp))