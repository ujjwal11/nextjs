
import facetConfig from './constant'
import {findValue} from './helper'
const ApiBaseUrl = `${process.env.API_PRODUCTS_URL}`


export function facetUrl(data){
    const {payload} = data
    const {selectedFacets} = payload
    // const keysValue = multiplevarReturn(selectedFacets)
    const offset = payload.offset ? payload.offset : 0

    let url
    if(selectedFacets && Object.keys(selectedFacets).length > 0){
        const keysValue = multiplevarReturn(selectedFacets)
        url = `${ApiBaseUrl}${payload.catIdORKey}?offset=${offset}&limit=24${keysValue}`
    }
    else if(payload.facetValues && payload.facetValues.length > 1){
        const str = payload.facetValues.toString().replace(',','&facetValues=')
        url = `${ApiBaseUrl}${payload.category}?offset=${offset}&limit=24&facetValues=${str}`
    }else {
        url = `${ApiBaseUrl}${payload.category}?offset=${offset}&limit=24&facetValues=${payload.facetValues}`
    }
    return url
}

export function multiplevarReturn(selectedFacets){
    var facetUrl = ''
    Object.keys(selectedFacets).map(s => {
        if (selectedFacets[s].length > 0) {
            var url = `facetValues=${s}:`+encodeURIComponent(`${selectedFacets[s].toString().split(",").join("|")}`)
            facetUrl = facetUrl + `&` + url
        }
    })
    return facetUrl
}

export function returnStr(str){
    var value = ''
    if(Array.isArray(str)){
       value = str.map(function (item) {
            return item;
        }).join("&facetValues=");
    }
    else if(str && str.includes('/')){
        value = value + str.replace(/\//g, '&facetValues=')
    }
    else{
        value = str
    }
    return value
}

export function catAndPaginationUrl(data){
    const {category, offset, page, facetValues} = data
    var url = ''
    if(category && offset == undefined && page == undefined && facetValues == undefined){
        url = `${ApiBaseUrl}${category}`
    }
    else if(category && page && offset && facetValues == undefined){
        url = `${ApiBaseUrl}${category}?page=${page}&offset=${offset}`
    }
    else if(category && facetValues && offset == undefined && page == undefined){
        const str = returnStr(facetValues)
        url = `${ApiBaseUrl}${data.category}?facetValues=${str}`
    }
    return url
}