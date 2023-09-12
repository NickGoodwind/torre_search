import React, {Component} from "react";
import axios from "axios";
import {API_URL, SEARCH_END_POINT} from "../constants";
import Nav from "./Nav";
import Page from "./Page";

class Home extends Component {
    state = {
        page: "index",
        individuals: []
    }

    componentDidMount() {
        this.resetState();
    }

    resetState = () => {
        this.updateRequest("index")
    }

    updateRequest = (page, query = undefined, res = []) => {
        let data = res.data;
        this.setState({page: page, individuals: data});
        query = query !== undefined ? query : "";
        window.history.replaceState(null, "Torres Test App", "/" + page + query);
    }

    render() {
        return (
            <>
                <Nav/>
                <div className="pages-container">
                    <Page page={this.state.page} updateRequest={this.updateRequest} individuals={this.state.individuals}/>
                </div>
                <footer className="footer">
                    <div className="container flexy-row">
                        <p className="pull-center">© NickGoodwind WebApp </p>
                    </div>
                </footer>
            </>
        );
    }
}

export default Home;