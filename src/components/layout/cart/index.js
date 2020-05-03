import React, { Component } from 'react';
// import { Row, Col, Button } from 'reactstrap';
import {connect} from 'react-redux'
import {formatterService} from '../../../_helper/formatterService'
import {startActiveCart , startUpdateCartData , deleteDataFromCart} from '../../../containers/PDP/actions'
import Router from 'next/router'
import Loader from '../../../Loader'
import FooterLinks from '../home/footerLinks'

class Cart extends Component {
   constructor(props) {
      super(props)

      this.state = {
         qty: Number,
         promoCodeHtmlOpen: false
      }
   }

   // componentDidMount(){
   //     const localData = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : ''
   //     this.props.dispatch(startActiveCart(localData.access_token))
   // }

   selectedProduct = (e, slug) => {
      e.preventDefault()
      Router.push('/p/[slug]', `/p/${slug}`)
   }

   handleContinueShopping = (e) => {
      e.preventDefault()
      Router.push(`/`)
   }

   updateCart = (e, qty, str, id) => {
      const localData = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : ''
      const params = {
         Authorization: `Bearer ${localData.access_token}`,
         body: {
            lineItemId: id,
            quantity: str === "add" ? qty + 1 : qty - 1
         }
      }
      this.props.dispatch(startUpdateCartData(params))
   }

   deleteCartItem = (e, id) => {
      e.preventDefault()
      const localData = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : ''
      const params = {
         Authorization: `Bearer ${localData.access_token}`,
         ProdId: id
      }
      this.props.dispatch(deleteDataFromCart(params))
   }

   handleClick = (e) => {
      e.preventDefault()
      Router.push(`/checkout/shipping`)
   }

   openApplyCoupon = () => {
      const {promoCodeHtmlOpen} = this.state
      this.setState({promoCodeHtmlOpen : !promoCodeHtmlOpen})
   }

