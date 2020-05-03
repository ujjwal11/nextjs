import Header from "../src/containers/Header/headerView"
import Footer from "../src/containers/Footer/footerView"
import MyAccountView from "../src/containers/MyAccount/myAccountView"
import {loadDataMegaNav} from '../src/containers/MegaNavContent/actions'
import {connect} from 'react-redux'


const MyAccount = (props) => {

    return (
        <React.Fragment>
            <title>MyAccount | Mastek Store</title>
            <Header navData={props.navData.megaNavData}/>
            <MyAccountView />
            <Footer />
        </React.Fragment>
    )
}

MyAccount.getInitialProps = async ({req, ctx}) => {
    const { store, isServer } = ctx

    if(isServer) {
        store.dispatch(loadDataMegaNav())
    }
    return {isServer}
}

export default connect(state=>state)(MyAccount)