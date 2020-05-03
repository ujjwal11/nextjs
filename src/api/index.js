// const homeApi = () => {
//     fetch('https://demo4934607.mockable.io/home/content')
//     // http://demo9247412.mockable.io/meganav/content
//     // fetch('https://api.github.com/repos/zeit/next.js')
//       .then(response => response.json())
//       .then(result => {
//           //console.log('resultresult',result)
//           return result
//       })
// }

// export default homeApi
import axios from 'axios';

const getAnime = async (query, variables, token) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer '+ token
    }
    try {
      const response = await axios.post('https://api.sphere.io/hello-world-34/graphql', {
        query,
        variables
      }, {headers});
      // //console.log("checking the data of graphql",response.data)
      
    //   this.setState(() => ({
    //     isLoaded: true,
    //     items: response.data.data.categories.results
    //   }));
        return response.data.data
    } catch (error) {
        //console.log(error)
      // If there's an error, set the error to the state
    //   this.setState(() => ({ error }))
    }
  }

export const getDetail = async(query, token, variables) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer '+ token
  }
  try {
    const response = await axios.post('https://api.sphere.io/hello-world-34/graphql', {
      query,
      variables
    },{headers});
    // //console.log("checking the data of graphql",response.data)
      return response.data.data
  }
  catch (error) {
    //console.log(error)
}
}
  
export default getAnime