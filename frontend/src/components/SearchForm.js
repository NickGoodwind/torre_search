import React, {Component} from "react";
import {Form, FormGroup, Input} from "reactstrap";

class SearchForm extends Component {
    state = {
        name: ""
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    defaultIfEmpty = (value) => {
        return value === "" ? "" : value;
    };

    render() {
        return (
            <Form id="search-form" className="flexy-col" action="/search">
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