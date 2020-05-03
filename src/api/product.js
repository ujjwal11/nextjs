import axios from 'axios';
import handleErrors from '../_helper/handlerror';
import {facetUrl, catAndPaginationUrl} from '../_helper/plpUrl';

async function categoriesData(data) {
  const url = catAndPaginationUrl(data)
  // console.log('url of category page>>', url)
  // var offsetVal = offset !== undefined ? offset : 0
  const headers = {
    'X-MASTEK-CTX' : data.authHeader
  }
  return axios
  .get(url, {headers})
  .then(handleErrors)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log('if in erre>>>')
        return error;
      });
}

async function facetsFilter(data) {
  const url = facetUrl(data)
  // console.log('>>>>>>>>>>>>',url)
  return axios
  .get(url)
    .then(handleErrors)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

async function getProductData(slug) {
  //console.log('id id>>>>', slug)
  const queryStr = encodeURIComponent(`en=\"${slug}\"`)
  const url = `${process.env.PRODUCT_API_HOST}${slug}`
  
  return axios
  .get(url)
  .then(handleErrors)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        return error;
      });
}

async function getCartData(data){
  // console.log('data with header>>',data)
  const url = `${process.env.CART_API_HOST}me/cart/item`

  const body = {
    productId : data.productId,
    variantId : data.variantId,
    quantity : data.quantity
  }
  const headers = {
    Authorization : data.Authorization
  }
  return axios
  .post(`${url}`, body, {headers})
  .then(handleErrors)
  .then(function (response) {
    // console.log('res>>>>>>>',response)
    //
    return response
  })
  .catch(function (error) {
    // console.log('res>>>>>>>',error)
    return error.response
  });
}

async function activeCart(data) {
  // console.log('ACTIVE CART'+data);
  const url = `${process.env.CART_API_HOST}me/active-cart`
  const headers = {
    Authorization : `Bearer ${data}`
  }
  return axios
  .get(url, {headers})
  // .then(handleErrors)
      .then(function(response) {
          return response;
      })
      .catch(function(error) {
        // console.log('error>>>>>>', error.response)
        return error.response;
      });
}

async function getCartUpdateData(data){
  const url = `${process.env.API_HOST}me/cart/item/update`

  const body = {
    ...data.body
  }
  const headers = {
    Authorization : data.Authorization
  }
  return axios
  .post(`${url}`, body, {headers})
  .then(handleErrors)
  .then(function (response) {
    return response
  })
  .catch(function (error) {
    return error.response
  });
}

function deleteItemFromCart(data){
  const url = `${process.env.API_HOST}me/cart/item/${data.ProdId}`;
  const headers = {
    Authorization: data.Authorization
  }
  return axios
    .delete(url, { headers })
    .then(handleErrors)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

function recommendedPlp(data){
  const {categoryid, subcategoryId, childCatId, recommendData} = data
  const commingUrl = recommendedPlpUrl(categoryid, subcategoryId, childCatId)
  
  const url = `${process.env.SEARCH_API_HOST}${commingUrl}?facetValues=price.centAmount:${recommendData}`

  return axios
  .get(url)
  .then(handleErrors)
  .then(function (res) {
    return res.data
  })
  .catch(function (error){
    console.log(error)
  })
}

function recommendedPlpUrl(categoryid, subcategoryId, childCatId){
  let url = ''
  if(categoryid && subcategoryId == undefined && childCatId == undefined){
    url = `${categoryid}`
  }
  else if(categoryid && subcategoryId && childCatId == undefined){
    url = `${subcategoryId}`
  }
  else{
    url = `${childCatId}`
  }
  return url
}



export const productService = {
    categoriesData,
    facetsFilter,
    getProductData,
    getCartData,
    activeCart,
    getCartUpdateData,
    deleteItemFromCart,
    recommendedPlp
};