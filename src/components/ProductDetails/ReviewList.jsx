import React, {Component} from 'react';
import axios from "axios";
import AppUrl from "../../api/AppURL";

class ReviewList extends Component {
    constructor() {
        super();
        this.state = {
            ReviewData: [],
        }
    }

    componentDidMount() {
        window.scroll(0, 0);
        axios.get(AppUrl.getReviewList(this.props.productID)).then(response => {
            this.setState({
                ReviewData: response.data,
            })
        }).catch(err => {

        })
    }

    render() {
        const MyList = this.state.ReviewData;

        if (MyList.length > 0) {
            const MyView = MyList.map((ReviewList, i) => {

                if (ReviewList.reviewer_rating === "1") {
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{ReviewList.reviewer_name}</span> <span
                            className="text-success"><i className="fa fa-star"></i> </span></p>
                        <p>{ReviewList.reviewer_comment}</p>

                    </div>
                } else if (ReviewList.reviewer_rating === "2") {

                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{ReviewList.reviewer_name}</span> <span
                            className="text-success"><i className="fa fa-star"></i> <i
                            className="fa fa-star"></i>   </span></p>
                        <p>{ReviewList.reviewer_comment}</p>

                    </div>


                } else if (ReviewList.reviewer_rating === "3") {
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{ReviewList.reviewer_name}</span> <span
                            className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i
                            className="fa fa-star"></i> </span></p>
                        <p>{ReviewList.reviewer_comment}</p>

                    </div>


                } else if (ReviewList.reviewer_rating === "4") {
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{ReviewList.reviewer_name}</span> <span
                            className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i
                            className="fa fa-star"></i> <i className="fa fa-star"></i> </span></p>
                        <p>{ReviewList.reviewer_comment}</p>

                    </div>


                } else if (ReviewList.reviewer_rating === "5") {
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{ReviewList.reviewer_name}</span> <span
                            className="text-success"><i className="fa fa-star"></i> <i className="fa fa-star"></i> <i
                            className="fa fa-star"></i> <i className="fa fa-star"></i><i
                            className="fa fa-star"></i> </span></p>
                        <p>{ReviewList.reviewer_comment}</p>

                    </div>

                } // end else if


            }) // end map

            return (
                <div>

                    <h6 className="mt-2">REVIEWS</h6>

                    {MyView}

                </div>
            )

        } else {
            return (
                <div>

                    <h6 className="mt-2">REVIEWS</h6>

                    <p>There have no review Yet </p>

                </div>
            )


        }

    }
}

export default ReviewList;