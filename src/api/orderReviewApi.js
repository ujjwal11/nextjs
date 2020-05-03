import axios from 'axios'
import handleErrors from "../_helper/handlerror"

function orderReview(Token){
    // console.log('dasdasdasdasdasdas>>>',Token)
    const url = `${process.env.CART_API_HOST}me/cart/submit`
    const headers = {
        Authorization : `Bearer ${Token}`
    }
    return axios
    .post(`${url}`, {headers})
    .then(handleErrors)
    .then(function (res){
        return res.data
    })
    .catch(function (error){
        console.log(error)
    })
}

export const orderReviewService={
    orderReview
}