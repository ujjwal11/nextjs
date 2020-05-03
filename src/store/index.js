import homeReducer, {rootState as home} from '../containers/HomeContent/reducer'
import megaNavReducer, {rootState as navData} from '../containers/MegaNavContent/reducer'
import userReducer, {rootState as user} from './sharedReducer/reducer'
import categoryReducer, {rootState as category} from '../containers/Plp/reducer'
// import resultReducer, {rootState as result} from './sharedReducer/facets'
import selectedFacets, {rootState as fac} from './sharedReducer/fac'
import selectedVariantReducer, {selectedVariant} from '../containers/PDP/selectedVarientReducer'
import cartReducer, {cart} from "../containers/PDP/cartReducer"

import { combineReducers } from 'redux'
import pdpReducer, {pdp} from '../containers/PDP/reducer'

export const initialState = {
    home,
    navData,
    user,
    category,
    // result,
    fac,
    pdp,
    selectedVariant,
    cart
}

export default combineReducers({
    home: homeReducer,
    navData: megaNavReducer,
    user : userReducer,
    category : categoryReducer,
    // result : resultReducer,
    // facets : facets,
    pdp: pdpReducer,
    selectedFacets : selectedFacets,
    selectedVariant : selectedVariantReducer,
    cart : cartReducer
})

