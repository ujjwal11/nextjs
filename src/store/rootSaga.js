import { all, takeLatest, take } from 'redux-saga/effects'
import send from '../containers/HomeContent/sagas'
import megaNav from '../containers/MegaNavContent/sagas'
import Shared from './shared/sagas'
// import register from '../containers/Register/sagas'
// import login from '../containers/Login/sagas';
import plp from '../containers/Plp/sagas'
import pdp from '../containers/PDP/sagas'
import search from '../containers/Header/sagas'
import shipping from '../containers/Shipping/sagas'
import payment from '../containers/Payment/sagas'
import userProfile from '../containers/MyAccount/sagas'
// import user from '../containers/Register/sagas'



function* rootSaga() {
    yield all([
       //call(incrementCount),
       takeLatest(send.actionTypes, send.loadHomePageDataSaga),
       takeLatest(megaNav.actionTypes, megaNav.loadDataSaga),
       takeLatest(Shared.actionTypes, Shared.anonymousToken),
      //  takeLatest(register.actionTypes, register.Register),
      //  takeLatest(register.userActionTypes, register.UserData),
      //  takeLatest(login.loginActionTypes, login.Login),
      //  takeLatest(plp.actionTypes, plp.loadCatSlugKey),
      //  takeLatest(plp.filterDataActionType, plp.loadFilterData),
       takeLatest(plp.plpActionTypes, plp.loadPlpData),
       takeLatest(plp.recommendedActionType, plp.startRecommended),
    //    takeLatest(Shared.facetDataActionType, Shared.loadFacetsData),

      takeLatest(pdp.actionTypes, pdp.loadProductData),
      takeLatest(pdp.addToCartActionType, pdp.startAddToCart),
      takeLatest(pdp.cartDataActionType, pdp.startActiveCart),
      takeLatest(pdp.updateCartActionType, pdp.startUpdateCartData),
      takeLatest(pdp.deleteCartActionType, pdp.deleteDataFromCart),
      
      takeLatest(Shared.loadKeyActionType, Shared.startSelectedFacets),
      takeLatest(Shared.addressActionType, Shared.addAddressStart),
      takeLatest(Shared.updateAddressAction, Shared.updateAddressStart),
      // takeLatest(Shared.facetsFilterActionType, Shared.facetsFilterLoad),
      takeLatest(Shared.SignInSignUpActionTypes, Shared.SignInSignUp),
      takeLatest(Shared.userActionTypes, Shared.UserData),

      takeLatest(search.searchAction, search.startSearch),
      takeLatest(shipping.shippingAction, shipping.startShipping),
      takeLatest(payment.paymentAction, payment.startPayment),
      takeLatest(userProfile.userProfileUpdateAction, userProfile.startUpdateUserProfile)

   ])
}

export default rootSaga