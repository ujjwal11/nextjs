import React,{Component} from 'react';
import { Col, Row, Card, CardImg, CardBody, CardText, CardTitle, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Spinner  } from 'reactstrap';
import Loader from "../../../Loader"
import BreadCrumb from '../../../Breadcrumb';
import Router from 'next/router'
import {connect} from 'react-redux'
import {startAddToCart} from '../../../containers/PDP/actions'
import {productService} from '../../../api/product'
import {formatterService} from '../../../_helper/formatterService'
import FooterLink from '../../../components/layout/home/footerLinks'
import Carousel from 'react-multi-carousel'
import {sendDataToTagManager} from '../../../_helper/helper'
// import 'react-multi-carousel/lib/styles.css'
class ProductDisplayPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         size: '', color: '', qty: 1, loader: false, modal: false, addClass: false,
      }

      this.addToCart = this.addToCart.bind(this)
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { selectedVariant } = nextProps

      if (selectedVariant &&
         selectedVariant.attributes &&
         selectedVariant.attributes.length > 0

      ) {
         const color = selectedVariant.attributes.filter(attr => attr.name == 'color')[0]
         const size = selectedVariant.attributes.filter(attr => attr.name == 'size')[0]
         // console.log('color.value.key !== prevState.color', color.value.key !== prevState.color)
         // console.log('size.value !== prevState.size', size.value !== prevState.size)
         if ((color && color.value && size) &&
            (color.value.key !== prevState.color || size.value !== prevState.size)) {
            return {
               color: color.value.key,
               size: size.value
            }
         }
      }
      return null;
   }

   handleClick = (e, target, str, value) => {
      if (target === 'size') {
         this.props.findVariant(this.props.record, value, this.state.color)
      }
      else if (target === 'qty') {
         const { qty } = this.state
         if (str === 'add') {
            this.setState({ qty: qty + 1 })
         }
         else {
            this.setState({ qty: qty - 1 })
         }
      }
      else {
         this.props.findVariant(this.props.record, this.state.size, value)
      }

   }

   toggle = () => {
      const { modal } = this.state
      this.setState({ modal: !modal })
   }

   onGoToCart = (e) => {
      e.preventDefault()
      Router.push(`/cart`, `/cart`)
   }

   continueShopping = () => {
      Router.push(`/`)
   }

   dataSentToGTM() {
      console.log('asdasda???DAS?DASD?AS?D???>>')
      // window.dataLayer = window.dataLayer || [];
      sendDataToTagManager(
         {
            'event': 'addToCart',
            'ecommerce': {
               'currencyCode': 'EUR',
               'add': {                                // 'add' actionFieldObject measures.
                  'products': [{                        //  adding a product to a shopping cart.
                     'name': 'Triblend Android T-Shirt',
                     'id': '12345',
                     'price': '15.25',
                     'brand': 'Google',
                     'category': 'Apparel',
                     'variant': 'Gray',
                     'quantity': 1
                  }]
               }
            }
         }
      )
   }

   async addToCart(product, size, color, quantity) {
      // const selectedVariant = this.findVariant(product, size, color)
      const localstore = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null
      const { modal, loader, addClass } = this.state
      const { selectedVariant } = this.props
      const header = {
         productId: this.props.pdp.current.id,
         variantId: selectedVariant.id,
         quantity: parseInt(this.state.qty),
         Authorization: `Bearer ${localstore.access_token}`
      }

      if (selectedVariant) {
         // call api to add to cart
         this.setState({ addClass: !addClass })
         const addToCartData = await productService.getCartData(header)
         if (addToCartData && addToCartData.status !== 200) {
            console.error('item cannot added due to some error please try again')
         } else {
            this.props.dispatch(startAddToCart(addToCartData))
            this.dataSentToGTM()
            if (addToCartData && addToCartData.data && Object.keys(addToCartData.data).length > 0) {
               this.setState({
                  modal: !modal,
                  addClass: false
               })
            }
         }
         // console.log('addToCartDataaddToCartDataaddToCartDataaddToCartData>>>>',addToCartData)
         // 1. dispatch an action
         // this.props.dispatch(startAddToCart(addToCartData))


         // 2. 
      }
   }

   render() {
      const responsive = {
         desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5},
         tablet: {breakpoint: { max: 1023, min: 768 }, items: 3},
         mobile: {breakpoint: { max: 767, min: 0 }, items: 1},
      };
      const { selectedVariant, record } = this.props
      // var modelData = this.props && this.props.cart && Object.keys(this.props.cart).length > 0 ?  this.props.cart.lineItems.filter(r => r.productId === this.props.pdp.current.id && r.variant.id === this.props.selectedVariant.id) : {}
      // console.log('modelData>>',modelData)
      if (record && selectedVariant && Object.keys(record).length > 0 && Object.keys(selectedVariant).length > 0 && !this.state.loader && !this.props.pdp.loader) {
         return (
            <React.Fragment>
               <title>{this.props.pdpTitle}</title>
               <main role="main" className="container-fluid mainDiv">
                  <BreadCrumb breadcrumb={this.props.breadcrumb} />
                  {/* <p class="shipping-msg container-p-3 ">FREE SHIPPING ON ORDERS OVER $20</p> */}
                  <div className="row pdp" >
                     {/* <div className="col-sm-12 col-md-6 col-lg-2">
                     <div className="thumbnail-container"><img className="img-fluid d-block lazy" src={selectedVariant.images[0].url} alt="assets/img/errorimage.jpg" /></div>
                     
                  </div> */}

                     <div className="col-sm-12 col-md-6 col-lg-6 d-flex ">
                        <div className="thumbnail-container col-lg-2 col-md-3 col-sm-0 hide-on-mobile">
                           <img className="img-thumbnail" src={selectedVariant.images[0].url} alt="assets/img/errorimage.jpg" />
                        </div>
                        <div className="d-inline-block col-lg-10 col-md-9 col-sm-12 col-xs-12 text-center">
                           <img className="img-fluid " src={selectedVariant.images[0].url} alt="assets/img/errorimage.jpg" />
                        </div>
                     </div>
                     <div className="col-sm-12 col-md-6 col-lg-6">
                        <h3>{record.name.en}</h3>
                        <div className="itemcode text-capitalize">item# {selectedVariant.sku}</div>
                        <div className="price">
                           <span className="Strikethrough">{selectedVariant.price && selectedVariant.price.value && Object.keys(selectedVariant.price.value).length > 0 ? formatterService.formatCurrencyIcon(selectedVariant.price.value.number) : ''}</span>
                           <span> <strong>{selectedVariant.price && selectedVariant.price.value && Object.keys(selectedVariant.price.value).length > 0 ? formatterService.formatCurrencyIcon(selectedVariant.price.value.number) : ''}</strong></span>
                           <span className="discount">Buy One, Get one 50%</span>
                        </div>
                        {
                           this.props && this.props.sizes.length > 0 ?
                              <div className="row">
                                 <div className="col-sm-12 mar-top">
                                    <h6 className="title-attr"><strong>COLOR -</strong> <span className="text-capitalize">{this.state.color}</span></h6>
                                    <ul className="marpad">
                                       {
                                          this.props.colors.map((s, i) => (
                                             <li className={this.state.color === s ? "attr active " : "attr"} style={{ backgroundColor: s }} key={i} onClick={e => this.handleClick(e, 'color', '', s)}></li>
                                          ))
                                       }
                                    </ul>
                                 </div>
                              </div>
                              :
                              null
                        }
                        {
                           this.props && this.props.sizes.length > 0 ?
                              <div className="row">
                                 <div className="col-sm-12 col-md-12 col-lg-8" >
                                    <h6 className="title-attr"><strong>SIZE -</strong> <span>{this.state.size}</span>  <span><a href="" className="text-capitalize size-chart">size chart</a></span></h6>
                                    <ul className="marpad">
                                       {
                                          this.props.sizes.map((s, i) => (
                                             <li className={this.state.size === s ? "attr2 active" : "attr2"} key={i} onClick={e => this.handleClick(e, 'size', '', s)}>{s}</li>
                                          ))
                                       }
                                    </ul>
                                 </div>
                              </div>
                              :
                              null
                        }
                        {
                           <div className="row">
                              <div className="col-sm-12 mar-top">
                                 <h6 className="title-attr"><strong>QTY</strong></h6>
                                 <div className="qty">
                                    <div className="btn-minus"><span className="glyphicon glyphicon-minus" name="qty" onClick={e => this.handleClick(e, 'qty', 'less')}>-</span></div>
                                    <input value={this.state.qty} className="qty-width" onChange={e => this.handleClick(e, 'qty', 'less')} />
                                    <div className="btn-plus"><span className="glyphicon glyphicon-plus" name="qty" onClick={e => this.handleClick(e, 'qty', 'add')}>+</span></div>
                                    {
                                       selectedVariant && selectedVariant.availability && Object.keys(selectedVariant.availability).length > 0 && selectedVariant.availability.isOnStock ?
                                          <span className="instock text-capitalize">in stock</span>
                                          :
                                          <span className="outstock text-capitalize">out of stock</span>
                                    }
                                 </div>
                              </div>
                           </div>
                        }

                        <div className="row" >
                           <div className="col-sm-12 mar-top" >
                              <div className="form-check form-check-inline">
                                 <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                 <label className="form-check-label" /*for="inlineRadio1" */><small><strong>Ship to Address</strong></small></label>
                              </div>
                              <div className="form-check form-check-inline">
                                 <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                 <label className="form-check-label" /*for="inlineRadio2"*/>
                                    <small><strong>Pick-up in Store</strong></small>
                                    <div><small>Town East Mall <a href="#" className="underline">Change</a></small></div>
                                 </label>
                              </div>
                           </div>
                        </div>

                        {
                           this.state.modal ?
                              <div>
                                 <Modal className="modal-md" isOpen={this.state.modal} toggle={this.toggle}>
                                    <ModalHeader toggle={this.toggle}><span>{this.props.cart.lineItems[this.props.cart.lineItems.length - 1].quantity}</span> Item Added In The Cart</ModalHeader>
                                    <div className="modal-body cart-modal">
                                       <div className="row">
                                          <div className="col-sm-12 col-md-6 col-lg-4">
                                             <div><img className="img-fluid d-block lazy" src={this.props.cart.lineItems[this.props.cart.lineItems.length - 1].variant.images[0].url} alt="assets/img/errorimage.jpg" /></div>
                                          </div>
                                          <div className="col-sm-12 col-md-6 col-lg-8">
                                             <div className="title">{this.props.cart.lineItems[this.props.cart.lineItems.length - 1].name.en}</div>
                                             <div className="price pdbottom">
                                                <span className="Strikethrough">{formatterService.formatCurrency(this.props.cart.lineItems[this.props.cart.lineItems.length - 1].totalPrice.centAmount, this.props.cart.lineItems[this.props.cart.lineItems.length - 1].totalPrice.currencyCode)}</span>
                                                <span> <strong>{formatterService.formatCurrency(this.props.cart.lineItems[this.props.cart.lineItems.length - 1].totalPrice.centAmount, this.props.cart.lineItems[this.props.cart.lineItems.length - 1].totalPrice.currencyCode)}</strong></span>
                                             </div>
                                             <div className="cart-discount">Buy One, GEt one 50%</div>
                                          </div>
                                       </div>
                                       <hr />
                                       <div className="row mar-top" >
                                          <div className="col-sm-6">
                                             <div className="text-capitalize"><strong>Your cart: {this.props.cart.lineItems[this.props.cart.lineItems.length - 1].quantity} items</strong></div>
                                             <p className="text-uppercase cart-discount fsize">free shipping orders over $20</p>
                                          </div>
                                          <div className="col-sm-6">
                                             <span className="text-capitalize"><strong>subtotal:</strong></span> <span> <strong>{formatterService.formatCurrency(this.props.cart.lineItems[this.props.cart.lineItems.length - 1].totalPrice.centAmount, this.props.cart.lineItems[this.props.cart.lineItems.length - 1].totalPrice.currencyCode)}</strong></span>
                                          </div></div>
                                       <div className="row">
                                          <div className="col-sm-12">
                                             <button type="button" color="primary" style={{ marginRight: "15px" }} className="btn btn-secondary text-uppercase btn-size" onClick={e => this.onGoToCart(e)}>go to cart</button>
                                             <button type="button" className="btn btn-primary  text-uppercase btn-size pd15" onClick={this.continueShopping}>continue shopping</button>
                                          </div>
                                       </div>
                                    </div>
                                 </Modal>
                              </div>
                              :
                              null
                        }

                        {
                           selectedVariant && selectedVariant.availability && Object.keys(selectedVariant.availability).length > 0 && selectedVariant.availability.isOnStock ?
                              <div className="row">
                                 <div className="col-sm-12 mar-top">
                                    <button type="button" className={this.state.addClass === false ? "btn btn-primary  btn-block col-sm-5 text-uppercase btn-size " : "btn btn-secondary text-uppercase btn-block col-sm-6 disabled"} onClick={this.addToCart}>Add to cart</button>
                                 </div>
                              </div>
                              :
                              <div className="row">
                                 <div className="col-sm-12 mar-top">
                                    <form className="form-inline" action="">
                                       <input type="text" className="form-control mb-2 mr-sm-2 col-5" id="email2" placeholder="Enter email" name="email" />
                                       <button type="submit" className="btn btn-primary mb-2 text-uppercase  notefyme">notify me</button>
                                    </form>
                                 </div>
                              </div>
                        }
                        <div className="row">
                           <div className="col-sm-12">
                              {/* <button type="button" className="btn btn-secondary text-uppercase btn-size mr-sm-2 disabled">Add to wishlists</button> */}
                              <button type="button" className="btn btn-secondary text-uppercase btn-size mr-3">Add to wishlist</button>
                              <button type="button" className="btn btn-secondary text-uppercase btn-size">Add to registry</button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <h4 className="like">You may also like</h4>
                  {
                     this.props && this.props.home && Object.keys(this.props.home).length > 0 && this.props.home.homeData && Object.keys(this.props.home.homeData).length > 0 && this.props.home.homeData.bestSeller && this.props.home.homeData.bestSeller.length > 0 ?
                        <Carousel responsive={responsive}>
                           {
                              this.props.home.homeData.bestSeller.map((s, i) => {
                                 return (
                                    <a href="" key={i} onClick={e => this.aahandleClick(e, s.link)}>
                                       <div className="text-center bs-section">
                                          <div className="best-seller-image">
                                             <img src={s.sourceImage} alt="assets/img/errorimage.jpg" className="lazy img-fluid" />
                                          </div>
                                          <div className="title text-capitalize">{s.title}</div>
                                          <div className="price"><span className="Strikethrough">{formatterService.formatCurrency(s.finalPrice, s.currencyCode)}</span> <span> <strong>{formatterService.formatCurrency(s.finalPrice, s.currencyCode)}</strong></span></div>
                                          <div className="discount">{s.offer}</div>
                                       </div>
                                    </a>
                                 )
                              })
                           }
                        </Carousel>
                        :
                        null
                  }
                  <FooterLink />
               </main>
            </React.Fragment>
         )
      }
      else {
         return (
            <Loader />
         )
      }
   }
}

export default connect(state => state)(ProductDisplayPage)