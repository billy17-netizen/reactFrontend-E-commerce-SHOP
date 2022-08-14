import React, {Component, Fragment} from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import ReactHtmlParser from "react-html-parser";
import {Link} from "react-router-dom";

class Privacy extends Component {
    constructor() {
        super();
        this.state = {
            privacy: '',
            loading: '',
            mainLoading: 'd-none',
        }
    }

    componentDidMount() {

        axios.get(AppUrl.GetSiteInfo).then(res => {
            let status_code = res.status;
            if (status_code === 200) {
                let JsonData = (res.data[0].privacy);
                console.log(JsonData);
                this.setState({
                    privacy: JsonData,
                    loading: 'd-none',
                    mainLoading: '',
                })
            }
        }).catch(err => {

        })
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <div className={"bread-body"}>
                        <Breadcrumb>
                            <Breadcrumb.Item> <Link to="/">Home</Link> </Breadcrumb.Item>
                            <Breadcrumb.Item> <Link to="/privacy">Privacy Policy</Link> </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row className={"p-2"}>
                        <Col className={"shadow-sm bg-white mt-2"} md={12} lg={12} sm={12} xs={12}>
                            <div className={this.state.loading}>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-8 empty"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12"></div>
                                            <div className="ph-col-12"></div>
                                            <div className="ph-col-12"></div>
                                            <div className="ph-col-12"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.loading}>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-8 empty"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12"></div>
                                            <div className="ph-col-12"></div>
                                            <div className="ph-col-12"></div>
                                            <div className="ph-col-12"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.mainLoading}>
                                <h4 className={"section-title-login"}>PRIVACY PAGE</h4>
                                <p className={"section-title-contact"}>
                                    {ReactHtmlParser(this.state.privacy)}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Privacy;