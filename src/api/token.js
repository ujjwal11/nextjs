import axios from 'axios';
import handleErrors from '../_helper/handlerror'

const apiBaseUrl = process.env.AUTH_API_HOST

async function logout(){
  const url = `${apiBaseUrl}anonymous/token`
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  return axios
  .post(`${url}`, {headers})
  .then(handleErrors)
  .then(function (res){
    return res
  })
  .catch(function (error){
    console.log(error)
  })
}


export const tokenService = {
  logout
}