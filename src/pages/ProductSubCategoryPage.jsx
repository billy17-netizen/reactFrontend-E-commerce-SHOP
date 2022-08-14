import React, {Component, Fragment} from 'react';
import axios from "axios";
import AppUrl from "../api/AppURL";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import SubCategory from "../components/ProductDetails/SubCategory";

class ProductSubCategoryPage extends Component {
    constructor({match}) {
        super();
        this.state = {
            Category: match.params.category,
            SubCategory: match.params.subcategory,
            ProductData: [],
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
        axios.get(AppUrl.getProductBySubCategory(this.state.Category, this.state.SubCategory)).then(res => {
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
                <SubCategory Category={this.state.Category} SubCategory={this.state.SubCategory}
                             ProductData={this.state.ProductData}/>
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

export default ProductSubCategoryPage;