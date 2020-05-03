import React from 'react'
import { Form, FormGroup, Input, Label } from 'reactstrap';
import {connect} from 'react-redux'
import {startSelectedFacets} from '../../../store/shared/actions'
import {formatterService} from "../../../_helper/formatterService"
import {multiplevarReturn} from '../../../_helper/plpUrl'
import Router from 'next/router'
import Link from 'next/link';
import {loadPlpData} from '../../../containers/Plp/actions'
import {COLOR, SIZE} from '../../../_helper/helper'

class Facets extends React.Component {
    constructor(props){
        super(props)
        this.state={ 
            value1 : '',
            value2 : ''
        }
    }

    static getInitialProps({query}) {
        console.log('query in facets<<<<<',query)
        return {query}
    }

    handleChange = (e, value1, value2) => {
        this.setState({
            value1 : value1,
            value2 : value2
        })
    }

    handleFacetClick = (term, str) => {
        // console.log('e.target.value>>',term)
        // console.log('e.target.value>>',str)
        // console.log('asdasdasdasdasdasdasdasd>>>>',Router.query)
        // console.log('asdasdasdasdasdasdasdasd>>>>',`${Router.asPath}&fq=${str}:("${term}")`)

        Router.push(
            `/lucid/[param]?fq=${str}:("${term}")`,
            `${Router.asPath}&fq=${str}:("${term}")`
        )

            // Router.push(
            //     `/lucid/[param]?q=${Router.query.q}&fq=${str}:("${term}")`,
            //     `/lucid/search?q=${Router.query.q}&fq=${str}:("${term}")`
            //     // `/lucid/[param]?fq=${str}:${term}`,
            // )

        // console.log('e.target.value>> url>>>>>', `/lucid/[param]?fq=${str}:(${term})`)


        // Router.push(
        //     `/lucid/[param]?fq=${str}:("${term}")`,
        //     `/lucid/search?fq=${str}:("${term}")`
        //     // `/lucid/[param]?fq=${str}:${term}`,
        // )
    }

    handleClick = (e, name, value, value2, path) => {
        // console.log(e, name, value, value2, path, " e, name, value, value2, path")
        e.preventDefault()
        // console.log(e.target.innerText)
        const {categoryid, subcategoryId, childCatId} = this.props.query
        const pathName = window ? window.location.pathname : null
        const { category, catIdORKey } = this.props
        const {selectedFacets} = this.props
        
        const data = { 
            key : value ? value : value2,
            value : name
        }
        this.props.dispatch(startSelectedFacets(data))
        const url = multiplevarReturn(selectedFacets)

        const strQues = url ? "?" : ''
        if(this.props.query && this.props.query.param){
            // console.log('in this section when add a new filter')
            // console.log('in thisprops>>>', this.props)
            // console.log('in this section when add a new filter', `${this.props.path}${strQues}${url.substr(1)}`)

            Router.push(
                `/search/[param]?${url.substr(1)}`,
                `/search/${this.props.query.param}${strQues}${url.substr(1)}`,
            )
        }else{
            Router.pushRoute(`${pathName}${strQues}${url.substr(1)}`)
        }
    }

    render() {
        // console.log('this.props>>',this.props)
        return (
            <ul>
                {
                    this.props.data && this.props.data[0].map((term, index) => {
                        return (
                            <React.Fragment key={index}>
                                {
                                    term && index % 2 == 0 ?
                                        <label className="container" >
                                            <span onClick={e => this.handleFacetClick(term, this.props.catLabel)}>
                                                {term}
                                            </span>
                                        </label>
                                    :
                                    ''
                                }
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        )
    }
    
}

export default connect(state => state)(Facets)