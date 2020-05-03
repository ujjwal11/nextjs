import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers, {initialState} from './index'
import rootSaga from './rootSaga'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

//const combinedReducer = combineReducers({root: rootReducer, counter: counterReducer})

function configureStore(
     initialState1 = initialState
  ) {
  const sagaMiddleware = createSagaMiddleware()
  //console.log('initialstate>>>',initialState)
  const store = createStore(
    reducers,
    initialState1,
    bindMiddleware([sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore