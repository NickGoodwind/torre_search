import React, {Component} from "react";
import {Table} from "reactstrap";
import IndividualsTable from "./IndividualsTable";
import axios from "axios";
import {API_URL, HISTORY_END_POINT} from "../constants";

class HistoryTable extends Component {
    state = {
        history: [],
        perPage: 10,
        currentPage: 1
    };

    componentDidMount() {
        this.getHistory();
    }

    getHistory() {
        axios.get(API_URL + HISTORY_END_POINT).then(res => this.setState({history: res.data}));
    }

    formatDate(date) {
        date = new Date(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;

        let strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "  " + strTime;
    }

    renderData = () => {
        const {perPage, currentPage, history} = this.state;
        const last = currentPage * perPage;
        const first = last - perPage;
        const historyChunk = history.slice(first, last)

        return (
            !historyChunk || historyChunk.length <= 0 ? (
                <tr>
                    <td colSpan="6" align="center">
                        <b>Ha! no more records</b>
                    </td>
                </tr>
            ) : (
                historyChunk.map((entry, index) => {
                    return (
                        <tr key={entry.pk}>
                            <td>{entry.pk}</td>
                            <td>{this.formatDate(entry.datetime)}</td>
                            <td>{entry.query}</td>
                        </tr>
                    );
                })
            )
        );
    }

    pagination = () => {
        const {perPage, history} = this.state;
        const amount = [];
        const total = history.length;

        for (let i = 1; i <= Math.ceil(total / perPage); i++) {
            amount.push(i)
        }

        const pagination = (amount) => {
            this.setState({currentPage: amount})
        }

        return (
            <nav>
                <ul className="pagination">
                    {amount.map(number => (
                        <li key={number}
                            className={this.state.currentPage === number ? 'page-item active' : 'page-item'}>
                            <button onClick={() => pagination(number)} className="page-link"> {number} </button>
                        </li>
                    ))}
                </ul>
            </nav>
        )


    }

    render() {
        return (
            <div className="table-container table-responsive flexy-col">
                <Table className="round table table-sm table-dark table-striped table.bordered table-hover">
                    <thead>
                    <tr>
                        <th><a>ID</a></th>
                        <th><a>Date Of Search</a></th>
                        <th><a>Query</a></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderData()}
                    </tbody>
                </Table>
                <div style={{float: 'right'}}>
                    {this.pagination()}
                </div>
                <button className="btn btn-secondary btn-back" onClick={() => this.props.updateRequest("index", [])}>
                    Go Back To Search
                </button>
            </div>
        );
    }
}

export default HistoryTable