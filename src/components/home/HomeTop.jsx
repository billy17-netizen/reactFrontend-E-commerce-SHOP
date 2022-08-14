import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import MegaMenu from "./MegaMenu";
import HomeSlider from "./HomeSlider";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import SliderLoading from "../PlaceHolder/SliderLoading";

class HomeTop extends Component {
    constructor() {
        super();
        this.state = {
            MenuData: [],
            SliderData: [],
            isLoading: '',
            mainLoading: 'd-none',
        }
    }

    componentDidMount() {
        axios.get(AppUrl.GetCategory).then(res => {
            this.setState({
                MenuData: res.data
            })
        }).catch(err => {

        })

        axios.get(AppUrl.getImageSlider).then(res => {
            this.setState({
                SliderData: res.data,
                isLoading: 'd-none',
                mainLoading: '',
            })
        }).catch(err => {

        })

    }

    render() {
        return (
            <Fragment>
                <SliderLoading isLoading={this.state.isLoading}/>
                <div className={this.state.mainLoading}>
                    <Container className={"p-0 m-0 overflow-hidden"} fluid={true}>
                        <Row>
                            <Col lg={3} md={3} sm={12}>
                                <MegaMenu data={this.state.MenuData}/>
                            </Col>
                            <Col lg={9} md={9} sm={12}>
                                <HomeSlider data={this.state.SliderData}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default HomeTop;