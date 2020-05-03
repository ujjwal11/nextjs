import RegisterView from "../src/containers/Register/registerView"
import Footer from "../src/containers/Footer/footerView"
import Header from "../src/containers/Header/headerView"
import MegaNavView from "../src/containers/MegaNavContent/megaNavView"
import {connect} from 'react-redux'
import {loadDataMegaNav} from '../src/containers/MegaNavContent/actions'
import FooterLinks from "../src/components/layout/home/footerLinks/index"

const Register = props => {

    return (
      <React.Fragment>
        <title>Register | Mastek Store</title>
        <Header navData={props.navData.megaNavData}/>
        <RegisterView />
        <FooterLinks />
        <Footer />
      </React.Fragment>
    );
}

Register.getInitialProps = async ({ req,  ctx }) => {

    const { store, isServer } = ctx
    if (isServer) {
      store.dispatch(loadDataMegaNav())
    }
    return {isServer}
  }

export default connect(state=>state)(Register)