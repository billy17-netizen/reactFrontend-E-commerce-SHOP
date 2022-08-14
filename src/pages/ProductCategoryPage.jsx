import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import Category from "../components/ProductDetails/Category";
import axios from "axios";
import AppUrl from "../api/AppURL";

class ProductCategoryPage extends Component {

    constructor({match}) {
        super();
        this.state = {
            Category: match.params.category,
            ProductData: [],
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
        axios.get(AppUrl.getProductByCategory(this.state.Category)).then(res => {
            this.setState({
                ProductData: res.data,
            })
        }).catch(err => {

        })
    }

    render() {
        return (
            <Fragment>
                <div className={"Desktop"}>
                    <NavMenuDesktop/>
                </div>
                <div className={"Mobile"}>
                    <NavMenuMobile/>
                </div>
                <Category Category={this.state.Category} ProductData={this.state.ProductData}/>
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

export default ProductCategoryPage;