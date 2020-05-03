import React from 'react';
import Register from "../../components/layout/register"
import { validatename, validateLastName, validateEmail, password, phone } from "../../_helper/validation"
// import {loadRegister} from '../Register/actions'
import {loadSignInSignUp} from '../../store/shared/actions'
import {connect} from 'react-redux'

class RegisterView extends React.Component {
    constructor(props){
        super(props)

        this.state={
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            confirmPassword : '',
            mobile : '',
            redirect : false,
            validationError: {
				ERROR: false,
				errors: {}
            },
        }
    }

    // componentDidMount() {
    //   console.log('this.props>>>>><<<<<<<',this.props)
    //     var token = localStorage && localStorage.userToken ? JSON.parse(localStorage.userToken) : null
    //     console.log('token is here',token)
    // }

    handleUserInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    handleClick = (e) => {
        e.preventDefault()
        const {firstName, lastName, email, password, mobile } = this.state
        var token = JSON.parse(localStorage.userToken)
        let validateFormResponse = validateForm( this.state );
        this.setState( {validationError : validateFormResponse} );
        if( !validateFormResponse.ERROR ){
            const body = {
              firstName : firstName,
              lastName : lastName,
              email : email,
              password : password,
              mobile : mobile,
            }
            const type = "Register"
              this.props.dispatch(loadSignInSignUp(body, type))
        }else{
            this.setState( {validationError:validateFormResponse} );
        }
    }

  render() {
      return (
          <Register 
              handleUserInput={this.handleUserInput}
              handleClick={this.handleClick}
              data={this.state.validationError}
          />
      );
  }
}


const validateForm  = props => {
	let ERROR = false;
    let errors = {};
	if(!validatename(props.firstName)){
		ERROR = true
		errors.firstName = "valid name is required."
    }
    if(!validateLastName(props.lastName)){
		ERROR = true
		errors.lastName = "valid lastName is required."
    }
	if(!validateEmail(props.email)){
		ERROR = true
		errors.email = "valid email is required."
	}
	if( !password(props.password)) {
		ERROR = true
		errors.password = "valid password is required."
    }
    if( props.password !== props.confirmPassword){
        ERROR = true
        errors.confirmPassword = "please enter the same password"
    }
    if(!phone(props.mobile)) {
        ERROR = true
        errors.mobile = "please enter valid mobile number"
    }
	return {ERROR, errors}
}

const mapDispatchToProps = dispatch => ({
  loadSignInSignUp : loadSignInSignUp
})

export default connect(mapDispatchToProps)(RegisterView)