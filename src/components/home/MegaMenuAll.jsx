import React, {Component} from 'react';
import axios from "axios";
import AppUrl from "../../api/AppURL";
import {Link} from "react-router-dom";

class MegaMenuAll extends Component {
    constructor() {
        super();
        this.state = {
            MenuData: []
        }
    }

    componentDidMount() {
        axios.get(AppUrl.GetCategory).then(res => {
            this.setState({
                MenuData: res.data
            })
        }).catch(err => {

        })
    }

    MenuItemClick = (e) => {
        e.target.classList.toggle("active");
        var panel = e.target.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px"
        }
    }


    render() {
        const CategoryList = this.state.MenuData;

        const MyView = CategoryList.map((CategoryList, index) => {
            return <div key={index.toString()}>
                <button onClick={this.MenuItemClick} className={"accordionAll"}>
                    <img className={"accordionMenuIconAll"}
                         src={CategoryList.category_image}/>&nbsp; {CategoryList.category_name}
                </button>
                <div className={"panelAll"}>
                    <ul>
                        {
                            CategoryList.subcategory_name.map((subCategory, index) => {
                                return <li key={index.toString()}>
                                    <Link className={"accordionItem"}
                                          to={"/productSubCategory/" + CategoryList.category_name + "/" + subCategory.subcategory_name}>{subCategory.subcategory_name}</Link>
                                </li>
                            })
                        }
                        {/*<li><a href="#" className={"accordionItem"}> Mans Tshirt 1</a></li>*/}
                    </ul>
                </div>
            </div>
        })
        return (
            <div className={"accordionMenuDivAll"}>
                <div className={"accordionMenuDivInsideAll"}>
                    {MyView}
                </div>
            </div>
        );
    }
}

export default MegaMenuAll;