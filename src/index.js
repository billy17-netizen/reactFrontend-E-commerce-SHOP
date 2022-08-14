import React from 'react';
import App from './App';
import {render} from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/custom.css';
import '../src/assets/css/fontawesome.css';
import '../src/assets/css/animate.min.css';
import '../src/assets/css/placeholder-loading.min.css';

const rootElement = (document.getElementById('root'));
render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    rootElement
);
reportWebVitals();
