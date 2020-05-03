import React, { Component } from 'react';
import Router from 'next/router'
import Carousel from 'react-multi-carousel'
// import 'react-multi-carousel/lib/styles.css'
import Link from 'next/link'
import {formatterService} from '../../../../_helper/formatterService'



class BestSeller extends Component {
    constructor(props){
        super(props)
    }
    handleClick = (e, link) => {
        e.preventDefault()
        Router.push('/p/[slug]', `/p/${link}`)
    }

    render(){
        const responsive = {
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 5,
            },
            tablet: {
              breakpoint: { max: 1023, min: 768 },
              items: 3,
            },
            mobile: {
              breakpoint: { max: 767, min: 0 },
              items: 1,
            },
        };
        
        return (
            <React.Fragment>
                <section className="bestSellerSection">
                    <h4>Best Sellers</h4>
                    {
                        this.props && this.props.data && Object.keys(this.props.data).length > 0 && this.props.data.bestSeller && this.props.data.bestSeller.length > 0 ?
                        <Carousel responsive={responsive}>
                            {
                            this.props && this.props.data && Object.keys(this.props.data).length > 0 && this.props.data.bestSeller && this.props.data.bestSeller.length > 0 ?
                                this.props.data.bestSeller.map((s, i) => {
                                    return (
                                        <a href="" key={i} onClick={e => this.handleClick(e, s.link)}>
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
                                :
                                null
                        }
                        </Carousel>
                        :
                        null
                    }
                    
                        
                </section >
                <section className="bestSeller container-fluid">
                    <div className="row">
                        {
                            this.props.data && this.props.data.uniBestSeller && this.props.data.uniBestSeller.length > 0 ?
                                this.props.data.uniBestSeller.map((s, i) => {
                                    return (
                                        <div className="col-sm-12 col-md-4 col-lg-4" key={i}>
                                            <div><img src={s.sourceImage} className="lazy" alt="assets/img/errorimage.jpg" /></div>
                                            <div className="bestSellerBox">
                                                <p>
                                                    <a /*href="#"*/>{s.bestSellerType}</a>
                                                </p>
                                                <p className="bsSublink"><a /*href="#"*/>Activewear</a> / <a /*href="#"*/>Tees</a> / <a /*href="#"*/>Jeans</a> / <a /*href="#"*/>Dresses</a></p>
                                            </div>
                                        </div>
                                    )
                                })
                            :
                            null
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default BestSeller