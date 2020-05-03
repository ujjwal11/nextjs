import axios from 'axios'
import handleErrors from '../_helper/handlerror';


async function searchProductes(data){
    const url = searchUrl(data)
    return axios
    .get(url)
    .then(handleErrors)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error){
        console.log(error)
    });
}

async function lucidSearchData(){
    const url = 'http://demo7512624.mockable.io/lucid-search'
    return axios
    .get(url)
    .then(handleErrors)
    .then(function (res){
        return res.data
    })
    .catch(function (error){
        console.log(error)
    })
}

async function lucidSearchHomeData(){
    const url = 'http://localhost:7000/api/apps/Mastek/query/Mastek_rules_simulator?q=homepage'
    return axios
    .get(url)
    .then(handleErrors)
    .then(function (res){
        // console.log('resssssssssssssssssss', res)
        return res.data
    })
    .catch(function (error){
        console.log(error)
    })
}

async function lucidSearchQueryData(param){
    // console.log('param>>>>>>>>', param)

    const url = `http://localhost:7000/api/apps/Mastek/query/Mastek_rules_simulator?rows=10&start=0&q=${param}`
    return axios
    .get(url)
    .then(handleErrors)
    .then(function (res){
        // console.log('res><><><><res', res)
        return res.data
    })
    .catch(function (error){
        console.log(error)
    })
}

async function lucidSearchFacetData(param){
    // console.log('param in server>>',param)
    const url = `http://localhost:7000/api/apps/Mastek/query/Mastek_rules_simulator?rows=10&start=0&${param.q}&fq=${param.query}`
    // console.log('urlurlurlurlurl<<',url)
    return axios
    .get(url)
    .then(handleErrors)
    .then(function (res){
        // console.log('res><><><><res', res)
        return res.data
    })
    .catch(function (error){
        console.log(error)
    })
}

async function bloomSearchQueryData(param){
    const url = `http://brm-core-0.brsrvr.com/api/v1/core/?account_id=5339&auth_key=r1jj98c73xi3ixw0&domain_key=example_com&request_id=8438674018839&_br_uid_2=uid=7797686432023:v=11.5:ts=1428617911187:hc=55&ref_url=http://www.example.com/home&url=http://www.example.com/index.html?q=${param}&request_type=search&search_type=keyword&q=${param}&fl=pid,title,brand,price,sale_price,thumb_image,url,description&rows=10&start=0`
    return axios
    .get(url)
    .then(handleErrors)
    .then(function (res){
        // console.log('res><><><><res', res)
        return res.data
    })
    .catch(function (error){
        console.log(error)
    })
}

const searchUrl = (data) => {
    // console.log('data>> in search api in searchUrl fun>>>',data)
    let url = ''
    const offset = data && data.offset !== undefined ? data.offset : 0
    if(data && Array.isArray(data.facetValues)){
        const facetValue = data.facetValues.toString().replace(',','&facetValues=')
        url = `${process.env.CATALOG_API_HOST}search?q=${data.query}&lang=en&offset=${offset}&limit=24&facetValues=${facetValue}`
    }else{
        const facetValue = data && data.facetValues ? data.facetValues : ''
        url = `${process.env.CATALOG_API_HOST}search?q=${data.query}&lang=en&offset=${offset}&limit=24&facetValues=${facetValue}`
    }
    return url
}

const searchTypeAhead = (keyword, token) => {
    const url = `${process.env.PP_API_HOST}suggest?searchKeywords.en=${keyword}&fuzzy=true&limit=10`
    const headers = {
        Authorization : `Bearer ${token.access_token}`
    }
    return axios
    .get(url, {headers})
    .then(handleErrors)
    .then(function (res) {
        return res.data
    })
    .catch(function (error){
        console.log(error)
    })
}

export const searchService = {
    searchProductes,
    searchTypeAhead,
    lucidSearchData,
    lucidSearchHomeData,
    lucidSearchQueryData,
    lucidSearchFacetData,
    bloomSearchQueryData
}