import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
import Logo from '../../assets/images/easyshop.png'
import Bars from '../../assets/images/bars.png'
import {Link} from "react-router-dom";
import MegaMenuAll from "../home/MegaMenuAll";
import {Redirect} from "react-router";
import AppUrl from "../../api/AppURL";
import axios from "axios";

class NavMenuDesktop extends Component {
    constructor() {
        super();
        this.state = {
            SideNavState: "sideNavClose",
            ContentOverState: "ContentOverlayClose",
            SearchKey: '',
            SearchRedirectStatus: false,
            CartCount: 0
        }
        this.SearchOnChange = this.SearchOnChange.bind(this);
        this.SearchOnClick = this.SearchOnClick.bind(this);
        this.SearchRedirect = this.SearchRedirect.bind(this);
    }

    componentDidMount() {
        let product_code = this.props.product_code
        axios.get(AppUrl.cartCount(product_code)).then(response => {
            console.log(response.data)
            if (response.data.status === 'success') {
                this.setState({CartCount: response.data.count})
            }
        })
    }

    SearchOnChange = (e) => {
        let SearchKey = e.target.value;
        this.setState({
            SearchKey: SearchKey
        })
    }

    SearchOnClick = () => {
        if (this.state.SearchKey.length >= 2) {
            this.setState({
                SearchRedirectStatus: true
            })
        }
    }

    SearchRedirect = () => {
        if (this.state.SearchRedirectStatus === true) {
            return (
                <Redirect to={"/productBySearch/" + this.state.SearchKey}/>
            )
        }
    }

    MenuBarClickHandler = () => {
        this.SideNavOpenClose();
    }

    ContentOverlayClickHandler = () => {
        this.SideNavOpenClose();
    }

    SideNavOpenClose = () => {
        let SideNavState = this.state.SideNavState;
        let ContentOverState = this.state.ContentOverState;
        if (SideNavState === "sideNavOpen") {
            this.setState({SideNavState: "sideNavClose", ContentOverState: "ContentOverlayClose"});
        } else {
            this.setState({SideNavState: "sideNavOpen", ContentOverState: "ContentOverlayOpen"});
        }
    }

    LogOut = () => {
        localStorage.removeItem("token");
    }

    render() {
        let buttons;
        if (localStorage.getItem("token")) {
            buttons = (
                <div>
                    <Link to={"/favourite"} className={"btn"}><i
                        className={"fa h4 fa-heart"}></i><sup><span
                        className={"badge text-white bg-danger"}>3</span></sup>
                    </Link>
                    <Link to={"/notification"} className={"btn"}><i
                        className={"fa h4 fa-bell"}></i><sup><span
                        className={"badge text-white bg-danger"}>5</span></sup>
                    </Link>
                    <Link to={"/profile"} className={"h4 btn"}>
                        PROFILE
                    </Link>
                    <Link onClick={this.LogOut} to={"/"} className={"h4 btn"}>
                        LOGOUT
                    </Link>
                    <Link to={"/cart"} className={"cart-btn"}><i
                        className={"fa fa-shopping-cart"}></i> {this.state.CartCount} Items
                    </Link>
                </div>
            )
        } else {
            buttons = (
                <div>
                    <Link to={"/favourite"} className={"btn"}><i
                        className={"fa h4 fa-heart"}></i><sup><span
                        className={"badge text-white bg-danger"}>3</span></sup>
                    </Link>
                    <Link to={"/notification"} className={"btn"}><i
                        className={"fa h4 fa-bell"}></i><sup><span
                        className={"badge text-white bg-danger"}>5</span></sup>
                    </Link>
                    <Link to={"/login"} className={"h4 btn"}>
                        LOGIN
                    </Link>
                    <Link to={"/register"} className={"h4 btn"}>
                        REGISTER
                    </Link>
                    <Link to={"/cart"} className={"cart-btn"}><i
                        className={"fa fa-shopping-cart"}></i> 0 Items
                    </Link>
                </div>
            )
        }
        return (
            <Fragment>
                <div className={"TopSectionDown"}>
                    <Navbar fixed={"top"} bg={"light"} className={"navbar"}>
                        <Container fluid={"true"} className={"fixed-top shadow-sm p-2 mb-0 bg-white"}>
                            <Row>
                                <Col lg={4} sm={12} md={4} xs={12}>
                                    <img src={Bars} onClick={this.MenuBarClickHandler} className={"bar-img"} alt=""/>
                                    <Link to={"/"}> <img className={"nav-logo"} src={Logo} alt=""/></Link>
                                </Col>
                                <Col className={"p-1 mt-1"} lg={4} sm={12} md={4} xs={12}>
                                    <div className={"input-group w-100"}>
                                        <input type="text" onChange={this.SearchOnChange} className={"form-control"}/>
                                        <Button onClick={this.SearchOnClick} type={"button"} className={"btn site-btn"}><i
                                            className={"fa fa-search"}></i></Button>
                                    </div>
                                </Col>
                                <Col className={"p-1 mt-1"} lg={4} sm={12} md={4} xs={12}>
                                    {buttons}
                                </Col>
                            </Row>
                            {this.SearchRedirect()}
                        </Container>
                    </Navbar>
                </div>
                <div className={this.state.SideNavState}>
                    <MegaMenuAll/>
                </div>

                <div onClick={this.ContentOverlayClickHandler} className={this.state.ContentOverState}>

                </div>
            </Fragment>

        );
    }
}

export default NavMenuDesktop;