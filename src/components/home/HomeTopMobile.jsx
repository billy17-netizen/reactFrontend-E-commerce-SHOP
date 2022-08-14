import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import HomeSlider from "./HomeSlider";

class HomeTopMobile extends Component {
    constructor() {
        super();
        this.state = {
            SliderData: [],
        }
    }

    componentDidMount() {
        axios.get(AppUrl.getImageSlider).then(res => {
            this.setState({
                SliderData: res.data
            })
        }).catch(err => {

        })

    }

    render() {
        return (
            <Fragment>
                <Container className={"p-0 m-0 overflow-hidden"} fluid={true}>
                    <Row className={"p-0 m-0 overflow-hidden"}>
                        <Col lg={12} md={12} sm={12}>
                            <HomeSlider data={this.state.SliderData}/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default HomeTopMobile;