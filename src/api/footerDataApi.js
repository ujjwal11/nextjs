import axios from 'axios'
import handleErrors from '../_helper/handlerror';

function footerData(urlcommingfromFooter){
    const url = `https://cdn.contentstack.io/v3/content_types/static_one_column/entries?environment=production&query={"url": /${urlcommingfromFooter}}`

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

export const FooterDataApi = {
    footerData
}