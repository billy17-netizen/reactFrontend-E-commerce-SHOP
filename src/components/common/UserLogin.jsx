import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Login from "../../assets/images/login.png";
import {Link} from "react-router-dom";
import AppUrl from "../../api/AppURL";
import axios from "axios";
import {Redirect} from "react-router";

class UserLogin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            message: "",
            isLogin: false,
        }
    }


    FormSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(AppUrl.login, data).then(res => {

            if (res.data.status === true) {
                localStorage.setItem("token", res.data.token);
                this.setState({
                    isLogin: true,
                })
                this.props.SetUser(res.data.user);
            } else {
                this.setState({message: res.data.message})
            }

        }).catch(err => {
            this.setState({message: err.message})
        })
    }

    render() {

        //After login then redirect profile page
        if (this.state.isLogin) {
            return <Redirect to="/profile"/>
        }
        if (localStorage.getItem('token')) {
            return <Redirect to={'/profile'}/>
        }
        return (
            <Fragment>
                <Container>
                    <Row className={"p-2"}>
                        <Col className={"shadow-sm bg-white mt-2"} md={12} lg={12} sm={12} xs={12}>
                            <Row className={"text-center"}>
                                <Col className={"d-flex justify-content-center"} md={6} lg={6} sm={12} xs={12}>
                                    <Form onSubmit={this.FormSubmit} className={"onboardForm"}>
                                        <h4 className={"section-title-login m-2"}>USER LOGIN</h4>
                                        <input onChange={event => {
                                            this.setState({email: event.target.value})
                                        }} type="email" className={"form-control m-2"}
                                               placeholder={"Enter Your Email"}/>
                                        <input onChange={event => {
                                            this.setState({password: event.target.value})
                                        }} type="password" className={"form-control m-2"}
                                               placeholder={"Enter Your Password"}/>
                                        <Button type={"submit"} className={"btn site-btn-login btn-block m-2"}>
                                            Login
                                        </Button>
                                        <p className={"text-center"}><b>Don't Have an Account? </b><Link
                                            to={"/register"}>Register</Link>
                                        </p>
                                        <p className={"text-center"}><b>Forget My Password? </b><Link
                                            to={"/forgetPassword"}>Forget Password</Link></p>
                                    </Form>
                                </Col>
                                <Col className={"p-0 Desktop m-0"} md={6} lg={6} sm={6} xs={6}>
                                    <img className={"onboardBanner"} src={Login} alt=""/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default UserLogin;