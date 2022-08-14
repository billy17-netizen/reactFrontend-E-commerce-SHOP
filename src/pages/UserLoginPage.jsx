import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import UserLogin from "../components/common/UserLogin";

class UserLoginPage extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {

        const setUser = this.props.SetUser
        const User = this.props.User
        return (
            <Fragment>
                <div className={"Desktop"}>
                    <NavMenuDesktop/>
                </div>
                <div className={"Mobile"}>
                    <NavMenuMobile/>
                </div>
                <UserLogin SetUser={setUser} User={User}/>
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

export default UserLoginPage;