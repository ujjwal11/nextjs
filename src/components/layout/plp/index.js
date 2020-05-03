import React from 'react';
import Facets from "./facets"
import {Collapse} from 'reactstrap';
import {formatterService} from "../../../_helper/formatterService"
import Router from 'next/router'
import facetConfig from "../../../_helper/constant"
import BreadCrumb from "../../../Breadcrumb"
import SkeletonData from "../../../Skeleton"
import {connect} from 'react-redux'
import {startSelectedFacets} from '../../../store/shared/actions'
import {startRecommended} from '../../../containers/Plp/actions'
import {multiplevarReturn} from '../../../_helper/plpUrl'
import FooterLinks from "../../../../src/components/layout/home/footerLinks/index"
import {sendDataToTagManager} from '../../../_helper/helper'

class ProductListPage extends React.Component {
  constructor(props){
    super(props)

    this.state={
      isOpen : [false, false, false, false],
      tooltipOpen : false,
      recommended : '',
      openRecommendedDropDown : false
    }
  }

  handleClick = (e, link) => {
    e.preventDefault()
    sendDataToTagManager(
      {
        'event': 'select_item',
        'ecommerce': {
          'items': [{
            'item_name': 'productObj.name',
            'item_id': 'productObj.id',
            'item_brand': 'productObj.brand',
            'item_category': 'productObj.category',
            'item_variant': 'productObj.variant',
            'item_list_name': 'productObj.list_name',
            'item_list_id': 1,
            'index': 0,
            'quantity': 1,
            'price': "350.0"
          }]
        }
      }
    )
    Router.push('/p/[slug]', `/p/${link}`)
  }

  handleDropDownClick = (e) => {
    e.preventDefault()
    const {openRecommendedDropDown} = this.state
    this.setState({
      openRecommendedDropDown : !openRecommendedDropDown
    })
  }

  toggle = (e, index) => {
    const {isOpen} = this.state    
    isOpen[index] = !isOpen[index];
    this.setState({ isOpen: isOpen });
  }

  toolTipToggle = () => {
    const {tooltipOpen} = this.state
    this.setState({tooltipOpen : !tooltipOpen})
  }

  Recommended = (e, s) => {
    // console.log('sssssssssssssssssss',s)
    const data = {
      categoryid : this.props.query.categoryid,
      subcategoryId : this.props.query.subcategoryId,
      childCatId : this.props.query.childCatId,
      recommendData :  `${s.lowerEndpoint}-${s.upperEndpoint}`
    }
    this.props.dispatch(startRecommended(data))
    this.setState({
      recommended : e.target.text
    })

  }

  removeSelectedFacets = (e, data, index, selectedFacets, ctxQuery) => {
    // console.log('eeeeeeeeeeeeeeeeee>>>',e)
    // console.log('data>>>',data)
    // console.log('index>>>',index)
    // console.log('selectedFacets>>>',selectedFacets)
    // console.log('ctxQuery>>>',ctxQuery)
    const pathName = window ? window.location.pathname : null
    const { category, catIdORKey } = this.props
    const removeData = {
      key : data[1][0],
      value : data[0],
      remove : true
    }
    this.props.dispatch(startSelectedFacets(removeData))
    const url = multiplevarReturn(selectedFacets)
    const strQues = url ? "?" : ''
    if(this.props.query && this.props.query.param){
      // console.log(this.props.query)
      Router.push(
        `/search/[param]?${url.substr(1)}`,
        `/search/${this.props.query.param}${strQues}${url.substr(1)}`,
      )
    }
    else{
      Router.pushRoute(
        `${pathName}${strQues}${url.substr(1)}`,
        `${pathName}${strQues}${url.substr(1)}`
      )
    }
  }

