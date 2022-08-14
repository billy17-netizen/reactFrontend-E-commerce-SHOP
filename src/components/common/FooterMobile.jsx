import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Apple from "../../assets/images/apple.png";
import Google from "../../assets/images/google.png";

class FooterMobile extends Component {
    render() {
        return (
            <Fragment>
                <div className={"footer-back shadow-sm m-0 mt-5 pt-3"}>
                    <Container className={"text-center"}>
                        <Row className={"px-0 my-5"}>
                            <Col className={"p-2"} lg={3} md={3} sm={6} xs={12}>
                                <h5 className={"footer-menu-title"}>OFFICE ADDRESS</h5>
                                <p>1635 Franklin Street Montgomery, Near Sherwood Mall. AL 36104
                                    <br/><br/>
                                    Email : Support@ecom@gmail.com
                                </p>
                                <h5 className={"footer-menu-title"}>SOCIAL LINK</h5>
                                <a href="#"><i className={"fab m-1 h4 fa-facebook"}></i></a>
                                <a href="#"><i className={"fab m-1 h4 fa-instagram"}></i></a>
                                <a href="#"><i className={"fab m-1 h4 fa-twitter"}></i></a>

                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <h5 className={"footer-menu-title"}>DOWNLOAD APPS</h5>
                                <a href="#">
                                    <img src={Apple} alt={"apple"} className={"m    -2"}/>
                                </a>
                                <a href="#">
                                    <img src={Google} alt={"apple"} className={"m-2"}/>
                                </a>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid={true} className={"text-center m-0 pt-3 pb-1 bg-dark"}>
                        <Container>
                            <Row>
                                <h6>
                                    <span className={"text-muted"}>© 2022 E-Com. All rights reserved.</span>
                                </h6>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default FooterMobile;