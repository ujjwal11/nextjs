import React from 'react'
import Router from 'next/router'

const Facet = (props) => {
    // console.log('porps in bloom facet', props)
    
    const handleFacetClick = (term, str) => {
        // Router.push(
        //     `/lucid/[param]?fq=${str}:("${term}")`,
        //     `${Router.asPath}&fq=${str}:("${term}")`
        // )
    }
    
    return (
        <ul>
            {
                props.data && props.data[0].map((term, index) => {
                    return (
                        <React.Fragment key={index}>
                            {
                                term && term.cat_name ?
                                    <label className="container" >
                                        <span onClick={e => handleFacetClick(term.cat_name, props.catLabel)}>
                                            {term.cat_name}
                                        </span>
                                    </label>
                                :
                                <label className="container" >
                                    <span onClick={e => handleFacetClick(term.name, props.catLabel)}>
                                        {term.name}
                                    </span>
                                </label>
                            }
                        </React.Fragment>
                    )
                })
            }
        </ul>
    )
}

export default Facet