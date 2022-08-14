import React, {Component, Fragment} from 'react';
import {Breadcrumb, Button, Col, Container, Form, FormControl, Row} from "react-bootstrap";
import validation from "../../validation/validation";
import AppURL from "../../api/AppURL";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    OnFormSubmit = (e) => {
        let name = this.state.name;
        let email = this.state.email;
        let message = this.state.message;
        let sendBtn = document.getElementById("sendBtn");
        let contactForm = document.getElementById("contactForm");

        if (name === "" || email === "" || message === "") {
            toast.error("Please Fill All Fields");
        } else if (!(validation.NameRegx).test(name)) {
            toast.error("Please Enter Valid Name");
        } else {

            sendBtn.innerHTML = "Sending...";

            let myFormData = new FormData();
            myFormData.append('name', name);
            myFormData.append('email', email);
            myFormData.append('message', message);

            axios.post(AppURL.PostContact, myFormData).then(response => {
                if (response.data.success) {
                    toast.success("Message Sent Successfully");
                    sendBtn.innerHTML = "Send";
                    contactForm.reset();
                } else toast.error("Message Not Sent");
                sendBtn.innerHTML = "Send";
                contactForm.reset();
            }).catch(error => {
                toast.error(error);
                sendBtn.innerHTML = "Send";
                contactForm.reset();
            })

        }
        e.preventDefault();
    }

    nameOnChange = (e) => {
        let name = e.target.value;
        this.setState({
            name: name
        })
    }
    emailOnChange = (e) => {
        let email = e.target.value;
        this.setState({
            email: email
        })
    }
    messageOnChange = (e) => {
        let message = e.target.value;
        this.setState({
            message: message
        })
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <div className={"bread-body"}>
                        <Breadcrumb>
                            <Breadcrumb.Item> <Link to="/">Home</Link> </Breadcrumb.Item>
                            <Breadcrumb.Item> <Link to="/contact">Contact US</Link> </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row className={"p-2"}>
                        <Col className={"shadow-sm bg-white mt-2"} md={12} lg={12} sm={12} xs={12}>
                            <Row className={"text-center"}>
                                <Col className={"d-flex justify-content-center"} md={6} lg={6} sm={12} xs={12}>
                                    <Form onSubmit={this.OnFormSubmit} className={"onboardForm"} id={"contactForm"}>
                                        <h4 className={"section-title-login m-2"}>CONTACT WITH US</h4>
                                        <h6 className={"section-sub-title-login m-2"}>Please Contact With Us</h6>
                                        <input onChange={this.nameOnChange} type="text" className={"form-control m-2"}
                                               placeholder={"Enter Your Name"}/>
                                        <input onChange={this.emailOnChange} type="email" className={"form-control m-2"}
                                               placeholder={"Enter Your Email"}/>
                                        <FormControl as="textarea" rows="3"
                                                     className={"form-control m-2"} placeholder="Message"
                                                     onChange={this.messageOnChange}></FormControl>
                                        <Button id={"sendBtn"} type={"submit"}
                                                className={"btn site-btn-login btn-block m-2"}>
                                            Send
                                        </Button>
                                    </Form>
                                </Col>
                                <Col className={"p-0 Desktop m-0"} md={6} lg={6} sm={6} xs={6}>
                                    <br/><br/>
                                    <p className={"section-title-contact"}>
                                        1635 Franklin Street Montgomery, Near Sherwood Mall. AL 36104
                                        <br/>
                                        Email : Support@ecom@gmail.com
                                    </p>
                                    <iframe className={"onboardForm"}
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.48788409328!2d106.68943157639848!3d-6.229728026093449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1659663871717!5m2!1sid!2sid"
                                            width="600" height="450" styles="border:0;" allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"></iframe>
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

export default Contact;