   render() {
      if (this.props && this.props.cart && !this.props.cart.error) {
         return (
            <main role="main" className="container-fluid mainDiv">
               <div className="row cart">
                  <div className="col-sm-12 col-md-12 col-lg-8 ">
                     <div className="card-header bg-dark text-light d-none d-md-block">
                        {/* <i className="fa fa-shopping-cart" aria-hidden="true"></i> */}
                        <span className="cart-title"> My Cart</span>
                        <div className="btn btn-outline-info btn-sm pull-right" onClick={e => this.handleContinueShopping(e)}>Continue Shopping</div>
                        <div className="clearfix"></div>
                     </div>
                     {
                        this.props.cart && Object.keys(this.props.cart).length > 0 && this.props.cart.lineItems && this.props.cart.lineItems.length > 0 ?
                           <div className="card-body ">
                              <div className="row product-header hide-on-mobile">
                                 <div className="col-sm-12 col-md-2 ">item</div>
                                 <div className="col-sm-12 col-md-5 ">product Name</div>
                                 <div className="col-sm-12 col-md-3 ">quantity</div>
                                 <div className="col-sm-12 col-md-2 ">Total</div>
                              </div>
                              <hr />
                              {
                                 this.props.cart && Object.keys(this.props.cart).length > 0 && this.props.cart.lineItems && this.props.cart.lineItems.length > 0 ?
                                    this.props.cart.lineItems.map((s, i) => (
                                       <React.Fragment key={i}>
                                          <div className="row" >
                                             <div className="col-sm-12 col-md-2 ">
                                                <img className="img-fluid" src={s.variant.images[0].url} alt="assets/img/errorimage.jpg" />
                                             </div>
                                             <div className=" col-sm-12  col-md-5 cart-product-title">
                                                <div className="product-sku">#{s.variant.sku}</div>
                                                <h6 className="product-name"><strong><a href={`/p/${s.productSlug.en}`} onClick={e => this.selectedProduct(e, s.productSlug.en)}>{s.name.en}</a></strong></h6>
                                                {/* <div>Stock</div> */}
                                             </div>
                                             <div className=" col-sm-12  col-md-3 ">
                                                <div className="quantity pdbottom">
                                                   <div className="btn-minus"><span className="glyphicon glyphicon-minus" onClick={e => this.updateCart(e, s.quantity, "less", s.id)}>-</span></div>
                                                   <input value={s.quantity} className="input-qty" onChange={e => this.updateCart(e)} />
                                                   <div className="btn-plus"><span className="glyphicon glyphicon-plus" onClick={e => this.updateCart(e, s.quantity, "add", s.id)}>+</span></div>
                                                </div>
                                                <a href="" className="underline " onClick={e => this.deleteCartItem(e, s.id)}><i className="fa fa-trash" aria-hidden="true"></i></a>
                                             </div>
                                             <div className="col-sm-12  col-md-2">
                                                <div><strong>{formatterService.formatCurrency(s.totalPrice.centAmount, s.totalPrice.currencyCode)}</strong></div>
                                                <div className="Strikethrough"><strong>{formatterService.formatCurrency(s.totalPrice.centAmount, s.totalPrice.currencyCode)}</strong></div>
                                             </div>
                                          </div>
                                          <hr />
                                       </React.Fragment>
                                    ))
                                    :
                                    null
                              }
                           </div>
                        :
                           <React.Fragment>
                              <p className="cart-msg"> Your Shopping Cart is Empty </p>
                              <div className="cont-shop  text-center  d-lg-none d-md-none" onClick={e => this.handleContinueShopping(e)}><a className="underline" href="">Continue Shopping</a> <i className="fa fa-angle-double-right"></i></div>
                           </React.Fragment>
                     }
                  </div>
                  {
                     this.props.cart && Object.keys(this.props.cart).length > 0 && this.props.cart.lineItems && this.props.cart.lineItems.length > 0 ?

                        <div className="col-sm-12 col-md-12 col-lg-4">
                           <div className="card-footer ">
                              <div className="row">
                                 <div className="col-md-12 col-sm-12  " >
                                    <div className="" >
                                       <div className="text-uppercase  order-summ-title"> Order summary </div>
                                       <div className="prome-code">Prome code <span className={this.state.promoCodeHtmlOpen ? "fa fa-angle-down" : "fa fa-angle-up"} onClick={this.openApplyCoupon}></span></div>
                                       {
                                          this.state.promoCodeHtmlOpen ?
                                             <div className="col-md-12 col-sm-12">
                                                <div className="row">
                                                   <div className="col-6 pd-left">
                                                      <input type="text" className="form-control" placeholder="cupone code" />
                                                   </div>
                                                   <div className="col-6 pd-left">
                                                      <input type="submit" color="primary" className="btn btn-primary" value="Apply" />
                                                   </div>
                                                </div>
                                             </div>
                                             :
                                             null
                                       }

                                    </div>
                                    <br />
                                 </div>
                                 {
                                    this.props.cart && Object.keys(this.props.cart).length > 0 && this.props.cart.statusCode !== 404 ?
                                       <div className="col-md-12 col-sm-12">
                                          <div className="row cart-total-footer">
                                             <div className="col-8 col-sm-8"><strong>subtotal</strong></div>
                                             <div className="col-4 col-sm-4"><strong>{formatterService.formatCurrency(this.props.cart.totalPrice.centAmount, this.props.cart.totalPrice.currencyCode)}</strong></div>
                                             <div className="col-8 col-sm-8"><strong>Shipping(Standard)</strong></div>
                                             <div className="col-4 col-sm-4"><strong>{formatterService.formatCurrency("000", this.props.cart.totalPrice.currencyCode)}</strong></div>
                                             <div className="col-8 col-sm-8"><strong>Shipping Discount</strong></div>
                                             <div className="col-4 col-sm-4"><strong>{formatterService.formatCurrency("000", this.props.cart.totalPrice.currencyCode)}</strong></div>
                                             <div className="col-8 col-sm-8"><strong>Estimated Tax</strong></div>
                                             <div className="col-4 col-sm-4"><strong>{formatterService.formatCurrency("000", this.props.cart.totalPrice.currencyCode)}</strong></div>
                                          </div>
                                          <div className="row cart-total-footer pd-top">
                                             <div className="col-8 col-sm-8"><strong>Total</strong>
                                             </div>
                                             <div className="col-4 col-sm-4"><strong>{formatterService.formatCurrency(this.props.cart.totalPrice.centAmount, this.props.cart.totalPrice.currencyCode)}</strong></div>
                                             <small className="col-8 col-sm-8 pdtb"><strong>* Before Tax</strong></small>
                                             <div className="col-sm-12"> <a href="#" className="btn btn-primary btn-block" onClick={e => this.handleClick(e)}>Checkout</a></div>
                                          </div>
                                       </div>
                                       :
                                       null
                                 }
                              </div>
                           </div>
                        </div>
                     :
                     null
                  }
               </div>
               <FooterLinks />
            </main>
         );
      }
      else {
         return (
            <Loader />
         )
      }
   }
}

export default connect(state => state)(Cart)