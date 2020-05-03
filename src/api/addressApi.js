import axios from 'axios';
import handleErrors from '../_helper/handlerror';

async function addAddress(data){
    // console.log('data>>', data)
    const url = `${process.env.API_HOST}me/address`
    const body = {...data.formData}
    const headers = {
        Authorization : `Bearer ${data.Token}`
    }

    return axios
    .post(`${url}`, body, {headers})
    .then(handleErrors)
    .then(function (response) {
        return response
    })
    .catch(function (error){
        return error.response
    });
}

async function updateAddress(data){
    // console.log('data>>>>',data)
    const url = `${process.env.API_HOST}me/address/${data.updateId}`
    const body = {
        ...data.formData
    }
    const headers = {
        Authorization : `Bearer ${data.Token}`
    }

    return axios
    .post(`${url}`, body, {headers})
    .then(handleErrors)
    .then(function (response) {
        return response
    })
    .catch(function (error){
        return error.response
    });
}

function deleteAddress(data){
    const url = `${process.env.API_HOST}me/address/${data.id}`
    const headers = {
        Authorization : `Bearer ${data.Token}`
    }
    
    return axios
    .delete(url, {headers})
    .then(handleErrors)
    .then(function (response) {
        // console.log('response>',response)
        return response
    })
    .catch(function (error){
        return error.response
    });
}

export const addressServices = {
    addAddress,
    updateAddress,
    deleteAddress
}