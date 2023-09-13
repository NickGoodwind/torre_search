import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/faw/all.css"
import './css/site.css';

console.log("Initializing");
const isDev = process.env.NODE_ENV === "development";
const root = ReactDOM.createRoot(document.getElementById('root'));
if (isDev) {
    root.render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
} else {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
