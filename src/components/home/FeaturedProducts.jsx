import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import FeaturedLoading from "../PlaceHolder/FeaturedLoading";

class FeaturedProducts extends Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
            isLoading: '',
            mainLoading: 'd-none',
        }
    }

    componentDidMount() {
        axios.get(AppUrl.getProductByRemark("FEATURED")).then(res => {
            this.setState({
                ProductData: res.data,
                isLoading: 'd-none',
                mainLoading: '',
            })
        }).catch(err => {

        })
    }

    render() {

        const FeatureList = this.state.ProductData;

        const MyView = FeatureList.map((FeatureList, index) => {
            if (FeatureList.special_price === "na") {
                return <Col key={1} className={"p-1"} xl={2} lg={2} md={2} sm={4} xs={6}>
                    <Link className={"text-link"} to={"/productDetails/" + FeatureList.id}>
                        <Card className={"image-box"}>
                            <img className={"center"}
                                 src={FeatureList.image}
                                 alt=""/>
                            <Card.Body>
                                <p className={"product-name-on-card"}>{FeatureList.title}</p>
                                <p className={"product-price-on-card"}>Price : $ {FeatureList.price}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            } else {
                return <Col key={1} className={"p-1"} xl={2} lg={2} md={2} sm={4} xs={6}>
                    <Link className={"text-link"} to={"/productDetails/" + FeatureList.id}>
                        <Card className={"image-box"}>
                            <img className={"center"}
                                 src={FeatureList.image}
                                 alt=""/>
                            <Card.Body>
                                <p className={"product-name-on-card"}>{FeatureList.title}</p>
                                <p className={"product-price-on-card"}>Price
                                    :<strike className={"text-secondary"}> ${FeatureList.price}</strike> ||
                                    ${FeatureList.special_price}
                                </p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            }
        })
        return (
            <Fragment>
                <FeaturedLoading isLoading={this.state.isLoading}/>
                <div className={this.state.mainLoading}>
                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55">
                            <h2>FEATURED PRODUCT</h2>
                            <p>Some of Our Exclusive Collection, You may Like</p>
                        </div>
                        <Row>
                            {MyView}
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default FeaturedProducts;