import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            country: '',
            launch_year: '',
            flight_number: '',
            orbit: '',
            orbitTypes: ['LEO', 'ISS', 'PO', 'GTO', 'ES-L1', 'SSO', 'HCO', 'HEO'],
        }
    };

    fetchApiData = (params) => {
        fetch(`https://api.spacexdata.com/v2/launches/all?${params}`, {
            method: 'get'
        })
            .then(response => response.json())
            .then((json) => {
                this.props.refreshMatchingRecords(json);
                this.isLoading = false;
            })
            .catch(error => console.error('Whoops, something blew up:', error));
    };

    componentDidMount() {
        this.fetchApiData();
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    validateFormFields = () => {
        this.isLoading = true;
        let { flight_number, launch_year, country, orbit } = this.state;

        let errorCount = 0;
        let errorText = [];

        if (flight_number) {
            let highest_valid_flight_num = 71;
            if (!(flight_number > 0) || !(flight_number <= highest_valid_flight_num)) {
                errorCount++;
                errorText.push(`Flight number must be between 1 and ${highest_valid_flight_num}`);
            }
        }

        if (launch_year) {
            let first_launch_year = 2006;
            let current_year = new Date().getFullYear();
            if (!(launch_year >= first_launch_year) || !(launch_year <= current_year)) {
                errorCount++;
                errorText.push(`Year must be between 2006 and ${current_year}`);
            }
        }

        if (orbit) {
            if (!this.state.orbitTypes.includes(orbit)) {
                errorCount++;
                errorText.push(`Sorry, ${orbit} is not a recognized orbit type.`);
            }
        }

        if (errorCount > 0) {
            errorText = errorText.join(', ');
            this.setState({
                showError: true,
                errorText: errorText,
            })
        } else {
            this.setState({
                showError: false,
                errorText: '',
            })
            let queryParams = this.buildQueryString();
            this.fetchApiData(queryParams);
        }
    }

    buildQueryString = () => {
        let { flight_number, launch_year, country, orbit } = this.state;
        let string = `flight_number=${flight_number}&launch_year=${launch_year}&nationality=${country}&orbit=${orbit}`;
        return string;
    }

    render() {
        return (
            <div>
                Search
                <div>
                    <input
                        type="text"
                        name="flight_number"
                        placeholder="Flight #"
                        value={this.state.flight_number}
                        onChange={this.onChange}
                    />
                    <input
                        type="text"
                        name="launch_year"
                        placeholder="Launch Year"
                        value={this.state.launch_year}
                        onChange={this.onChange}
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={this.state.country}
                        onChange={this.onChange}
                    />
                    <input
                        type="text"
                        name="orbit"
                        placeholder="Orbit Type"
                        value={this.state.orbit}
                        onChange={this.onChange}
                    />
                    <button onClick={this.validateFormFields}>go</button>
                </div>
                {(this.state.showError) &&
                    <div>
                        <p style={{ color: "red" }}>{this.state.errorText}</p>
                    </div>
                }
            </div>
        );
    };
}

export default Search;