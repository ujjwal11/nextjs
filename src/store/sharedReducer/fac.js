import  actionTypes from '../shared/constant'
export const rootState = {}

function reducer(state = rootState, action) {
  
  switch (action.type) {
    case actionTypes.SELECTED_FACETS_KEY: {
      console.log('actionTypes.SELECTED_FACETS_KEY>>>>>',action)
      if (!state[action.value.value]) {

        state[action.value.value] = [
            action.value.key,
        ]
      }
      else{
        state[action.value.value].push({
          ...action.value.key
        }) 
      }
      return state
    }

    case actionTypes.SSR_FACETS: {
      console.log('actionTypes.SSR_FACETS>>>>', state)
      console.log('comming here>>>>', action)
        state[action.value.value] = [
          action.value.key,
        ]
        // if(Object.keys(state).length > 0){
        //   console.log('in the if object key is  > 0')
        //   Object.values(state).map(s => {
        //     if (s.includes(action.value.key)) {
        //       state[action.value.value] = [
        //         action.value.key,
        //       ]
        //     }
        //   })
        // }else{
        //   console.log('in the else object key is 0')

        //   state[action.value.value] = [
        //     action.value.key,
        //   ]
        // }
      // Object.values(state).map(s => {
      //   if (s.includes(action.value.key)) {
      //     state[action.value.value] = [
      //       action.value.key,
      //     ]
      //   } else {
      //     state[action.value.value] = [
      //       action.value.key,
      //     ]
      //   }
      // })

      return state
    }

    case actionTypes.EMPTY_ALL_FACET: {
      console.log('actionTypes.EMPTY_ALL_FACET>>', state)
      state = {}
      return state
    }
    
    case actionTypes.REMOVE_FACETS_KEY: {
        console.log('actionTypes.REMOVE_FACETS_KEY>>>', action)
      if (state[action.value.value].includes(action.value.key)) {
        const index = state[action.value.value].indexOf(action.value.key);
        if (index > -1) {
          state[action.value.value].splice(index, 1);
          !Object.keys(state[action.value.value]).length && delete state[action.value.value]
          // delete state[action.value.value]
        }
      }
      return state
    }
      
    default:
      return state
  }
}

export default reducer