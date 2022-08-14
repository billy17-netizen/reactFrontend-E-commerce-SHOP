import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import CollectionLoading from "../PlaceHolder/CollectionLoading";
import {Link} from "react-router-dom";

class Collection extends Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
            isLoading: '',
            mainLoading: 'd-none',
        }
    }

    componentDidMount() {
        axios.get(AppUrl.getProductByRemark("COLLECTION")).then(res => {
            this.setState({
                ProductData: res.data,
                isLoading: 'd-none',
                mainLoading: '',
            })
        }).catch(err => {

        })
    }

    render() {
        const CollectionList = this.state.ProductData;

        const MyView = CollectionList.map((CollectionList, index) => {
            if (CollectionList.special_price === "na") {
                return <Col className={"p-0"} xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Link className={"text-link"} to={"/productDetails/" + CollectionList.id}>
                        <Card className={"image-box card w-100"}>
                            <img className={"center"}
                                 src={CollectionList.image}
                                 alt=""/>
                            <Card.Body>
                                <p className={"product-name-on-card"}>{CollectionList.title}</p>
                                <p className={"product-price-on-card"}>Price : $ {CollectionList.price}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            } else {
                return <Col className={"p-0"} xl={3} lg={3} md={3} sm={6} xs={6}>
                    <Link className={"text-link"} to={"/productDetails/" + CollectionList.id}>
                        <Card className={"image-box card w-100"}>
                            <img className={"center"}
                                 src={CollectionList.image}
                                 alt=""/>
                            <Card.Body>
                                <p className={"product-name-on-card"}>{CollectionList.title}</p>
                                <p className={"product-price-on-card"}>Price
                                    :<strike className={"text-secondary"}> ${CollectionList.price}</strike> ||
                                    ${CollectionList.special_price}
                                </p>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            }
        })
        return (
            <Fragment>
                <CollectionLoading isLoading={this.state.isLoading}/>
                <div className={this.state.mainLoading}>
                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55">
                            <h2>PRODUCT COLLECTION</h2>
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

export default Collection;