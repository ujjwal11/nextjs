import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import Router from 'next/router'
import ProductDisplayPage from '../../components/layout/pdp'
import {successSelectedVariantData} from './actions'


class PdpView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            slug: props.slug
        }
    }

    getAttributeValue = (product, attributeName) => {
        const attrSet = new Set()
        if (product !== undefined && product.variants && product.variants.length > 0) {
            if(product !== undefined && product.masterVariant && Object.keys(product.masterVariant).length > 0 && product.masterVariant.attributes && product.masterVariant.attributes.length > 0){
                product.masterVariant.attributes.map((variant, key) => {
                    product.masterVariant.attributes.filter(attr => attr.name === attributeName).map(attr => {
                        if (attr.value && attr.value.key)
                            attrSet.add(attr.value.key)
                        else
                            attrSet.add(attr.value)
                    })
                })
            }
            product.variants.map((variant, key) => {
                variant.attributes.filter(attr => attr.name === attributeName).map(attr => {
                    if (attr.value && attr.value.key)
                        attrSet.add(attr.value.key)
                    else
                        attrSet.add(attr.value)
                })
            })
        }
        // console.log('attrSetattrSet<<<',attrSet)
        return Array.from(attrSet)
    }

    getImages = product => {
        const attrSet = new Set()
        if (product !== undefined && product.variants && product.variants.length > 0) {
            product.variants.map((variant, key) => {
                for (let img of variant.images) {
                    attrSet.add(img.url)
                }
               
            })
        }
        return Array.from(attrSet)
    }

    findVariant = (product, size, color) => {
        let selectedVariant;
        if (product !== undefined && product.masterVariant && Object.keys(product.masterVariant).length > 0 && product.masterVariant.attributes && product.masterVariant.attributes.length > 0) {
                selectedVariant = product.masterVariant
        }
        if (product !== undefined && product.variants && product.variants.length > 0) {
            for (let variant of product.variants) {
                const sizeAttr = variant.attributes.filter(attr => attr.name === 'size')[0];
                const colorAttr = variant.attributes.filter(attr => attr.name === 'color')[0];
                if (sizeAttr.value === size && colorAttr.value.key === color) {
                    selectedVariant = variant
                }
            }
        }
        // console.log('selectedVariant<<<>>>',selectedVariant)
        this.props.dispatch(successSelectedVariantData(selectedVariant))

        return selectedVariant
    }

    // addToCart = (product, size, color, quantity) => {
    //     const selectedVariant = this.findVariant(product, size, color)
    //     if (selectedVariant) {
    //         // call api to add to cart
    //         // 1. dispatch an action
    //         // 2. 
    //     }
    // }

   
    
    render() {
        const pdpRecord = this.props && this.props.pdpData && Object.keys(this.props.pdpData).length > 0 ? this.props.pdpData.current : {}
        const breadcrumbs = this.props && this.props.pdp && this.props.pdp.breadcrumbs && this.props.pdp.breadcrumbs.length > 0 ? this.props.pdp.breadcrumbs : []
        const selectedVariant = this.props && this.props.selectedVariant && Object.keys(this.props.selectedVariant).length > 0 ? this.props.selectedVariant : {}
        return (
           <ProductDisplayPage
                record = {pdpRecord}
                breadcrumb = {breadcrumbs}
                getAttributeValue = {this.getAttributeValue}
                findVariant = {this.findVariant}
                images = {this.getImages(pdpRecord)}
                colors = {this.getAttributeValue(pdpRecord, 'color')}
                sizes = {this.getAttributeValue(pdpRecord, 'size')}
                // handleAddToCart = {this.addToCart}
                selectedVariant={selectedVariant}
                pdpTitle={this.props.pdpTitle}
                
            />
            
        );
    }

}

export default connect(state => state)(PdpView)