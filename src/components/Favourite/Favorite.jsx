import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import cogoToast from "cogo-toast";
import {Redirect} from "react-router";

class Favorite extends Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
            isLoading: "",
            mainDiv: "d-none",
            pageRefreshStatus: false
        }
    }

    componentDidMount() {
        window.scroll(0, 0)
        axios.get(AppUrl.favouriteList(this.props.user.email)).then(response => {
            console.log(response.data)
            this.setState({
                ProductData: response.data,
                isLoading: 'd-none',
                mainLoading: '',
            })
        }).catch(err => {

        })
    }

    removeItem = (e) => {
        let product_code = e.target.getAttribute('data-code')
        let email = this.props.user.email

        axios.get(AppUrl.favouriteRemove(product_code, email)).then(response => {
            cogoToast.success("Product item remove", {position: 'top-right'});
            this.setState({
                pageRefreshStatus: true
            })

        }).catch(error => {
            cogoToast.error("Something went wrong", {position: 'top-right'});

        })
    }
    PageRefresh = () => {
        if (this.state.pageRefreshStatus === true) {
            window.location.reload();
        }
    }

    render() {

        if (!localStorage.getItem('token')) {
            return <Redirect to={'/login'}/>
        }

        const FavList = this.state.ProductData;
        const MyView = FavList.map((FavList, i) => {
            return <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className="image-box card w-100">
                    <img className="center w-75" src={FavList.image}/>
                    <Card.Body>
                        <p className="product-name-on-card">{FavList.product_name}</p>

                        <Button data-code={FavList.product_code} onClick={this.removeItem} className="btn btn-sm"> <i
                            className="fa fa-trash-alt"></i> Remove </Button>
                    </Card.Body>
                </Card>
            </Col>
        });
        return (
            <Fragment>
                <Container className="text-center" fluid={true}>
                    <div className="section-title text-center mb-55"><h2> MY FAVOURITE ITEMS</h2>
                        <p>Some Of Our Exclusive Collection, You May Like</p>
                    </div>

                    <Row>
                        {MyView}
                    </Row>
                </Container>
                {this.PageRefresh()}
            </Fragment>
        )
    }
}

export default Favorite;