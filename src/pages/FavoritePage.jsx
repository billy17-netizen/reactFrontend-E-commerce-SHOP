import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import Favorite from "../components/Favourite/Favorite";

class FavoritePage extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        const user = this.props.User;
        return (
            <Fragment>
                <div className={"Desktop"}>
                    <NavMenuDesktop/>
                </div>
                <div className={"Mobile"}>
                    <NavMenuMobile/>
                </div>
                <Favorite user={user}/>
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

export default FavoritePage;