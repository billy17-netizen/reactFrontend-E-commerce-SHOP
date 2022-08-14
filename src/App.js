import React, {Component, Fragment} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoute from "./route/AppRoute";
import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

class App extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <AppRoute/>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default App
