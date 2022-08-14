import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import AppUrl from "../../api/AppURL";

class SuggestedProduct extends Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
        axios.get(AppUrl.getSimilarProduct(this.props.subcategory)).then(response => {
            this.setState({
                ProductData: response.data,
            })
        }).catch(err => {

        })
    }

    render() {
        const MyList = this.state.ProductData;


        if (MyList.length > 0) {
            const MyView = MyList.map((MyList, index) => {
                if (MyList.special_price === "na") {
                    return <Col key={1} className={"p-1"} xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className={"text-link"} to={"/productDetails/" + MyList.id}>
                            <Card className={"image-box"}>
                                <img className={"center"}
                                     src={MyList.image}
                                     alt=""/>
                                <Card.Body>
                                    <p className={"product-name-on-card"}>{MyList.title}</p>
                                    <p className={"product-price-on-card"}>Price : $ {MyList.price}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                } else {
                    return <Col key={1} className={"p-1"} xl={2} lg={2} md={2} sm={4} xs={6}>
                        <Link className={"text-link"} to={"/productDetails/" + MyList.id}>
                            <Card className={"image-box"}>
                                <img className={"center"}
                                     src={MyList.image}
                                     alt=""/>
                                <Card.Body>
                                    <p className={"product-name-on-card"}>{MyList.title}</p>
                                    <p className={"product-price-on-card"}>Price
                                        :<strike className={"text-secondary"}> ${MyList.price}</strike> ||
                                        ${MyList.special_price}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                }
            })

            return (
                <Fragment>
                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55">
                            <h2>YOU MAY ALSO LIKE</h2>
                            <p>Some of Our Exclusive Collection, You may Like</p>
                        </div>
                        <Row>
                            {MyView}
                        </Row>
                    </Container>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55">
                            <h2>YOU MAY ALSO LIKE</h2>
                            <p>Some of Our Exclusive Collection, You may Like</p>
                        </div>
                        <p>
                            There have no similar product
                        </p>
                    </Container>
                </Fragment>
            );
        }

    }
}

export default SuggestedProduct;