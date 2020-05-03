// import './registration.scss';
// import { Button, Form, FormGroup, Label, Input, FormText, Row, Col  } from 'reactstrap';
import {Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Register = props => {
	return (
		<main role="main" className="container-fluid mainDiv">
		<Container className="LoginContainer col-sm-12 col-md-8 col-lg-4 col-12">
			<h2>Sign Up</h2>
			<hr />
			<Form className="form">
				<Col>
					<FormGroup>
						<Label>First Name</Label>
						<Input
							className={props.data.ERROR && props.data.errors.firstName ? "formBorderColor" : ''}
							type="text"
							name="firstName"
							id="firstName"
							placeholder="First Name"
							onChange={props.handleUserInput}
						/>
						<p className="validationError">{props.data.ERROR && props.data.errors.firstName ? props.data.errors.firstName : ''}</p>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label>Last Name</Label>
						<Input
							className={props.data.ERROR && props.data.errors.lastName ? "formBorderColor" : ''}
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Last Name"
							onChange={props.handleUserInput}
						/>
						<p className="validationError">{props.data.ERROR && props.data.errors.lastName ? props.data.errors.lastName : ''}</p>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label>Email</Label>
						<Input
							className={props.data.ERROR && props.data.errors.email ? "formBorderColor" : ''}
							type="email"
							name="email"
							id="email"
							placeholder="myemail@email.com"
							onChange={props.handleUserInput}
						/>
						<p className="validationError">{props.data.ERROR && props.data.errors.email ? props.data.errors.email : ''}</p>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input
							className={props.data.ERROR && props.data.errors.password ? "formBorderColor" : ''}
							type="password"
							name="password"
							id="password"
							placeholder="********"
							onChange={props.handleUserInput}
						/>
						<p className="validationError">{props.data.ERROR && props.data.errors.password ? props.data.errors.password : ''}</p>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="examplePassword">Confirm Password</Label>
						<Input
							className={props.data.ERROR && props.data.errors.confirmPassword ? "formBorderColor" : ''}
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							placeholder="********"
							onChange={props.handleUserInput}
						/>
						<p className="validationError">{props.data.ERROR && props.data.errors.confirmPassword ? props.data.errors.confirmPassword : ''}</p>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<Label for="examplePassword">Mobile</Label>
						<Input
							className={props.data.ERROR && props.data.errors.mobile ? "formBorderColor" : ''}
							type="mobile"
							name="mobile"
							id="mobile"
							placeholder="8745952474"
							onChange={props.handleUserInput}
						/>
						<p className="validationError">{props.data.ERROR && props.data.errors.mobile ? props.data.errors.mobile : ''}</p>
					</FormGroup>
				</Col>
				<Button className="loginSubmitButton" color="primary" type="submit" onClick={props.handleClick}>Submit</Button>
			</Form>
		</Container>
		</main>
	)
}

export default Register;