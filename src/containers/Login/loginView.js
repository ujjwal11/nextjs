import React from 'react';
import Login from "../../components/layout/login"
// import {startLogin} from '../Login/action'
import {loadSignInSignUp} from '../../store/shared/actions'
import {connect} from 'react-redux'
import {validateEmail, password } from "../../_helper/validation"
import Router from 'next/router'


class LoginView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            validationError: {
				ERROR: false,
				errors: {}
            },
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleUserInput(e) {
        this.setState({[e.target.name] : e.target.value})
    }

    handleCancel(e){
        e.preventDefault()
        Router.pushRoute('/')
    }

    handleClick(e){
        const {email, password} = this.state
        e.preventDefault()
        // console.log('click')
        // console.log('name and pass is here',this.state)
        let validateFormResponse = validateForm(this.state)
        this.setState( {validationError : validateFormResponse} )
        if( !validateFormResponse.ERROR ){
            const body = {
                email : email,
                password : password,
            }
            const type = "Login"
            this.props.dispatch(loadSignInSignUp(body, type))
        }else{
            this.setState( {validationError:validateFormResponse} );
        }

    }

    

    render(){
        return(
            <Login 
                handleClick={this.handleClick}
                handleUserInput={this.handleUserInput}
                data={this.state.validationError}
                handleCancel={this.handleCancel}
            />
        )
    }
}

const validateForm  = props => {
	let ERROR = false;
    let errors = {};
	if(!validateEmail(props.email)){
		ERROR = true
		errors.email = "valid email is required."
	}
	if( !password(props.password)) {
		ERROR = true
		errors.password = "valid password is required."
    }
	return {ERROR, errors}
}

const mapDispatchToProps = dispatch => ({
    loadSignInSignUp : loadSignInSignUp
})
export default connect(mapDispatchToProps)(LoginView)