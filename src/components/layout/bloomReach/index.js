import React, { useState } from 'react'
import {formatterService} from "../../../_helper/formatterService"
import FooterLinks from "../../../../src/components/layout/home/footerLinks/index"
import { Collapse} from 'reactstrap';
import Facets from './facets'

const BloomReach = (props) => {
  
    const cat_Label = props && props.bloomSearchData && Object.keys(props.bloomSearchData).length > 0 && props.bloomSearchData.facet_counts && Object.keys(props.bloomSearchData.facet_counts).length > 0 ? Object.keys(props.bloomSearchData.facet_counts.facet_fields) : ''
    const cat_Filter_Label = cat_Label && cat_Label.filter(function(r) {
      return r != "color_groups" && r != "reviews_count"
    })
    const all_facets = props && props.bloomSearchData && Object.keys(props.bloomSearchData).length > 0 && props.bloomSearchData.facet_counts && Object.keys(props.bloomSearchData.facet_counts).length > 0 ? props.bloomSearchData.facet_counts.facet_fields : {}
    const delete_value_from_facet = all_facets ? delete all_facets['color_groups'] && delete all_facets['reviews_count'] : ''

  if (props && props.bloomSearchData && Object.keys(props.bloomSearchData).length > 0) {
    return (
      <main role="main" className="container-fluid mainDiv">
        <div className="container-fluid prodLists">
          <div className="custome-checkbox plp">
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-3">
                <div className="plp-left ">
                  <div className="col-sm-12 filters text-uppercase"><span><strong>Filters</strong></span>
                    {/* <span className="pull-right"><span>{"this.props.totalData"}</span> Results</span> */}
                  </div>
                  {
                      cat_Filter_Label && cat_Filter_Label.map((s, i) => (

                        <div className="card" key={i}>
                          <header className="card-header">
                            <a data-toggle="collapse" data-target="#collapse3" aria-expanded="true" >
                              <i className={props.isOpen[i] ? "icon-action fa fa-chevron-up" : "icon-action fa fa-chevron-down"} onClick={(e) => props.toggle(e, i)}></i>
                              <span className="title">{s}</span>
                            </a>
                            <Collapse isOpen={props.isOpen[i]}>
                              <Facets
                                data={[all_facets].map((data, i) => (data[s]))}
                                catLabel={s}
                              />
                            </Collapse>
                          </header>
                        </div>
                      ))
                  }
                </div>
              </div>
              <div className="col-sm-12 col-md-8 col-lg-9">
                <div className="row mar-top">
                </div>
                {
                  props.bloomSearchData.response.docs.map((item, index) => (
                    <li className="list-inline-item" key={index}>
                      <div className="best-seller-image">
                        <img className="img-fluid" src={item.thumb_image} alt="assets/img/errorimage.jpg" />
                      </div>
                      <div className="pt-3">
                        <div className="title text-capitalize" >{item.title}</div>
                        <div className="price"><span className="Strikethrough">{formatterService.formatCurrencyIcon(item.price)}</span> <span> <strong>{formatterService.formatCurrencyIcon(item.sale_price)}</strong></span></div>
                        <div className="discount">sale</div>
                      </div>
                    </li>
                  ))
                }
              </div>
            </div>
          </div>
          <FooterLinks />
        </div>
      </main>
    )
  } else {
    return (
      <React.Fragment />
    )
  }
}

export default BloomReach