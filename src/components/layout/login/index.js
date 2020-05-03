// import "./login.scss"
import Link from 'next/link';
// import { Button, Form, FormGroup, Label, Input, FormText, Row, Col  } from 'reactstrap';
import React, { Component, useState } from 'react';
import {Container, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = props => {
  const [seePassword, SeePassword] = useState(false)

  const password = () => {
    SeePassword(!seePassword)
  }

  return (
    <main role="main" className="container-fluid mainDiv">
      <div className="row mx-auto  ">
        <div className="col-lg-2"></div>

        <div className="LoginContainer col-sm-12 col-md-6 col-lg-4 ">
          <h2>Sign In</h2>
          <hr />
          <Form className="form">
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  className={props.data.ERROR && props.data.errors.email ? "formBorderColor" : ''}
                  type="email"
                  name="email"
                  id="username"
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
                  type={seePassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="********"
                  onChange={props.handleUserInput}
                />
                {/* <span className="fa fa-long-arrow-right form-control-feedback"></span> */}
                <span className={seePassword ? "fa fa-eye-slash editNeye" : "fa fa-eye editNeye"} onClick={password}>
                  {/* <i className={seePassword ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"></i> */}
                </span>
                <p className="validationError">{props.data.ERROR && props.data.errors.password ? props.data.errors.password : ''}</p>
              </FormGroup>
            </Col>
            <Button className="loginSubmitButton btn btn-primary" color="primary" type="submit" onClick={props.handleClick}>Submit</Button>
            <Button className="loginCancelButton" type="cancel" onClick={props.handleCancel}>Cancel</Button>
            {/* <hr />
        <p className="signUpText">Don't have an account?</p>
        <p className="createAccount"><Link href="/register"><a>Create Account</a></Link></p> */}
          </Form>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="col-sm-6 col-md-12 sign-in-text">
            <p>Create New Customer Account</p>
            <p>Creating an account is easy. Select 'Create Account' below and enjoy the following benefits:</p>

            <p>Free Shipping for 1 Year
              Create an account or sign in to your existing account and receive free shipping for 1 year.</p>

            <p>Faster Checkout
              Save your billing and shipping information to make it easier to buy your favorite gear.</p>

            <p>Order History
              Receive important information about your order. You can even track it up to the minute it arrives.</p>

            <p>News and exclusive offers
              Sign up to receive email updates on special promotions, new product announcements, gift ideas and more.</p>
            <h5>Don't have an account?</h5>
            <p><Link href="/register"><button type="submit" className="btn btn-primary">Create Account</button></Link></p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login