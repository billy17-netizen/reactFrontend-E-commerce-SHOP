import React, {Component} from 'react'
import {Link} from "react-router-dom";

class MegaMenu extends Component {
    constructor(props) {
        super(props);
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

        const CategoryList = this.props.data;

        const MyView = CategoryList.map((CategoryList, index) => {
            return <div key={index.toString()}>
                <button onClick={this.MenuItemClick} className={"accordion"}>
                    <img className={"accordionMenuIcon"}
                         src={CategoryList.category_image}/>&nbsp; {CategoryList.category_name}
                </button>
                <div className={"panel"}>
                    <ul>
                        {
                            (CategoryList.subcategory_name).map((subCategory, index) => {
                                return <li key={index.toString()}>
                                    <Link className={"accordionItem"}
                                          to={"productSubCategory/" + CategoryList.category_name + "/" + subCategory.subcategory_name}>{subCategory.subcategory_name}</Link>
                                </li>
                            })
                        }
                        {/*<li><a href="#" className={"accordionItem"}> Mans Tshirt 1</a></li>*/}
                    </ul>
                </div>
            </div>
        })

        return (
            <div className={"accordionMenuDiv"}>
                <div className={"accordionMenuDivInside"}>
                    {MyView}
                </div>
            </div>
        )
    }
}

export default MegaMenu