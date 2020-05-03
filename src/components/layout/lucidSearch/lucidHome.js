import React from 'react';
import FooterLinks from "../../../../src/components/layout/home/footerLinks/index"
import Carousel from 'react-multi-carousel'

class LucidHome extends React.Component{
    constructor(props){
        super(props)

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
        console.log('props in the last>>',this.props)
        if(this.props && this.props.lucidSearchData && Object.keys(this.props.lucidSearchData).length > 0){
            return(
                <main role="main" className="container-fluid mainDiv" >
                    {
                        this.props.lucidSearchData.fusion.applicable_rules.map((s, i) => (
                            s.display_type === "Banner" ?
                                <React.Fragment key={i} >
                                    <img className="img-fluid mb-5" src={s.banner_url} />
                                </React.Fragment>
                                :
                                ''
                        ))
                    }
                    <section className="bestSellerSection">
                        <h4>Best Sellers</h4>
                        {
                            this.props.lucidSearchData.response && Object.keys(this.props.lucidSearchData.response).length > 0 && this.props.lucidSearchData.response.docs && this.props.lucidSearchData.response.docs.length > 0 ?
                                <Carousel responsive={responsive}>
                                    {
                                        // this.props && this.props.data && Object.keys(this.props.data).length > 0 && this.props.data.bestSeller && this.props.data.bestSeller.length > 0 ?
                                        this.props.lucidSearchData.response.docs.map((s, i) => {
                                            return (
                                                <a href="" key={i} /* onClick={e => this.handleClick(e, s.link)} */ >
                                                    <div className="text-center bs-section">
                                                        <div className="best-seller-image">
                                                            <img src={s.images_t} alt="assets/img/errorimage.jpg" className="lazy img-fluid" />
                                                        </div>
                                                        <div className="title text-capitalize">{s.title}</div>
                                                        <div className="price"><span className="">{s.prices_t}</span></div>
                                                        {/* <div className="price"><span className="Strikethrough">{formatterService.formatCurrency(s.finalPrice, s.currencyCode)}</span> <span> <strong>{formatterService.formatCurrency(s.finalPrice, s.currencyCode)}</strong></span></div> */}
                                                        {/* <div className="discount">{s.offer}</div> */}
                                                    </div>
                                                </a>
                                            )
                                        })
                                        // :
                                        // null
                                    }
                                </Carousel>
                                :
                                null
                        }
                    </section >
                    <FooterLinks />
                </main>
            )
        }else{
            return(
                <React.Fragment />
            )
        }
    }
}

export default LucidHome