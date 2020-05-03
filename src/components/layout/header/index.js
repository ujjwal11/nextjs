import React from 'react'
// import Logo from './logo/index'
import Link from 'next/link';
import {connect} from 'react-redux'
import _ from 'lodash';
// import { Router } from '../../../../routes'
import MegaNav from "../megaNav/index"
import Router from 'next/router'
import {searchService} from '../.././../api/searchApi'
import {preview} from '../../../_helper/constant'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state={
          data : {},
          userName : '',
          totalQty : 0,
          openMegaNav : false,
          openPreview : false,
          typeAheadData : [],
          date : '',
          customerGroup : '',
          priceGroup : '',
          currency : '',
          channel : ''
        }
    }
    
    componentDidMount() {
      const {user} = this.props
      const userName = user && Object.keys(user) && user.data && Object.keys(user.data) && user.data.firstName ? user.data.firstName : ''
      if(localStorage && localStorage.userToken && userName){
        const userTokenData = JSON.parse(localStorage.userToken)
        //check if authenticated = true
        //fetch_user_details
        //create a saga that is responsible for this action
        // call api /api/me/
        
        this.setState({ 
            data : userTokenData,
            userName : userName
          })
      }

      if(this.props.cart && Object.keys(this.props.cart).length > 0){
        var totalQty = 0;
        if(this.props.cart.lineItems) {
          let result = this.props.cart.lineItems.map(a => a.quantity);
          totalQty = totalQty + result.reduce((a, b) => a + b, 0);
        }
        this.setState({totalQty : totalQty})
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.user !== this.props.user) {
        const userTokenData = JSON.parse(localStorage.userToken)
        this.setState({
          data : userTokenData,
          userName : this.props.user.data.firstName
        })
      }
      
      if(prevProps.cart !== this.props.cart){
        var totalQty = 0;
        if(this.props.cart.lineItems) {
          let result = this.props.cart.lineItems.map(a => a.quantity);
          totalQty = totalQty + result.reduce((a, b) => a + b, 0);
        }
        this.setState({totalQty : totalQty})
      }
    }

    goToCart = (e) => {
      e.preventDefault()
      Router.push('/cart', '/cart')
    }

    MyAccount = (e) => {
      e.preventDefault()
      Router.push('/myAccount', '/myAccount')
    }

    handleChange = (e) => {
      console.log('env flag>>', process.env.SEARCH_FLAG)
      if(process.env.SEARCH_FLAG === false){
        if (e.keyCode === 13) {
          const value = e.target.value
          Router.push('/search/[param]', `/search/${value}`);
        }
      }else{
        console.log('lucid one')
        console.log('lucid one', e.target.value)
        if (e.keyCode === 13){
          const qParam = e.target.value
          Router.push('/lucid/[param]', `/lucid/search?q=${qParam}`);
        } 
        // searchService.lucidSearchQueryData()
      }
    }

    typeAhead = (e) => {
      if (process.env.SEARCH_FLAG === false) {
        const localData = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : ''
        searchService.searchTypeAhead(e.target.value, localData)
          .then((res) => {
            if (res && Object.keys(res).length > 0) {
              this.setState({
                typeAheadData: Object.values(res)
              }, console.log('this.state>>', this.state))
            }
          })
      }else{
        console.log('lucid one in type ahed')
      }
    }

    handleSubmit = (e) => {
      e.preventDefault()
    }

    openMegaNav = (e) => {
      const {openMegaNav} = this.state
      this.setState({
        openMegaNav : !openMegaNav
      })
    }

    selectedItem = (e, currentValue) => {
      Router.push('/search/[param]', `/search/${currentValue}`);
    }

    redirectToHome = (e) => {
      Router.push('/')
    }

    handlePreviewClick = (e) => {
      const {openPreview} = this.state
      this.setState({openPreview : !openPreview})
    }

    handleUserInput = (e) => {
      // const { previewData } = this.state
      this.setState({
        ...this.state.previewData,
        [e.target.name] : e.target.value
      })
    }

    handlePreviewSubmit = (e) => {
      e.preventDefault()
      const {date, customerGroup, priceGroup, currency, channel } = this.state
      const encodedData = btoa(JSON.stringify({
        preview: true,
        date : date,
        customer_group: customerGroup,
        price_group: priceGroup,
        channel : channel,
        currency : currency,
        // locale : ''
      }))
      // console.log('encodedData', encodedData)
      Cookies.set('authHeader', encodedData);
    }

    // mouseOut = (e) => {
    //   console.log(e)
    //   console.log("mouse out")
    // }

    // findCartItemsCount = (e, response) => {
    //   var totalQty = 0;
    //   if(response.lineItems) {
    //     let result = response.lineItems.map(a => a.quantity);
    //     totalQty = totalQty + result.reduce((a, b) => a + b, 0);
    //   }
  
    //   return totalQty;
    // }

  render() {
    console.log("this.state.data", preview);
    const data = this.props.data && this.props.data.length > 0 ? this.props.data : []
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top container-p-3 main-nav" role="navigation">
          {/* <!-- Begin Top Header --> */}
          <div className="row">
            <div className="container top-banner add-new">
              {/* <span onClick={e => this.handlePreviewClick(e)}>
                <img src="https://cdn4.iconfinder.com/data/icons/meBaze-Freebies/512/preview.png" className="preview-logo show-on-mobile" />
              </span> */}
              {
                // process.env.PREVIEW_MODE === true ?
                  <React.Fragment>
                    <span onClick={e => this.handlePreviewClick(e)}>
                      <img src="https://cdn4.iconfinder.com/data/icons/meBaze-Freebies/512/preview.png" className="preview-logo show-on-mobile" />
                    </span>
                    <div className="dropdown position-static previewdemo ">
                      <button type="button" className="btn btn-primary dropdown-toggle hide-on-mobile" data-toggle="dropdown">
                        Preview<i className="icon-action fa fa-chevron-down" id="0" onClick={e => this.handlePreviewClick(e)}></i>
                      </button>

                      <div className={this.state.openPreview ? "dropdown-menu pd15 nb-form-demo showPreview" : "dropdown-menu pd15 nb-form-demo"} >
                        <form>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="">Date</label>
                                <input type="date" id="start" name="date" className="form-control" onChange={e => this.handleUserInput(e)} />
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group">
                                <label className="">Customer group</label>
                                <select name="customerGroup" className="form-control" onChange={e => this.handleUserInput(e)}>
                                  <option>Select customer</option>
                                  {
                                    preview.customerGroup.map((s, i) => (
                                      <option key={i}>{s}</option>
                                    ))
                                  }
                                </select>
                                <p className="validationError"></p>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <label className="">Price group</label>
                              <select className="form-control" name="priceGroup" onChange={e => this.handleUserInput(e)}>
                                <option>Select Price</option>
                                {
                                  preview.priceGroup.map((s, i) => (
                                    <option key={i}>{s}</option>
                                  ))
                                }
                              </select>
                              <p className="validationError"></p>
                            </div>
                            <div className="col-sm-3">
                              <label className="">Currency</label>
                              <select className="form-control" name="currency" onChange={e => this.handleUserInput(e)}>
                                <option>Select Currency</option>
                                {
                                  preview.currency.map((s, i) => (
                                    <option key={i}>{s}</option>
                                  ))
                                }
                              </select>
                              <p className="validationError"></p>
                            </div>
                            <div className="col-sm-3">
                              <label className="">Channel</label>
                              <select className="form-control" name="channel" onChange={e => this.handleUserInput(e)}>
                                <option>Select Channel</option>
                                {
                                  preview.channel.map((s, i) => (
                                    <option key={i}>{s}</option>
                                  ))
                                }
                              </select>
                              <p className="validationError"></p>
                            </div>
                            <div className="col-12"><button type="submit" className="btn btn-primary mb-2 text-uppercase text-center" onClick={e => this.handlePreviewSubmit(e)}>Preview</button></div>

                          </div>
                        </form>

                      </div>
                    </div>
                  </React.Fragment>
                  // :
                  // null
              }

              <div className="msgPromo">FREE SHIPPING ON ORDERS OVER $20</div>
              <span className="float-right top-menu-links hide-on-mobile">
                <a href="/cart" className="inline" ><span className="fa fa-map-marker"></span> Town East Mall</a>


                {
                  this.state.data && Object.keys(this.state.data) && this.state.data.authenticated === true && this.state.userName ? (
                    <div className="dropdown inline" onClick={e => this.MyAccount(e)} >
                      <a className="nav-link " href="/login"><span className="fa fa fa-user"></span> {this.state.userName ? this.state.userName : 'testName'}</a>
                    </div>
                  ) : (
                      <div className="dropdown inline">
                        <Link href="/login"><a><span className="fa fa fa-user"></span> Account</a></Link>
                      </div>
                    )
                }

                <a href="/cart" className="inline" title="" onClick={e => this.goToCart(e)}><span className="fa fa-shopping-cart"></span> {this.state.totalQty}</a>
              </span>
            </div>
          </div>
          {/* <!-- End Top Header --> */}
          <a className="navbar-brand " style={{ cursor: "pointer" }} onClick={e => this.redirectToHome(e)}><img src="https://www.mastek.com/sites/default/files/mastek-logo1.png" className="logo" alt="assets/img/errorimage.jpg" /></a>
          <span><a className="nav-link show-on-mobile" /*href=""*/ title=""><span className="fa fa-map-marker"></span> </a></span>
          {
            this.state.data && Object.keys(this.state.data) && this.state.data.authenticated === true && this.state.userName ?
              <span onClick={e => this.MyAccount(e)}><a className="nav-link show-on-mobile " /*href=""*/><span className="fa fa fa-user"></span></a></span>
              :
              <span><Link href="/login"><a className="nav-link show-on-mobile"><span className="fa fa fa-user"></span></a></Link></span>
          }

          <a className="nav-link show-on-mobile" href="/cart" title="" onClick={e => this.goToCart(e)}><span className="fa  fa-shopping-cart"></span> {this.state.totalQty}</a>

          <button className={this.state.openMegaNav ? "navbar-toggler" : "navbar-toggler collapsed"} onClick={this.openMegaNav} type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded={this.state.openMegaNav ? "true" : "false"} aria-label="Toggle navigation">
            <span className="fa fa-bars"></span>
          </button>

          <div className="form-group has-search show-on-mobile mt-3">
            <input type="text" label="search" className="form-control search-back" placeholder="Search" onKeyUp={e => this.handleChange(e)} onChange={e => this.typeAhead(e)} />
            <span className="fa fa-search form-control-feedback"></span>
            {
              this.state.typeAheadData && this.state.typeAheadData.length > 0 && this.state.typeAheadData[0] && this.state.typeAheadData[0].length > 0 ?
                <div className="type-suggestion ">
                  <ul className="list-unstyled" style={{ cursor: "pointer" }}>
                    {
                      this.state.typeAheadData[0].map((s, i) => (
                        <li key={i} onClick={e => this.selectedItem(e, s.text)}>{s.text}</li>
                      ))
                    }
                  </ul>
                </div>
                :
                null
            }
          </div>

          <div className={this.state.openMegaNav ? "navbar-collapse justify-content-end collapse show" : "collapse navbar-collapse justify-content-end"} id="navbarCollapse">
            <ul className="navbar-nav mr-auto">

              <MegaNav data={data} />
              {/* <li className="show-on-mobile"><hr/></li>
                <li className="nav-item show-on-mobile">
                  <a className="nav-link " href="#" title=""><span className="fa fa-map-marker"></span> Town East Mall</a>
                </li> */}

              {
                this.state.data && Object.keys(this.state.data) && this.state.data.authenticated === true && this.state.userName ? (
                  <li className="nav-item show-on-mobile" onClick={e => this.MyAccount(e)}>
                    {/* <a  className="nav-link " href="/login"><span className="fa fa fa-user"></span> {this.state.userName ? this.state.userName : 'testName'}</a> */}
                  </li>
                ) : (
                    <li className="nav-item show-on-mobile">
                      {/* <a  className="nav-link " href="/login"><span className="fa fa fa-user"></span> Account</a> */}
                    </li>
                  )
              }
              {/* <li className="nav-item show-on-mobile">
                  <a className="nav-link " href="/cart" title="" onClick={e => this.goToCart(e)}><span className="fa  fa-shopping-cart"></span> {this.state.totalQty}</a>
                </li> */}
              <li className="nav-item hide-on-mobile">
                {
                  <form className="form-inline mt-2 mt-md-0" onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group has-search">
                      <input type="text" className="form-control search-back" placeholder="Search" onKeyUp={e => this.handleChange(e)} onChange={e => this.typeAhead(e)} />
                      <span className="fa fa-search form-control-feedback"></span>
                    </div>
                  </form>
                }
                {
                  this.state.typeAheadData && this.state.typeAheadData.length > 0 && this.state.typeAheadData[0] && this.state.typeAheadData[0].length > 0 ?
                    <div className="type-suggestion ">
                      <ul className="list-unstyled" style={{ cursor: "pointer" }}>
                        {
                          this.state.typeAheadData[0].map((s, i) => (
                            <li key={i} onClick={e => this.selectedItem(e, s.text)}>{s.text}</li>
                          ))
                        }

                      </ul>
                    </div>
                    :
                    null
                }
                {/* <Search /> */}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default connect(state=>state)(Header)