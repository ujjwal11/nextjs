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

    handleChange = (e, value1, value2) => {
        this.setState({
            value1 : value1,
            value2 : value2
        })
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
        const color = COLOR.map(v => v.toLowerCase());
        return (
            <ul>
                {
                    this.props.terms && this.props.terms.map((term, index) => {
                        return (
                            <React.Fragment key={index}>
                                {
                                    term && term.term && color.includes(term.term) ?
                                        <li className="attr2" style={{ backgroundColor: term.term }} onClick={(e) => this.handleClick(e, this.props.name, term.term, `${term.lowerEndpoint}-${term.upperEndpoint}`, this.props.path)} ></li>
                                        // <label className="container" onClick={(e) => this.handleClick(e, this.props.name, term.term, `${term.lowerEndpoint}-${term.upperEndpoint}`, this.props.path)}>{term.term}<input type="checkbox"  onChange={e => this.handleChange(e, term.term, `${term.lowerEndpoint}-${term.upperEndpoint}`)}/><span className="checkmark"></span></label>
                                        :
                                        term && term.categoryName ?
                                        <label className="container" onClick={(e) => this.handleClick(e, this.props.name, term.term, `${term.lowerEndpoint}-${term.upperEndpoint}`, this.props.path)}>{term.categoryName}<input type="checkbox" /><span className="checkmark"></span></label>
                                        :
                                        term && term.term && SIZE.includes(term.term) ?
                                        <li className="attr2" onClick={(e) => this.handleClick(e, this.props.name, term.term, `${term.lowerEndpoint}-${term.upperEndpoint}`, this.props.path)} >{term.term}</li>
                                        :
                                        term && term.term ? 
                                        <label className="container" onClick={(e) => this.handleClick(e, this.props.name, term.term, `${term.lowerEndpoint}-${term.upperEndpoint}`, this.props.path)}>{term.term}<input type="checkbox"  /><span className="checkmark"></span></label>
                                        :
                                        term.count > 0 ?
                                            <label
                                                className="container"
                                                onClick={(e) => this.handleClick(e, this.props.name, term.term, `${term.lowerEndpoint}-${term.upperEndpoint}`, this.props.path)}
                                            >
                                                {term.lowerEndpoint == null ? 'min' : formatterService.formatCurrency(term.lowerEndpoint, 'EUR')}-{term.upperEndpoint == null ? 'max' : formatterService.formatCurrency(term.upperEndpoint, 'EUR')}
                                                <input type="checkbox" /*checked="checked" */ />
                                                <span className="checkmark"></span>
                                            </label>
                                            :
                                            null
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