import React, {Component} from "react";
import {Table} from "reactstrap";
import axios from "axios";
import {API_URL, SEARCH_END_POINT} from "../constants";
import {Link} from "react-router-dom";

class IndividualsTable extends Component {
    state = {
        called: false,
        individuals: [],
    }

    componentDidMount() {
        if(this.state.called === false) {
            this.search();
            console.log(this.state.individuals)
        }
    }

    search() {
        axios.get(API_URL + SEARCH_END_POINT + window.location.search).then((res) => {
            this.setState({individuals: res.data, called: true});
        });
    }

    render() {
        const results = this.state.individuals;

        return (
            <div className="table-container table-responsive flexy-col">
                <Table className="round table table-sm table-dark table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!results || results.length <= 0 ? (
                        <tr>
                            <td colSpan="6" align="center">
                                <b>Ops, no one is in Torre.ai yet</b>
                            </td>
                        </tr>
                    ) : (
                        results.map(person => (
                            <tr key={person.pk}>
                                <td>{person.name}</td>
                                <td>{person.title}</td>
                                <td><a href={person.link}><i className="far fa-share-square"></i></a></td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
                <Link className="btn btn-secondary btn-back" to="/">Go Back To Search</Link>
            </div>
        );
    }
}

export default IndividualsTable