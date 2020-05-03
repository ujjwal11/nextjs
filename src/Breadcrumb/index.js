import React, { Component } from 'react';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem} from 'reactstrap';
import Router from "next/router"

class BreadCrumb extends React.Component {

    constructor(props){
        super(props)
        
        this.state={}
    }

    handleClick = (e,data) => {
        e.preventDefault()
        Router.pushRoute(data)
    }
    handleClickHome = (e) => {
        e.preventDefault()
        Router.pushRoute('/')
    }

    render() {
        // console.log('propsprops<<<<<', this.props)
        let hrefUrl = ''
        return (
            <React.Fragment>
                {/* <div> */}
                <Breadcrumb>
                    <BreadcrumbItem style={{fontSize: "12px"}}><a href="/" onClick={e => this.handleClickHome(e)}>Home</a></BreadcrumbItem>
                    {
                        this.props && this.props.breadcrumb && this.props.breadcrumb.length > 0 ?
                            
                            this.props.breadcrumb.map((data, i) => {
                                hrefUrl = hrefUrl+ '/' +data.slug
                                const Url = hrefUrl
                                return (
                                    <BreadcrumbItem style={{fontSize: "12px"}} key={i}><a href={`/products${hrefUrl}`} onClick={e => this.handleClick(e, `/products${Url}`)}>{data.name}</a></BreadcrumbItem>
                                )
                            })
                            :
                            null
                    }
                    {/* {
                        this.props.cart
                        && 
                        Object.keys(this.props.cart).length > 0 
                        && 
                        this.props.cart.current 
                        && 
                        Object.keys(this.props.cart.current).length > 0
                        ?
                        <BreadcrumbItem >{this.props.cart.current.name.en}</BreadcrumbItem>
                        :
                        ''
                    } */}
                    
                </Breadcrumb>
            </React.Fragment>
        )
    }
    
}

export default BreadCrumb