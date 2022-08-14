import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import axios from "axios";
import AppUrl from "../api/AppURL";
import SliderLoading from "../components/PlaceHolder/SliderLoading";

class ProductDetailsPage extends Component {
    constructor({match}) {
        super();
        this.state = {
            Code: match.params.code,
            ProductData: [],
            isLoading: '',
            mainLoading: 'd-none',
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
        axios.get(AppUrl.getProductDetails(this.state.Code)).then(res => {
            this.setState({
                ProductData: res.data,
                isLoading: 'd-none',
                mainLoading: '',
            })
        }).catch(err => {

        })
    }

    render() {

        const user = this.props.User;
        if (this.state.mainLoading === 'd-none') {
            return (
                <Fragment>
                    <div className={"Desktop"}>
                        <NavMenuDesktop/>
                    </div>
                    <div className={"Mobile"}>
                        <NavMenuMobile/>
                    </div>
                    <SliderLoading isLoading={this.state.isLoading}/>
                    <div className={"Desktop"}>
                        <FooterDesktop/>
                    </div>
                    <div className={"Mobile"}>
                        <FooterMobile/>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <div className={"Desktop"}>
                        <NavMenuDesktop/>
                    </div>
                    <div className={"Mobile"}>
                        <NavMenuMobile/>
                    </div>
                    <ProductDetails User={user} ProductData={this.state.ProductData}/>
                    <div className={"Desktop"}>
                        <FooterDesktop/>
                    </div>
                    <div className={"Mobile"}>
                        <FooterMobile/>
                    </div>
                </Fragment>
            );
        }
    }
}

export default ProductDetailsPage;