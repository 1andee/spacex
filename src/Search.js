import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
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
            order: 'ASC',
            orbitTypes: ['LEO', 'ISS', 'PO', 'GTO', 'ES-L1', 'SSO', 'HCO', 'HEO'],
        }
    };

    fetchApiData = (params) => {
        fetch(`https://api.spacexdata.com/v2/launches/all?${params}`, {
            method: 'get'
        })
            .then(response => response.json())
            .then((json) => {
                this.props.fetchCB(json);
                this.isLoading = false;
            })
            .catch((error) => {
                this.setState({
                    showError: true,
                    errorText: `Whoops, something blew up: ${error}`,
                })
            })
    };

    componentDidMount() {
        this.fetchApiData(`order=${this.state.order}`);
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    reset = () => {
        this.setState({
            country: '',
            launch_year: '',
            flight_number: '',
            orbit: '',
            order: 'ASC',
        })
    }

    validateFormFields = () => {
        let { flight_number, launch_year, country, orbit, order } = this.state;

        let errorCount = 0;
        let errorText = [];

        if (flight_number) {
            let highest_valid_flight_num = 88; // as of 09 September 2018
            if (!(flight_number > 0) || !(flight_number <= highest_valid_flight_num)) {
                errorCount++;
                errorText.push(`Flight number must be between 1 and ${highest_valid_flight_num}`);
            }
        }

        if (launch_year) {
            let first_launch_year = 2006;
            let highest_available_year = new Date().getFullYear() + 1;
            if (!(launch_year >= first_launch_year) || !(launch_year <= highest_available_year)) {
                errorCount++;
                errorText.push(`Year must be between 2006 and ${highest_available_year}`);
            }
        }

        if (country) {
            if (country.trim().length === 0 || !isNaN(country)) {
                // TODO: compare to valid array of country names for more precise error checking
                errorCount++;
                errorText.push(`Please enter a real country`);
            }
        }

        if (orbit) {
            if (!this.state.orbitTypes.includes(orbit)) {
                errorCount++;
                errorText.push(`${orbit} is not a recognized orbit type (case sensitive)`);
            }
        }

        if (order) {
            if (order !== 'DESC' && order !== 'ASC') {
                errorCount++;
                errorText.push(`Order must be ASC or DESC (case sensitive)`);
            }
        }

        if (errorCount > 0) {
            errorText = errorText.join(', ');
            this.setState({
                showError: true,
                errorText: errorText,
            })
        } else {
            // success
            this.setState({
                showError: false,
                errorText: '',
            })
            this.isLoading = true;
            let queryParams = this.buildQueryString();
            this.fetchApiData(queryParams);
        }
    }

    buildQueryString = () => {
        let { flight_number, launch_year, country, orbit, order } = this.state;
        country = country.trim();
        let string = `flight_number=${flight_number}&launch_year=${launch_year}&nationality=${country}&orbit=${orbit}&order=${order}`;
        return string;
    }

    render() {
        const countryList = ['Bangladesh', 'Bulgaria', 'Canada', 'Hong Kong', 'Indonesia', 'Israel', 'Japan', 'Luxembourg', 'Malaysia', 'South Korea', 'Spain', 'Taiwan', 'Thailand', 'Turkmenistan', 'United States'];
        return (
            <div className="searchContainer">
                <div className="searchColumns">
                    <div>
                        <p className="heading">Flight Number</p>
                        <input
                            type="text"
                            name="flight_number"
                            placeholder="Flight #"
                            value={this.state.flight_number}
                            onChange={this.onChange}
                        />
                        <p className="heading">Launch Year</p>
                        <input
                            type="text"
                            name="launch_year"
                            placeholder="Launch Year"
                            value={this.state.launch_year}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <div className="inline">
                            <p className="heading"> Payload Nationality</p>
                            <p className="circle" data-tip data-for='country'>?</p>
                            <ReactTooltip id='country' place='bottom' type='info' effect='solid'>
                                <span style={{ fontFamily: "sans-serif"}}>
                                    Valid Nationalities (as of Sept 2018):
                                    {countryList.map((country, i) => {
                                        return (
                                            <p key={i}>{country}</p>
                                        )
                                    })}
                                </span>
                            </ReactTooltip>
                        </div>
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={this.state.country}
                            onChange={this.onChange}
                        />
                        <div className="inline">
                            <p className="heading">Orbit Type</p>
                            <p className="circle" data-tip data-for='orbit'>?</p>
                            <ReactTooltip id='orbit' place='bottom' type='info' effect='solid'>
                                <span style={{ fontFamily: "sans-serif"}}>
                                    Valid Orbit Types:
                                    {this.state.orbitTypes.map((type, i) => {
                                        return (
                                            <p key={i}>{type}</p>
                                        )
                                    })}
                                </span>
                            </ReactTooltip>
                        </div>
                        <input
                            type="text"
                            name="orbit"
                            placeholder="Orbit Type"
                            value={this.state.orbit}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <p className="heading">Order By</p>
                        <input
                            type="text"
                            name="order"
                            placeholder="Order By (ASC/DESC)"
                            value={this.state.order}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
                <div className="buttonGroup">
                    <button onClick={this.reset}>RESET</button>
                    <button onClick={this.validateFormFields}>GO</button>
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