import axios from 'axios'
import handleErrors from '../_helper/handlerror';

function newHomeApi(){
    const url = `https://cdn.contentstack.io/v3/content_types/homepage_new/entries?environment=production&include[]=main_section.banner.banner`
    
    const headers = {
        api_key : 'blt0e699d675d1a7f16',
        access_token : 'cs81182bfbc70e6cfa7fc173cb'
    }
    return axios
    .get(url, {headers})
    .then(handleErrors)
    .then(function (res){
        return res.data
    })
    .catch(function (error){
        console.log(error)
    })
}

export const Homeapi = {
    newHomeApi
}