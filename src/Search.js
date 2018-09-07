import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            country: '',
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    submit = () => {
        // FIXME: must use Sentence Case in query params
        let country = _.startCase(this.state.country);
        this.fetchApiData(country);
    }

    fetchApiData = (country) => {
        fetch(`https://api.spacexdata.com/v2/launches?nationality=${country}`, {
          method: 'get'
        })
        .then(response => response.json())
        .then((json) => {
          this.props.refreshMatchingRecords(json)
        })
        .catch(error => console.error('Whoops, something blew up:', error));
    };

    componentDidMount() {
        this.fetchApiData('Canada');
    };

    render() {
        return (
            <div>
                Search
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={this.state.country}
                    onChange={this.onChange}
                />
                <button onClick={this.submit}>go</button>
            </div>
        );
    };
}

export default Search;