  render() {
    const { plp } = this.props
    const brandTypeName = this.props.breadcrumb[this.props.breadcrumb.length - 1]
    if(plp && plp.length > 0){
      return (
        <main role="main" className="container-p-3 mainDiv">
          <BreadCrumb breadcrumb={this.props.breadcrumb}/>
          <div className="container-fluid prodLists">
            <div className="custome-checkbox plp">
              <div className="row">
                <div className="col-sm-12 col-md-4 col-lg-3">
                  <div className="plp-left ">
                    <div className="col-sm-12 filters text-uppercase"><span><strong>Filters</strong></span><span className="pull-right"><span>{this.props.totalData}</span> Results</span></div>
                    {/* <div className="card">
                      <header className="card-header">
                        <a href="#" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" className="">
                          <i className="icon-action fa fa-chevron-down"></i>
                          <span className="title">Pick up store</span>
                        </a>
                      </header>
                      <div className="collapse show" id="collapse1" >
                        <ul>
                          <li>
                            <label className="container">Town East Mall <a href="#">Change</a><input type="checkbox" checked="checked" /><span className="checkmark"></span></label>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                    {/* <div className="card">
                      <header className="card-header">
                        <a href="#" data-toggle="collapse" data-target="#collapse2" aria-expanded="true" >
                          <i className="icon-action fa fa-chevron-down"></i>
                          <span className="title">Categories</span>
                        </a>
                      </header>
                      <div className="collapse show" id="collapse2">
                        <ul>
                          <li>Shirts</li>
                          <li>Sweaters & Hoodies</li>
                          <li>Vests</li>
                          <li>T-Shirts</li>
                        </ul>
                      </div>
                    </div> */}
                    
                    
                    {/* {
                      this.props && this.props.selectedFacets && Object.keys(this.props.selectedFacets).length > 0 ?
                        <React.Fragment>
                          <a className="facet-heading" >SelectedFacet</a>
                          <Collapse isOpen={true}>
                            {
                              Object.entries(this.props.selectedFacets).map((s, i) => (
                                s && s[1][0] !== undefined ?
                                  <div key={i}>
                                    <p className="facetsInternalLinks" style={{ paddingLeft: "20px" }} onClick={e => this.removeSelectedFacets(e, s, i, this.props.selectedFacets, this.props.ctxQuery)}>{facetConfig[s[0]].toUpperCase()} - {s[1][0]}</p>
                                  </div>
                                  :
                                  ''
                              ))
                            }
                          </Collapse>
                        </React.Fragment>
                        :
                        ''
                    } */}
                    {
                      this.props && this.props.selectedFacets && Object.keys(this.props.selectedFacets).length > 0 ?
                        <div className="card">
                          <header className="card-header">
                            <i className="icon-action fa fa-chevron-up"></i>
                            <span className="title">Applied Filters</span>
                            <Collapse isOpen={true}>
                              <div className="collapse show mb-2" id="collapse3">
                                <ul className="facet">
                                  {
                                    Object.entries(this.props.selectedFacets).map((s, i) => (
                                      s && s[1][0] !== undefined ?
                                        <div key={i}>
                                          <li>{facetConfig[s[0]].toUpperCase()} - {s[1][0]}</li>
                                          <span className="facet cross" key={i} onClick={e => this.removeSelectedFacets(e, s, i, this.props.selectedFacets, this.props.ctxQuery)}><i className="fa fa-times "></i></span>
                                        </div>
                                        :
                                        ''
                                    ))
                                  }
                                </ul>
                              </div>
                            </Collapse>
                          </header>
                        </div>
                        : null
                    }
                    
                    {
                      this.props.facetsFilter && this.props.facetsFilter.map((facet, index) => {
                        return (

                          <div className="card" key={index}>
                            <header className="card-header">
                              <i className={this.state.isOpen[index] ? "icon-action fa fa-chevron-up" : "icon-action fa fa-chevron-down"} id={index} onClick={(e) => this.toggle(e, index)}></i>

                              <span className="title">{facetConfig[Object.keys(facet)[0]].toUpperCase()}</span>
                              <Collapse isOpen={this.state.isOpen[index]}>
                                <Facets
                                  key={index}
                                  name={Object.keys(facet)[0]}
                                  terms={facet && facet[Object.keys(facet)].terms ? facet[Object.keys(facet)].terms : facet[Object.keys(facet)].ranges}
                                  catIdORKey={this.props.catIdORKey}
                                  query={this.props.query}
                                  path={this.props.path}
                                  ctxQuery={this.props.ctxQuery}

                                />
                              </Collapse>
                            </header>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="col-sm-12 col-md-8 col-lg-9">
                  <div className="row mar-top">
                    <div className="col-4  col-md-8 col-lg-9 ">
                      <h4>{brandTypeName && Object.keys(brandTypeName).length > 0 ? brandTypeName.name : ''}</h4>
                    </div>
                    {
                      this.props.recommended && this.props.recommended.length > 0 ?
                      this.props.recommended.map((fac, index) => {
                        return(
                          <div className="col-8 col-md-4 col-lg-3" key={index}>
                              <div className="dropdown" onClick={e => this.handleDropDownClick(e)}>
                                <button type="button" className="recommend-btn btn-block text-left dropdown-toggle" data-toggle="dropdown">
                                  {
                                    this.state.recommended ? this.state.recommended : 'Recommended'
                                  }
                                </button>
                                
                                <div className={this.state.openRecommendedDropDown ? "dropdown-menu show" : "dropdown-menu"} >
                                  {
                                    fac[Object.keys(fac)].ranges.map((s,i) => (
                                      s && s.productCount > 0 ?
                                      <a className="dropdown-item" onClick={e => this.Recommended(e, s)} key={i}>{s.lowerEndpoint == null ? 'min' : formatterService.formatCurrency(s.lowerEndpoint, 'EUR')}-{s.upperEndpoint == null ? 'max' : formatterService.formatCurrency(s.upperEndpoint, 'EUR')}</a>
                                      :
                                      ''
                                    ))
                                  }
                                </div>
                              </div>
                            </div>
                        )
                      })
                            :
                            null
                    }
                            
                  </div>
                  
                  <div className="">
                    <ul className="list-inline">
                        {
                          plp.map((item, index) => (
                            <li className="list-inline-item" key={index}>
                             
                            <div className="best-seller-image">
                            <div className="demo">Demo</div>
                            <img className="img-fluid" src={item.masterVariant.images[0].url} alt="assets/img/errorimage.jpg" onClick={e => this.handleClick(e, item.slug.en)}/>
                            
                            </div>
                            <div className="pt-3">
                            <div className="title text-capitalize" onClick={e => this.handleClick(e, item.slug.en)}>{item.name.en}</div>
                            <div className="price"><span className="Strikethrough">{formatterService.formatCurrencyIcon(item.masterVariant.price.value.number)}</span> <span> <strong>{formatterService.formatCurrencyIcon(item.masterVariant.price.value.number)}</strong></span></div>
                            <div className="discount">sale</div>
                            </div>
                          </li>
                          ))
                        }
                    </ul>
                  </div>
                  <div className="col-12">
                    <ul className="pagination pagination-sm justify-content-center">
                    {
                        this.props.page === 1 ?
                          null
                          :
                          <li className="page-item"><a className="page-link" onClick={(e) => this.props.handlePagination(this.props.page, this.props.offset, this.props.totalPages, "preClick")}>Previous</a></li>
                    }
                      
                      <li className="page-item"><a className="page-link" >{this.props.page}</a></li>
                      
                      {
                      this.props.page === this.props.totalPages ?
                        null
                        :
                        <li className="page-item"><a className="page-link" onClick={(e) => this.props.handlePagination(this.props.page, this.props.offset, this.props.totalPages, "nextClick")}>Next</a></li>
                    }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <FooterLinks />
          </div>
        </main>
      )
    }
    else {
      return (
        <SkeletonData /> 
      )
    }
  }
}

export default connect(state => state)(ProductListPage)