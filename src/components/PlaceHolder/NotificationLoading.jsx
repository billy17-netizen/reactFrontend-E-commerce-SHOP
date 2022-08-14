import React, {Component} from 'react';

class NotificationLoading extends Component {
    render() {
        let isLoading = this.props.isLoading;
        return (
            <div className={isLoading}>
                <div className={"col-9"}>
                    <div className="row">
                    </div>
                    <div className={"ph-picture"}></div>
                </div>
            </div>
        );

    }
}

export default NotificationLoading;