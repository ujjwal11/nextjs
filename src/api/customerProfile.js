import axios from 'axios';
import handleErrors from '../_helper/handlerror';

async function updateCustomerProfile(data){
    const url = `${process.env.API_HOST}me/profile`
    const headers = {
        Authorization : `Bearer ${data.Token}`
    }
    const body = {
        ...data.userData
    }

    return axios
    .post(`${url}`, body, {headers})
    .then(handleErrors)
    .then(function (response){
        return response
    })
    .catch(function (error){
        console.log(error)
    });
}

export const customerProfile = {
    updateCustomerProfile,
}