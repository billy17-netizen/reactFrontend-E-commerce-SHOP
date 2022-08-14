import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserLoginPage from "../pages/UserLoginPage";
import ContactPage from "../pages/ContactPage";
import PurchasePage from "../pages/PurchasePage";
import PrivacyPage from "../pages/PrivacyPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import NotificationPage from "../pages/NotificationPage";
import FavoritePage from "../pages/FavoritePage";
import CartPage from "../pages/CartPage";
import AboutPage from "../pages/AboutPage";
import ProductCategoryPage from "../pages/ProductCategoryPage";
import ProductSubCategoryPage from "../pages/ProductSubCategoryPage";
import RefundPage from "../pages/RefundPage";
import SearchPage from "../pages/SearchPage";
import RegisterPage from "../pages/RegisterPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import axios from "axios";
import AppUrl from "../api/AppURL";
import NavMenuDesktop from "../components/common/NavMenuDesktop";

class AppRoute extends Component {

    constructor() {
        super();
        this.state = {
            User: {}
        }
    }

    setUser = (user) => {
        this.setState({
            User: user
        })
    }

    componentDidMount() {
        axios.get(AppUrl.user).then(res => {
            this.setUser(res.data);
        }).catch(err => {

        })
    }

    render() {
        return (
            <div>
                <Fragment>
                    <NavMenuDesktop User={this.state.User} SetUser={this.setUser}/>
                    <Switch>
                        <Route exact path="/" render={(props) => <HomePage{...props} key={Date.now()}/>}/>
                        <Route exact path="/login" render={(props) => <UserLoginPage User={this.state.User}
                                                                                     SetUser={this.setUser} {...props}
                                                                                     key={Date.now()}/>}/>
                        <Route exact path="/register" render={(props) => <RegisterPage User={this.state.User}
                                                                                       SetUser={this.setUser} {...props}
                                                                                       key={Date.now()}/>}/>
                        <Route exact path="/forgetPassword"
                               render={(props) => <ForgetPasswordPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/resetPassword/:id"
                               render={(props) => <ResetPasswordPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/profile"
                               render={(props) => <ProfilePage User={this.state.User} SetUser={this.setUser} {...props}
                                                               key={Date.now()}/>}/>
                        <Route exact path="/contact" render={(props) => <ContactPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/purchase" render={(props) => <PurchasePage{...props} key={Date.now()}/>}/>
                        <Route exact path="/privacy" render={(props) => <PrivacyPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/refund" render={(props) => <RefundPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/aboutUs" render={(props) => <AboutPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/productDetails/:code"
                               render={(props) => <ProductDetailsPage User={this.state.User}{...props}
                                                                      key={Date.now()}/>}/>
                        <Route exact path="/notification"
                               render={(props) => <NotificationPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/favourite"
                               render={(props) => <FavoritePage User={this.state.User} {...props} key={Date.now()}/>}/>
                        <Route exact path="/cart" render={(props) => <CartPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/productCategory/:category"
                               render={(props) => <ProductCategoryPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/productSubCategory/:category/:subcategory"
                               render={(props) => <ProductSubCategoryPage{...props} key={Date.now()}/>}/>
                        <Route exact path="/productBySearch/:key/"
                               render={(props) => <SearchPage{...props} key={Date.now()}/>}/>
                    </Switch>
                </Fragment>
            </div>
        );
    }
}

export default AppRoute;