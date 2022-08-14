import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import AppUrl from "../../api/AppURL";
import {Link} from "react-router-dom";
import CategoryLoading from "../PlaceHolder/CategoryLoading";

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            MenuData: [],
            isLoading: '',
            mainLoading: 'd-none',
        }
    }

    componentDidMount() {
        axios.get(AppUrl.GetCategory).then(res => {
            this.setState({
                MenuData: res.data,
                isLoading: 'd-none',
                mainLoading: '',
            })
        }).catch(err => {

        })
    }

    render() {

        const CategoryList = this.state.MenuData;
        const MyView = CategoryList.map((CategoryList, index) => {
            return <Col key={index.toString()} className={"p-0"} key={1} xl={2} lg={2} md={2} sm={6} xs={6}>
                <Link className={"text-link"} to={'/productCategory/' + CategoryList.category_name}>
                    <Card className={"h-100 w-100 text-center"}>
                        <Card.Body>
                            <img className={"center"}
                                 src={CategoryList.category_image}
                                 alt=""/>
                            <h5 className={"category-name"}>{CategoryList.category_name}</h5>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        })
        return (
            <div>
                <Fragment>
                    <CategoryLoading isLoading={this.state.isLoading}/>
                    <div className={this.state.mainLoading}>
                        <Container className="text-center" fluid={true}>
                            <div className="section-title text-center mb-55">
                                <h2>CATEGORIES</h2>
                                <p>Some of Our Exclusive Collection, You may Like</p>
                            </div>
                            <Row>
                                {MyView}
                            </Row>
                        </Container>
                    </div>
                </Fragment>
            </div>
        );
    }
}

export default Categories;