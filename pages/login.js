import Footer from "../src/containers/Footer/footerView"
import Header from "../src/containers/Header/headerView"
import MegaNavView from "../src/containers/MegaNavContent/megaNavView"
import {connect} from 'react-redux'
import {loadDataMegaNav} from '../src/containers/MegaNavContent/actions'
import LoginView from "../src/containers/Login/loginView"
import FooterLinks from "../src/components/layout/home/footerLinks/index"


const Login = props => {

    return (
      <React.Fragment>
          <title>Login | Mastek Store</title>
          <Header navData={props.navData.megaNavData}/>
        <LoginView />
        <FooterLinks />
        <Footer />
      </React.Fragment>
    );
}

Login.getInitialProps = async ({ req,  ctx }) => {

    const { store, isServer } = ctx
    if (isServer) {
      store.dispatch(loadDataMegaNav())
    }
    return {isServer}
}

export default connect(state=>state)(Login)
