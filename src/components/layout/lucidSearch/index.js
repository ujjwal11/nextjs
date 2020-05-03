import React from 'react'
import FooterLinks from "../../../../src/components/layout/home/footerLinks/index"
import {Collapse} from 'reactstrap';
import Facets from "./facets"
import {formatterService} from "../../../_helper/formatterService"

class LucidSearch extends React.Component {
    constructor(props){
        super(props)

        this.state={
            isOpen : [false, false, false, false],
        }
    }

    toggle = (e, index) => {
        const {isOpen} = this.state    
        isOpen[index] = !isOpen[index];
        this.setState({ isOpen: isOpen });
    }
    render() {
        // console.log('this.props<<<<<<<',this.props)
        const bannerImages = this.props.lucidSearchData && Object.keys(this.props.lucidSearchData) && this.props.lucidSearchData.fusion && Object.keys(this.props.lucidSearchData.fusion).length > 0 && this.props.lucidSearchData.fusion.applicable_rules && this.props.lucidSearchData.fusion.applicable_rules.length > 0 ? this.props.lucidSearchData.fusion.applicable_rules : []
        const Category_page = this.props.lucidSearchData && Object.keys(this.props.lucidSearchData) && this.props.lucidSearchData.fusion && Object.keys(this.props.lucidSearchData.fusion).length > 0 && this.props.lucidSearchData.fusion.Category_page && this.props.lucidSearchData.fusion.Category_page.toString() === "true" ? true : false
        const cat_Label = this.props.lucidSearchData && Object.keys(this.props.lucidSearchData) && this.props.lucidSearchData.facet_counts && Object.keys(this.props.lucidSearchData.facet_counts).length > 0 ? Object.keys(this.props.lucidSearchData.facet_counts.facet_fields) : ''
        // console.log('cat_Labelcat_Label', cat_Label)
            if (this.props.lucidSearchData && Object.keys(this.props.lucidSearchData).length > 0) {
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
                                                cat_Label && cat_Label.map((s,i) => (

                                                    <div className="card" key={i}>
                                                        <header className="card-header">
                                                            <a data-toggle="collapse" data-target="#collapse3" aria-expanded="true" >
                                                            <i className={this.state.isOpen[i] ? "icon-action fa fa-chevron-up" : "icon-action fa fa-chevron-down"} onClick={(e) => this.toggle(e, i)}></i>
                                                            <span className="title">{s}</span>
                                                            </a>
                                                            <Collapse isOpen={this.state.isOpen[i]}>
                                                                <Facets
                                                                    data={[this.props.lucidSearchData.facet_counts.facet_fields].map((data,i) => ( data[s] ))}
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
                                        <div>
                                            {
                                                bannerImages && bannerImages.map((s, i) => (
                                                    s.display_type === "Banner" ?
                                                        <img key={i} style={{width : "100%"}} className="img-fluid mb-5" src={s.banner_url} />
                                                        :
                                                        null
                                                ))
                                            }
                                        </div>
                                        <div className="row mar-top">
                                        </div>
                                        {
                                            Category_page === true ?
                                            null
                                            :
                                            <div className="">
                                                <ul className="list-inline">
                                                    {
                                                        this.props.lucidSearchData.response.docs.map((item, index) => (
                                                            <li className="list-inline-item" key={index}>
                                                                <div className="best-seller-image">
                                                                    <img className="img-fluid" src={item.images_t} alt="assets/img/errorimage.jpg" />
                                                                </div>
                                                                <div className="pt-3">
                                                                    <div className="title text-capitalize" >{item.name_en_s}</div>
                                                                    <div className="price"><span> <strong>{formatterService.formatCurrencyIconUSD(item.prices_t)}</strong></span></div>
                                                                    <div className="discount">sale</div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        }
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
                    <React.Fragment />
                )
            }
    }
    
    
}

export default LucidSearch