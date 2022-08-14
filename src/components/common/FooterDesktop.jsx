import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Apple from "../../assets/images/apple.png";
import Google from "../../assets/images/google.png";
import AppUrl from "../../api/AppURL";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

class FooterDesktop extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
            android_app_link: '',
            ios_app_link: '',
            facebook_link: '',
            instagram_link: '',
            twitter_link: '',
            copyright_text: '',
        }
    }

    componentDidMount() {
        axios.get(AppUrl.GetSiteInfo).then(res => {
            let status_code = res.status;
            if (status_code === 200) {
                let JsonData = (res.data[0]);
                this.setState({
                    address: JsonData.address,
                    android_app_link: JsonData.android_app_link,
                    ios_app_link: JsonData.ios_app_link,
                    facebook_link: JsonData.facebook_link,
                    instagram_link: JsonData.instagram_link,
                    twitter_link: JsonData.twitter_link,
                    copyright_text: JsonData.copyright_text,
                })
            }
        }).catch(err => {

        })
    }

    render() {
        return (
            <Fragment>
                <div className={"footer-back shadow-sm m-0 mt-5 pt-3"}>
                    <Container>
                        <Row className={"px-0 my-5"}>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <h5 className={"footer-menu-title"}>OFFICE ADDRESS</h5>
                                <p>{ReactHtmlParser(this.state.address)}</p>
                                <h5 className={"footer-menu-title"}>SOCIAL LINK</h5>
                                <a href={this.state.facebook_link} target={"_blank"}><i
                                    className={"fab m-1 h4 fa-facebook"}></i></a>
                                <a href={this.state.instagram_link} target={"_blank"}><i
                                    className={"fab m-1 h4 fa-instagram"}></i></a>
                                <a href={this.state.twitter_link} target={"_blank"}><i
                                    className={"fab m-1 h4 fa-twitter"}></i></a>

                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <h5 className={"footer-menu-title"}>THE COMPANY</h5>
                                <Link className={"footer-link"} to={"/aboutUs"}>About Us</Link><br/>
                                <Link className={"footer-link"} to={"/"}>Company Profile</Link><br/>
                                <Link className={"footer-link"} to={"/contact"}>Contact Us</Link><br/>
                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <h5 className={"footer-menu-title"}>MORE INFO</h5>
                                <Link className={"footer-link"} to={"/purchase"}>How To Purchase</Link><br/>
                                <Link className={"footer-link"} to={"/privacy"}>Privacy Policy</Link><br/>
                                <Link className={"footer-link"} to={"/refund"}>Refund Policy</Link><br/>
                            </Col>
                            <Col lg={3} md={3} sm={6} xs={12}>
                                <h5 className={"footer-menu-title"}>DOWNLOAD APPS</h5>
                                <a href={this.state.ios_app_link} target={"_blank"}>
                                    <img src={Apple} alt={"apple"} className={"mt-2"}/>
                                </a>
                                <a href={this.state.android_app_link} target={"_blank"}>
                                    <img src={Google} alt={"apple"} className={"mt-2"}/>
                                </a>
                                <h5 className={"section-sub-title mt-2"}>Change Your Language</h5>
                                <div id={"google_translate_element"}></div>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid={true} className={"text-center m-0 pt-3 pb-1 bg-dark"}>
                        <Container>
                            <Row>
                                <h6>
                                    <span className={"text-muted"}>{ReactHtmlParser(this.state.copyright_text)}</span>
                                </h6>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default FooterDesktop;