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

const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9]
class ProductDisplayPage extends Component {
    constructor(props) {
        super(props)
        
        this.state={ 
            size : '',
            color : '',
            qty : 1,
            loader : false,
            modal : false,
            addClass : false
        }

        this.addToCart = this.addToCart.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {selectedVariant} = nextProps

        if(selectedVariant && 
                selectedVariant.attributes && 
                selectedVariant.attributes.length > 0
                
                ){
                const color = selectedVariant.attributes.filter (attr => attr.name == 'color')[0]
                const size = selectedVariant.attributes.filter (attr => attr.name == 'size')[0]
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

    handleClick = (e) => {
        

        if (e.target.name === 'size') {
            this.props.findVariant(this.props.record, e.target.value, this.state.color)
        }else if(e.target.name === 'qty'){
            this.setState({qty : e.target.value})
        }
         else {
            this.props.findVariant(this.props.record, this.state.size, e.target.value)
        }   

    }

    toggle = () => {
        const {modal} = this.state
        this.setState({modal : !modal})
    }

    onGoToCart = (e) => {
        e.preventDefault()
        Router.push(`/cart`, `/cart`)
    }

    async addToCart(product, size, color, quantity) {
        // const selectedVariant = this.findVariant(product, size, color)
        const localstore = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null
        const {modal, loader, addClass} = this.state
        const {selectedVariant} = this.props
        const header = {
            productId : this.props.pdp.current.id,
            variantId : selectedVariant.id,
            quantity : parseInt(this.state.qty),
            Authorization : `Bearer ${localstore.access_token}` 
        }

        // console.log('selectedVariantselectedVariant>>>>',selectedVariant)
        // console.log('headerheader<<<<<',header)

        if (selectedVariant) {
            // call api to add to cart
                this.setState({addClass : !addClass})
                const addToCartData = await productService.getCartData(header)
                if(addToCartData && addToCartData.status !== 200){
                    alert('item cannot added due to some error please try again')
                }else{
                    this.props.dispatch(startAddToCart(addToCartData))
                    if(addToCartData && addToCartData.data && Object.keys(addToCartData.data).length > 0){
                        this.setState({
                            modal : !modal,
                            addClass : false
                        })
                    }
                }
                // console.log('addToCartDataaddToCartDataaddToCartDataaddToCartData>>>>',addToCartData)
            // 1. dispatch an action
                // this.props.dispatch(startAddToCart(addToCartData))
                
           
            // 2. 
        }
    }

    // addToCart = (e) => {
    //     const aa = this.props.findVariant(this.props.record, this.state.size, this.state.color)
    //     // console.log('aaaaaaaaaaaaaa>>>>>>',aa)
    // }
    
    render() {
        
        const { selectedVariant, record} = this.props
        // var modelData = this.props && this.props.cart && Object.keys(this.props.cart).length > 0 ?  this.props.cart.lineItems.filter(r => r.productId === this.props.pdp.current.id && r.variant.id === this.props.selectedVariant.id) : {}
        // console.log('modelData>>',modelData)
        if (record && selectedVariant && Object.keys(record).length > 0 && Object.keys(selectedVariant).length > 0 && !this.state.loader && !this.props.pdp.loader) {
            return (
                
                <div key={record.id} className="container mainDiv">
                    <Col md="12">
                        <BreadCrumb breadcrumb={this.props.breadcrumb} cart={this.props.pdp}/>
                    </Col>
                    <Row>
                        <Col md="5" className="pdpInner">
                            <div className="pdpInnerData">
                                <Card className="pdpProdImg">
                                    <CardImg top width="100%" src={selectedVariant.images[0].url}  alt="Card image cap" />
                                    
                                </Card>
                            </div>
                        </Col>
                        <Col md="7" className="pdpInner">
                            <div className="pdpInnerData">
                                <Card className="border-0">
                                    <CardBody className="pl-0 pt-0">
                                        <CardTitle className="font-weight-bold">{record.name.en}</CardTitle>
                                        <hr />
                                        <CardText className="pdpPrice">
                                            <span className="pdpPriceNew">Price : € {selectedVariant.price && selectedVariant.price.value && Object.keys(selectedVariant.price.value).length > 0 ? selectedVariant.price.value.number : ''} </span>
                                        </CardText>
                                        <CardText>{record && record.description !=null ? record.description.en : '' }</CardText>
                                        <Form>
                                            <Row>
                                                <Col md="4">
                                                    <FormGroup>
                                                        
                                                        {
                                                            this.props && this.props.sizes.length > 0 ?
                                                            <React.Fragment>
                                                            <Label for="exampleSelect" className="font-weight-bold text-uppercase pdpCategoriesHeading">Size</Label>
                                                            <Input type="select" name="size" id="sizeSelect" style={{ width: "100px" }} onChange={e => this.handleClick(e)}>
                                                                {
                                                                    this.props.sizes.map((s,i) => (
                                                                    <option key={i}>{s}</option>
                                                                    ))
                                                                }
                                                            </Input>
                                                            </React.Fragment>
                                                            :
                                                            null
                                                        }
                                                    </FormGroup>
                                                </Col>
                                                <Col md="4">
                                                    
                                                    {
                                                        this.props && this.props.sizes.length > 0 ?
                                                            <React.Fragment>
                                                                <Label for="exampleSelect" className="font-weight-bold text-uppercase pdpCategoriesHeading">Color</Label>
                                                                <Input type="select" name="color" id="colorSelect" style={{ width: "100px" }} onClick={e => this.handleClick(e)}>
                                                                    {
                                                                        this.props.colors.map((s, i) => (
                                                                            <option key={i} >{s}</option>
                                                                        ))
                                                                    }
                                                                </Input>
                                                            </React.Fragment>
                                                            :
                                                            null
                                                    }
                                                    
                                                </Col>
                                                <Col md="4">
                                                    <Label for="exampleSelect" className="font-weight-bold text-uppercase pdpCategoriesHeading">Qty</Label>
                                                    <Input type="select" name="qty" id="qtySelect" style={{ width: "100px" }} onClick={e => this.handleClick(e)}>
                                                        {
                                                            qty.map((s,i) => (
                                                                <option key={i} >{s}</option>
                                                            ))
                                                        }
                                                    </Input>
                                                </Col>
                                            </Row >
                                        </Form>
                                        {/* <CardText className="font-weight-bold text-uppercase pdpCategoriesHeading">Select Size</CardText> */}
                                        <CardText className="pdpSelectSize pb-2">
                                            {/* {
                                            pdp.pdpDeatils.sizes.map((size) => {
                                                return (
                                                    <span className="rounded-circle" key={size}>{size}</span>
                                                )
                                            })
                                        } */}
                                        </CardText>
                                        <CardText className="pdpProdColor"></CardText>

                                        {
                                            this.state.modal ? 
                                                <div>
                                                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                                  <ModalHeader toggle={this.toggle}>Your Item Added In The Cart</ModalHeader>
                                                  <ModalBody>
                                                      <img src={this.props.cart.lineItems[this.props.cart.lineItems.length-1].variant.images[0].url} style={{height : "100px"}}/>
                                                    <span style={{margin : "10px"}}><b>{this.props.cart.lineItems[this.props.cart.lineItems.length-1].name.en}</b></span><br/>
                                                    <span style={{margin : "85px"}}>Price : {formatterService.formatCurrency(this.props.cart.lineItems[this.props.cart.lineItems.length-1].totalPrice.centAmount, this.props.cart.lineItems[this.props.cart.lineItems.length-1].totalPrice.currencyCode)}</span><br/>
                                                    <span style={{margin : "85px"}}>Qty : {this.props.cart.lineItems[this.props.cart.lineItems.length-1].quantity}</span>
                                                  </ModalBody>
                                                  <ModalFooter>
                                                    <Button color="primary" ><a href ='/cart' onClick={e => this.onGoToCart(e)}>Go To Cart</a></Button>
                                                    <Button color="secondary" onClick={this.toggle}>Checkout</Button>
                                                  </ModalFooter>
                                                </Modal>
                                              </div>
                                              :
                                              null
                                        }
                                         
                                        <CardText className="pdpCartWishList">
                                            {/* <button className="pdpAddToCartBtn border-0" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </button> */}
                                        <span className="pdpAddToCartBtn"><Button className="border-0" onClick={this.addToCart}> <span className={this.state.addClass === false ? "pl-2" : "pl-2 spinner-border spinner-border-sm"}>{this.state.addClass === false ? "Add to Cart" : ''}</span></Button></span>
                                            <span className="pl-3 pdpAddToWishListBtn"><Button> <span className="pl-2">Add to Wishlist</span></Button></span>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <FooterLink />
                </div>
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
