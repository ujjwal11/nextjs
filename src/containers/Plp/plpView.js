import React from 'react'
import ProductListPage from "../../components/layout/plp"
import {handleCat, stringHandle} from '../../_helper/helper'
import {connect} from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'

class PlpView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            page : props.page ? props.page : 1,
            offset : props.offset ? props.offset : 0,
            query: props.query,
            path: props.path,
            category:''
        }
        this.handlePagination = this.handlePagination.bind(this)
    }

    async handlePagination(page, offset, totalPages, type){
        const {categoryid, subcategoryId, childCatId} = this.props.query
        const catobj = handleCat(categoryid, subcategoryId, childCatId)
        const windowParam = window && Object.keys(window).length > 0 ? window : null
        const test = stringHandle(this.props.path)
        const catobj2 = handleCat(test.categoryid, test.subcategoryId, test.childCatId)
        if(page !== totalPages && type !== "preClick"){
            await this.setState({
                page: page + 1,
                offset : offset + 10,
                category: catobj ? catobj.category : catobj2.category
            })
        }
        else if(page > 1 && type === "preClick"){
            await this.setState({
                page: page - 1,
                offset : offset - 10,
                category: catobj ? catobj.category : catobj2.category
            })
        }
        if(this.props.query && this.props.query.param){
            Router.push(
                `/search/[param]?page=${this.state.page}&offset=${this.state.offset}`,
                `/search/${this.props.query.param}?page=${this.state.page}&offset=${this.state.offset}`,
                )
        }else{
            Router.push(
            `/products/category/categories?page=${this.state.page}&offset=${this.state.offset}`,
            `/products/${catobj2.url}?page=${this.state.page}&offset=${this.state.offset}`
            )
        } 
        windowParam.scrollTo(0,0)
    }

    async componentDidUpdate(prevProps, prevState) {
        const {categoryid, subcategoryId, childCatId, subChildCatId, page, offset, facetValues} = this.props.ctxQuery

        if (prevProps.page != page) {
            await this.setState({
                page: this.props.page ? Number(page) : 1,
                offset : this.props.offset ? Number(offset) : 0,
            })
        }
    }
    render() {
        const plpData = this.props.plpData && this.props.plpData.products && this.props.plpData.products.length > 0 ? this.props.plpData.products : []
        const breadcrumbs = this.props.category && this.props.category.breadcrumbs && this.props.category.breadcrumbs.length > 0 ? this.props.category.breadcrumbs : []
        if(this.props.plpData && this.props.plpData.facets && this.props.plpData.facets.length > 0){
            const {facets} = this.props.plpData
            var facet = facets // && facets.filter(function (r) { return Object.keys(r) != "categories.id" });
            var recommended = facet && facet.filter(function (r) {return Object.keys(r) == "price.centAmount"});
        }
        return (
            <ProductListPage 
                plp={plpData}
                facets={this.props.plpData.facets}
                facetsFilter={facet}
                handlePagination={this.handlePagination}
                page={this.state.page}
                offset={this.props.offset}
                totalPages={this.props.plpData.totalPages}
                catIdORKey={this.props.category.key}
                totalData={this.props.plpData.total}
                path={this.state.path}
                query={this.props.query}
                breadcrumb={breadcrumbs}
                ctxQuery={this.props.ctxQuery}
                recommended={recommended}
            />
        );
    }

}

export default connect(state => state)(PlpView)