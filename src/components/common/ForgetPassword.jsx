import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Forget from "../../assets/images/forget.jpg";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import "react-toastify/dist/ReactToastify.css";
import {toast, ToastContainer} from "react-toastify";

class ForgetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            message: "",
        }
    }

    FormSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
        }
        axios.post(AppUrl.forgetPassword, data).then(response => {
            this.setState({message: response.data.message})
            toast.success(this.state.message, {
                position: "top-right",
            })

        }).catch(error => {
            this.setState({message: error.response.data.message})
            toast.error(this.state.message, {
                position: "top-right",
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row className={"p-2"}>
                        <Col className={"shadow-sm bg-white mt-2"} md={12} lg={12} sm={12} xs={12}>
                            <Row className={"text-center"}>
                                <Col className={"d-flex justify-content-center"} md={6} lg={6} sm={12} xs={12}>
                                    <Form onSubmit={this.FormSubmit} className={"onboardForm"}>
                                        <h4 className={"section-title-login m-2"}>FORGET PASSWORD</h4>
                                        <input onChange={event => {
                                            this.setState({email: event.target.value})
                                        }} type="email" className={"form-control m-2"}
                                               placeholder={"Enter Your Email"}/>
                                        <Button type={"submit"} className={"btn site-btn-login btn-block m-2"}>
                                            Reset Password
                                        </Button>
                                    </Form>
                                </Col>
                                <Col className={"p-0 Desktop m-0"} md={6} lg={6} sm={6} xs={6}>
                                    <img className={"onboardBanner"} src={Forget} alt=""/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer/>
            </Fragment>
        );
    }
}

export default ForgetPassword;