import React from 'react'
import LucidSearch from '../../components/layout/lucidSearch'
import LucidHome from '../../components/layout/lucidSearch/lucidHome'

const LucidHomeView = (props) => {
    return(
        // <LucidSearch lucidSearchData={props.lucidSearchData}/>
        <LucidHome lucidSearchData={props.lucidSearchData}/>
    )
}

export default LucidHomeView