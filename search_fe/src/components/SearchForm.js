import React, {Component} from "react";
import axios from "axios";
import {Form, FormGroup, Input} from "reactstrap";
import {API_URL, SEARCH_END_POINT} from "../constants";

class SearchForm extends Component {
    state = {
        name: ""
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    search = (event) => {
        event.preventDefault();
        let query = "?name=" + this.state.name;
        axios.get(API_URL + SEARCH_END_POINT + query).then((res) => {
            this.props.updateRequest("search", query, res);
        });
    };

    defaultIfEmpty = (value) => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <Form id="search-form" className="flexy-col" onSubmit={this.search}>
                <FormGroup className="input-group mb-3">
                    <Input type="text" name="name" onChange={this.onChange}
                           placeholder="Search for a name"
                           value={this.defaultIfEmpty(this.state.name)}/>
                </FormGroup>
                <FormGroup id="submit" className="class-group mb-3">
                    <Input type="submit" className="form-control btn btn-secondary"/>
                </FormGroup>
            </Form>

        );
    }
}

export default SearchForm