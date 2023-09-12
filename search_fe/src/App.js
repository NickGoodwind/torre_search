import React, {Component} from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./components/Home";

class App extends Component {
    render() {
        console.log("rendering app...");
        return (
            <Routes>
                <Route exact path="/" element={<Home page="index"/>}/>
                <Route exact path="/search" element={<Home page="search"/>}/>
                <Route exact path="/history" element={<Home page="history"/>}/>
            </Routes>
        )
    }
}

export default App;
