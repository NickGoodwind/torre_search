import React, {Component} from "react";

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-expand-sm">
                <div className="container-fluid ms-4 me-4">
                    <button className="navbar-brand btn" onClick={() => this.props.updateRequest("index")}>
                        Torre Search
                    </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav-menu">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link active" onClick={() => this.props.updateRequest("index")}>
                                    Search
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => this.props.updateRequest("history")}>
                                    History
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;