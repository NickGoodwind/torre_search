import React, {Component} from "react";
import { Link, NavLink } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-expand-sm">
                <div className="container-fluid ms-4 me-4">
                    <Link className="navbar-brand btn" to="/">
                        Torre Search
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav-menu">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Search
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/history">
                                    History
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;