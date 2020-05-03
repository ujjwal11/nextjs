import React,{ useState } from "react"
import Router from 'next/router'

const FooterLinks = (props) => {

    const [isOpenMobFooter, SetIsOpenMobFooter] = useState(false)
    const [isOpenMobFooter1, SetIsOpenMobFooter1] = useState(false)
    const [isOpenMobFooter2, SetIsOpenMobFooter2] = useState(false)

    const openMobileFooter = (e, index) => {
        SetIsOpenMobFooter(!isOpenMobFooter)
    }
    const openMobileFooter1 = (e, index) => {
        SetIsOpenMobFooter1(!isOpenMobFooter1)
    }
    const openMobileFooter2 = (e, index) => {
        SetIsOpenMobFooter2(!isOpenMobFooter2)
    }
    const handleFooterClick = (e) => {
        e.preventDefault()
        const url = e.target.innerText.replace(" ", "-").toLowerCase()
        Router.push(`/_cs/[footerPage]`, `/_cs/${url}`)
    }
    const goToLucid = (e) => {
        e.preventDefault()
        Router.push(`/lucid/home`, `/lucid/home`)
    }

    const handleChange = (e) => {
        if (e.keyCode === 13) {
            const value = e.target.value
            Router.push('/bloomreach/[param]', `/bloomreach/${value}`);
        }
    }

    return (
        <React.Fragment>
            {/* <div className="floatRoght">
                <a className="navbar-brand"href="#"><img src="/assets/img/logo.jpg" alet="Logo" width="45" /></a>
            </div> */}
            <section className="footerLinks">
                <hr />
                <div className="container-fluid">
                    <div className="row ">
                        <div className={isOpenMobFooter ? "ftr__list nav col-sm-12 col-md-3 col-lg-3 open" : "ftr__list nav col-sm-12 col-md-3 col-lg-3"} onClick={e => openMobileFooter(e, 0)}>
                            <h4>For You</h4>
                            <ul>
                                <li><a /*href="#"*/>Content &amp; Events</a></li>
                                <li><a /*href="#"*/>Wishlist</a></li>
                                <li><a /*href="#"*/>Request A Catalog</a></li>
                                <li><a /*href="#"*/>Gift Cards</a></li>
                                <li><a /*href="#"*/>Ally Rewards</a></li>
                                <li><a /*href="#"*/>Blog</a></li>
                            </ul>
                        </div>
                        <div className={isOpenMobFooter1 ? "ftr__list nav col-sm-12 col-md-3 col-lg-3 open" : "ftr__list nav col-sm-12 col-md-3 col-lg-3"} onClick={e => openMobileFooter1(e, 1)}>
                            <h4>Guest Services</h4>
                            <ul>
                                <li><a /*href="#"*/>Order Status</a></li>
                                <li><a /*href="#"*/>Returns &amp; Exchange</a></li>
                                <li><a /*href="#"*/>Billing/Shipping</a></li>
                                <li><a onClick={e => goToLucid(e)}>Order Info</a></li>
                                <li><a /*href="#"*/>Store Locator</a></li>
                                <li onClick={e => handleFooterClick(e)}><a href="">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className={isOpenMobFooter2 ? "ftr__list nav col-sm-12 col-md-3 col-lg-3 open" : "ftr__list nav col-sm-12 col-md-3 col-lg-3"} onClick={e => openMobileFooter2(e, 2)}>
                            <h4>Company</h4>
                            <ul>
                                <li onClick={e => handleFooterClick(e)}><a href="">About Us</a></li>
                                <li onClick={e => handleFooterClick(e)}><a href="">Careers</a></li>
                                <li onClick={e => handleFooterClick(e)}><a href="" className="colortest">Terms of Use</a></li>
                                <li onClick={e => handleFooterClick(e)}><a href="">Privacy &amp; Cookie Policy</a></li>
                                <li onClick={e => handleFooterClick(e)}><a href="">Sitemap</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3 newsLetter">
                            <div className="form-group footer-search">
                                <label>Sign up for the news, sale &amp; offers</label><br />
                                <input type="text" label='test' className="form-control" placeholder="Enter your email address" onKeyUp={e => handleChange(e)}/>
                                <span className="fa fa-long-arrow-right form-control-feedback"></span>
                            </div>
                            <div className="form-group footer-search">
                                <label>Find a Store</label><br />
                                <input type="text" className="form-control" label="city/zipcode" placeholder="Enter city or zipcode" />
                                <span className="fa fa-long-arrow-right form-control-feedback"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="d-flex justify-content-end mb-3 container-fluid">
                <a /*href="#"*/><i className="fa fa-pinterest-square fa-2x"></i></a>
                <a /*href="#"*/><i className="fa fa-facebook-square fa-2x pd15"></i></a>
                <a /*href="#"*/><i className="fa fa-google-plus-square fa-2x pd15"></i></a>
                <a /*href="#"*/><i className="fa fa-twitter-square fa-2x pd15"></i></a>
                <a /*href="#"*/><i className="fa fa-youtube-square fa-2x pd15"></i></a>
                <a /*href="#"*/><i className="fa fa-rss-square fa-2x pd15"></i></a>
            </div>
        </React.Fragment>
    )
}

export default FooterLinks