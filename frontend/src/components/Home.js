import React, {Component} from "react";
import Nav from "./Nav";
import Page from "./Page";

class Home extends Component {
    render() {
        return (
            <>
                <Nav/>
                <div className="pages-container">
                    <Page page={this.props.page}/>
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