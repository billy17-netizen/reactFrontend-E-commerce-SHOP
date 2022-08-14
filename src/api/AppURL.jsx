class AppUrl {
    static BaseURL = "http://127.0.0.1:8000/api/"
    static GetVisitors = this.BaseURL + "getVisitors"
    static GetSiteInfo = this.BaseURL + "getSiteInfo"
    static PostContact = this.BaseURL + "postContact"
    static GetCategory = this.BaseURL + "getCategory"
    static getImageSlider = this.BaseURL + "getImageSlider"
    static getNotification = this.BaseURL + "getNotification"
    static login = this.BaseURL + "login"
    static register = this.BaseURL + "register"
    static user = this.BaseURL + "user"
    static forgetPassword = this.BaseURL + "forgetPassword"
    static resetPassword = this.BaseURL + "resetPassword"
    static addToCart = this.BaseURL + "addToCart"

    static getProductByRemark(Remark) {
        return this.BaseURL + "getProductByRemark/" + Remark
    }

    static getProductByCategory(category) {
        return this.BaseURL + "getProductByCategory/" + category
    }

    static getProductBySubCategory(category, subcategory) {
        return this.BaseURL + "getProductBySubCategory/" + category + "/" + subcategory
    }

    static getProductDetails(code) {
        return this.BaseURL + "getProductDetails/" + code
    }

    static ProductSearch(key) {
        return this.BaseURL + "search/" + key
    }

    static getSimilarProduct(subcategory) {
        return this.BaseURL + "similar/" + subcategory
    }

    static getReviewList(product_id) {
        return this.BaseURL + "reviewList/" + product_id
    }

    static cartCount(product_code) {
        return this.BaseURL + "cartCount/" + product_code
    }

    static addFavourite(product_code, email) {
        return this.BaseURL + "favourite/" + product_code + "/" + email
    }

    static favouriteList(email) {
        return this.BaseURL + "favourite/" + email
    }

    static favouriteRemove(product_code, email) {
        return this.BaseURL + "favouriteRemove/" + product_code + "/" + email
    }
}

export default AppUrl;