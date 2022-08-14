import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Login from "../../assets/images/login.png";
import {Link} from "react-router-dom";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import {Redirect} from "react-router";

class UserRegister extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            message: "",
            isRegister: false,
        }
    }

    FormSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }
        axios.post(AppUrl.register, data).then(res => {
            console.log(res.data);
            if (res.data.status === true) {
                localStorage.setItem("token", res.data.token);
                this.setState({
                    isRegister: true,
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
        //After register then redirect profile page
        if (this.state.isRegister) {
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
                                        <h4 className={"section-title-login m-2"}>USER REGISTER</h4>
                                        <input onChange={event => {
                                            this.setState({name: event.target.value})
                                        }} type="text" className={"form-control m-2"}
                                               placeholder={"Enter Your Name"}/>
                                        <input onChange={event => {
                                            this.setState({email: event.target.value})
                                        }} type="email" className={"form-control m-2"}
                                               placeholder={"Enter Your Email"}/>
                                        <input onChange={event => {
                                            this.setState({password: event.target.value})
                                        }} type="password" className={"form-control m-2"}
                                               placeholder={"Enter Your Password"}/>
                                        <input onChange={event => {
                                            this.setState({password_confirmation: event.target.value})
                                        }} type="password" className={"form-control m-2"}
                                               placeholder={"Confirm Your Password"}/>
                                        <Button type={"submit"} className={"btn site-btn-login btn-block m-2"}>
                                            Register
                                        </Button>
                                        <br/>
                                        <hr/>
                                        <p className={"text-center"}><b>Already have an account? </b><Link
                                            to={"/login"}>Login</Link>
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

export default UserRegister;