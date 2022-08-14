import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import axios from "axios";
import AppUrl from "../../api/AppURL";

class Notification extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            NotificationData: [],
            isLoading: '',
            mainLoading: 'd-none',
            notificationTitle: '',
            notificationDate: '',
            notificationMessage: '',
        }
    }

    componentDidMount() {
        axios.get(AppUrl.getNotification).then(res => {
            this.setState({
                NotificationData: res.data,
                isLoading: 'd-none',
                mainLoading: '',
            })
        }).catch(err => {

        })
    }

    handleClose = () => {
        this.setState({show: false});
    }
    handleShow = (e) => {
        this.setState({show: true});
        let msg = e.target.getAttribute('data-message');
        let title = e.target.getAttribute('data-title');
        let date = e.target.getAttribute('data-date');
        this.setState({
            notificationMessage: msg,
            notificationTitle: title,
            notificationDate: date,
        })
    }

    render() {
        const NotificationList = this.state.NotificationData;

        const MyView = NotificationList.map((NotificationList, index) => {
            return <Col className=" p-1 " md={6} lg={6} sm={12} xs={12}>
                <Card className="notification-card">
                    <Card.Body>
                        <h6> {NotificationList.title}</h6>
                        <p className="py-1  px-0 text-primary m-0"><i className="fa  fa-bell"></i> Date:
                            {NotificationList.date} | Status: Unread</p>
                        <Button onClick={this.handleShow} data-title={NotificationList.title}
                                data-date={NotificationList.date}
                                data-message={NotificationList.message} className={"btn btn-danger"}>Details</Button>
                    </Card.Body>
                </Card>
            </Col>
        })
        return (
            <Fragment>
                <Container className="TopSection">
                    <Row>
                        {MyView}
                    </Row>
                </Container>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <h6><i className={"fa fa-bell"}></i>Date:{this.state.notificationDate}</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>{this.state.notificationTitle}</h6>
                        <p>{this.state.notificationMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default Notification;