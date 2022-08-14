import React, {Component, Fragment} from 'react';
import axios from "axios";
import AppUrl from "../api/AppURL";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import SearchList from "../components/ProductDetails/SearchList";

class SearchPage extends Component {
    constructor({match}) {
        super();
        this.state = {
            SearchKey: match.params.key,
            ProductData: [],
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
        axios.get(AppUrl.ProductSearch(this.state.SearchKey)).then(res => {
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
                <SearchList SearchKey={this.state.SearchKey} ProductData={this.state.ProductData}/>
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

export default SearchPage;