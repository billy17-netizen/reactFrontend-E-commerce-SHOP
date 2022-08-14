import React, {Component, Fragment} from 'react';
import {Breadcrumb, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from "react-inner-image-zoom";
import SuggestedProduct from "./SuggestedProduct";
import ReviewList from "./ReviewList";
import cogoToast from 'cogo-toast';
import AppUrl from "../../api/AppURL";
import axios from "axios";

class ProductDetails extends Component {
    constructor() {
        super();
        this.state = {
            previewImg: '0',
            isSize: 'null',
            isColor: 'null',
            color: '',
            size: '',
            quantity: '',
            productCode: 'null',
            addToCart: 'Add To Cart',
            addToFav: 'Favourite',
            pageRefreshStatus: false
        }

    }

    ImageOnClick = (e) => {
        let ImgSrc = e.target.getAttribute("src");
        this.setState({
            previewImg: ImgSrc,
        })
    }

    //ADD TO CART
    addToCart = () => {
        let isSize = this.state.isSize;
        let isColor = this.state.isColor;
        let color = this.state.color;
        let size = this.state.size;
        let quantity = this.state.quantity;
        let productCode = this.state.productCode;
        let email = this.props.User.email;

        if (isColor === 'YES' && color.length === 0) {
            cogoToast.error("Please select color", {position: 'top-right'});
        } else if (isSize === 'YES' && size.length === 0) {
            cogoToast.error("Please select size", {position: 'top-right'});
        } else if (quantity.length === 0) {
            cogoToast.error("Please enter quantity", {position: 'top-right'});
        } else if (!localStorage.getItem('token')) {
            cogoToast.warn("Please login to add to cart", {position: 'top-right'});
        } else {
            this.setState({
                addToCart: 'Adding...',
            })
            let Data = new FormData();
            Data.append('color', color);
            Data.append('size', size);
            Data.append('quantity', quantity);
            Data.append('product_code', productCode);
            Data.append('email', email);
            axios.post(AppUrl.addToCart, Data).then(response => {
                if (response.data.status === 'success') {
                    cogoToast.success("Product added to cart", {position: 'top-right'});
                    this.setState({
                        addToCart: 'Add To Cart',
                    })
                    this.setState({
                        pageRefreshStatus: true
                    })
                } else {
                    cogoToast.error("Something went wrong", {position: 'top-right'});
                    this.setState({
                        addToCart: 'Add To Cart',
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        }

    }

    //ADD TO FAV
    addToFav = () => {
        this.setState({
            addToFav: 'Adding...',
        })
        let productCode = this.state.productCode;
        let email = this.props.User.email;
        let Data = new FormData();
        if (!localStorage.getItem('token')) {
            cogoToast.warn("Please login to add to favourite", {position: 'top-right'});
            this.setState({
                addToFav: 'Favourite',
            })
        } else {
            this.setState({
                addToCart: 'Adding...',
            })
            Data.append('product_code', productCode);
            Data.append('email', email);
            axios.get(AppUrl.addFavourite(productCode, email), Data).then(response => {
                if (response.data.status === 'success') {
                    cogoToast.success("Product added to favourite", {position: 'top-right'});
                    this.setState({
                        addToFav: 'Favourite',
                    })
                } else {
                    cogoToast.error("Something went wrong", {position: 'top-right'});
                    this.setState({
                        addToFav: 'Favourite',
                    })
                }
            }).catch(error => {
                cogoToast.error("Something went wrong", {position: 'top-right'});
                this.setState({
                    addToFav: 'Favourite',
                })
            })
        }
    }

    PageRefresh = () => {
        if (this.state.pageRefreshStatus === true) {
            window.location.reload();
        }
    }

    ColorOnChange = (e) => {
        const color = e.target.value;
        this.setState({
            color: color,
        })
    }

    SizeOnChange = (e) => {
        let size = e.target.value
        this.setState({
            size: size,
        })
    }

    QuantityOnChange = (e) => {
        let quantity = e.target.value
        this.setState({
            quantity: quantity,
        })
    }

    PriceOption(Price, Special_Price) {
        if (Special_Price === 'na') {
            return (
                <h5 className={"product-price-on-card"}>Price : ${Price}</h5>
            );
        } else {
            return (
                <h5 className={"product-price-on-card"}>Price : <strike
                    className={"text-secondary"}>${Price}</strike> || ${Special_Price}</h5>
            )
        }
    }


    render() {
        let ProductAllData = this.props.ProductData

        let Title = ProductAllData.productList[0].title;
        let Brand = ProductAllData.productList[0].brand;
        let Category = ProductAllData.productList[0].category;
        let SubCategory = ProductAllData.productList[0].subcategory;
        let Image = ProductAllData.productList[0].image;
        let Price = ProductAllData.productList[0].price;
        let ProductCode = ProductAllData.productList[0].product_code;
        let Remark = ProductAllData.productList[0].remark;
        let SpecialPrice = ProductAllData.productList[0].special_price;
        let Star = ProductAllData.productList[0].star;

        if (this.state.previewImg === '0') {
            this.setState({
                previewImg: Image,
            })
        }

        let ShortDescription = ProductAllData.productDetails[0].short_description;
        let LongDescription = ProductAllData.productDetails[0].long_description;
        let ImageOne = ProductAllData.productDetails[0].image_one;
        let ImageTwo = ProductAllData.productDetails[0].image_two;
        let ImageThree = ProductAllData.productDetails[0].image_three;
        let ImageFour = ProductAllData.productDetails[0].image_four;
        let Color = ProductAllData.productDetails[0].color;
        let ProductID = ProductAllData.productDetails[0].product_id;
        let Size = ProductAllData.productDetails[0].size;

        var ColorDiv = 'd-none'
        if (Color !== "na") {
            let CollorArray = Color.split(',');
            var Coloroption = CollorArray.map((ColorList, index) => {
                return <option value={ColorList}>{ColorList}</option>
            })
            ColorDiv = ''
        } else {
            ColorDiv = 'd-none'
        }

        var SizeDiv = 'd-none'
        if (Size !== "na") {
            let SizeArray = Size.split(',');
            var Sizeoption = SizeArray.map((SizeList, index) => {
                return <option value={SizeList}>{SizeList}</option>
            })
            SizeDiv = ''
        } else {
            SizeDiv = 'd-none'
        }


        if (this.state.isSize === 'null') {
            if (Size !== "na") {
                this.setState({
                    isSize: "YES",
                })
            } else {
                this.setState({
                    isSize: "NO",
                })
            }
        }

        if (this.state.isColor === 'null') {
            if (Color !== "na") {
                this.setState({
                    isColor: "YES",
                })
            } else {
                this.setState({
                    isColor: "NO",
                })
            }
        }

        if (this.state.productCode === 'null') {
            this.setState({
                productCode: ProductCode,
            })
        }

        return (
            <Fragment>
                <Container fluid={true} className="BetweenTwoSection">
                    <div className={"bread-body"}>
                        <Breadcrumb>
                            <Breadcrumb.Item> <Link to="/">Home</Link> </Breadcrumb.Item>
                            <Breadcrumb.Item> <Link
                                to={"/productCategory/" + Category}>{Category}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item> <Link
                                to={"/productSubCategory/" + Category + "/" + SubCategory}>{SubCategory}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item> <Link
                                to={"/productDetails/" + ProductID}>{Title}</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
                            <Row>
                                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>

                                    <InnerImageZoom className={"detail-image"} zoomScale={1.8} zoomType={"hover"}
                                                    src={this.state.previewImg}
                                                    zoomSrc={this.state.previewImg}/>

                                    <Container className="my-3">
                                        <Row>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.ImageOnClick}
                                                     className="w-100 small-image product-sm-img"
                                                     src={ImageOne} alt=""/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.ImageOnClick}
                                                     className="w-100 small-image product-sm-img"
                                                     src={ImageTwo} alt=""/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.ImageOnClick}
                                                     className="w-100 small-image product-sm-img"
                                                     src={ImageThree} alt=""/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.ImageOnClick}
                                                     className="w-100 small-image product-sm-img"
                                                     src={ImageFour} alt=""/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>

                                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                                    <h5 className="Product-Name">{Title}</h5>
                                    <h6 className="section-sub-title">{ShortDescription}</h6>
                                    {this.PriceOption(Price, SpecialPrice)}
                                    <h6 className="mt-2">Category : <b>{Category}</b></h6>

                                    <h6 className="mt-2">SubCategory : <b>{SubCategory}</b></h6>
                                    <h6 className="mt-2">Brand : <b>{Brand}</b></h6>
                                    <h6 className="mt-2">Product Code : <b>{ProductCode}</b></h6>

                                    <div className={ColorDiv}>
                                        <h6 className="mt-2">Choose Color :</h6>
                                        <select onChange={this.ColorOnChange} name="" id=""
                                                className={"form-control form-select"}>
                                            <option value="">Choose Color</option>
                                            {Coloroption}
                                        </select>
                                    </div>
                                    <div className={SizeDiv}>
                                        <h6 className="mt-2">Choose Size : </h6>
                                        <select onChange={this.SizeOnChange} name="" id=""
                                                className={"form-control form-select"}>
                                            <option value="">Choose Size</option>
                                            {Sizeoption}
                                        </select>
                                    </div>
                                    <div className="">
                                        <h6 className="mt-2">Choose Quantity : </h6>
                                        <select onChange={this.QuantityOnChange} name="" id=""
                                                className={"form-control form-select"}>
                                            <option value="">Choose Quantity</option>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div className="input-group mt-3">
                                        <button onClick={this.addToCart} className="btn site-btn m-1 "><i
                                            className="fa fa-shopping-cart"></i>{this.state.addToCart}
                                        </button>
                                        <button className="btn btn-primary m-1"><i className="fa fa-car"></i> Order Now
                                        </button>
                                        <button onClick={this.addToFav} className="btn btn-primary m-1"><i
                                            className="fa fa-heart"></i> {this.state.addToFav}
                                        </button>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <h6 className="mt-2">DETAILS</h6>
                                    <p>{LongDescription}</p>
                                </Col>

                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <ReviewList productID={ProductID}/>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>
                <SuggestedProduct subcategory={SubCategory}/>
                {this.PageRefresh()}
            </Fragment>
        );
    }
}

export default ProductDetails;