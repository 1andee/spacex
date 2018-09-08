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
            order: 'DESC',
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

    validateFormFields = () => {
        let { flight_number, launch_year, country, orbit, order } = this.state;

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
        const orbitTypes = ['LEO', 'ISS', 'PO', 'GTO', 'ES-L1', 'SSO', 'HCO', 'HEO'];
        return (
            <div>
                Search
                <div>
                    <p>Flight Number</p>
                    <input
                        type="text"
                        name="flight_number"
                        placeholder="Flight #"
                        value={this.state.flight_number}
                        onChange={this.onChange}
                    />
                    <p>Launch Year</p>
                    <input
                        type="text"
                        name="launch_year"
                        placeholder="Launch Year"
                        value={this.state.launch_year}
                        onChange={this.onChange}
                    />
                    <p>Country</p><div className="circle" data-tip data-for='country'>?</div>
                    <ReactTooltip id='country' place='right' effect='solid'>
                        <span>
                            Valid countries (as of Sept 2018):
                            {countryList.map((country, i) => {
                                return (
                                    <p key={i}>{country}</p>
                                )
                            })}
                        </span>
                    </ReactTooltip>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={this.state.country}
                        onChange={this.onChange}
                    />
                    <p>Orbit Type</p><div className="circle" data-tip data-for='orbit'>?</div>
                    <ReactTooltip id='orbit' place='right' effect='solid'>
                    <span>
                            Orbit Types:
                            {orbitTypes.map((type, i) => {
                                return (
                                    <p key={i}>{type}</p>
                                )
                            })}
                        </span>
                    </ReactTooltip>
                    <input
                        type="text"
                        name="orbit"
                        placeholder="Orbit Type"
                        value={this.state.orbit}
                        onChange={this.onChange}
                    />
                    <p>Order By</p>
                    <input
                        type="text"
                        name="order"
                        placeholder="Order By (ASC/DESC)"
                        value={this.state.order}
                        onChange={this.onChange}
                    />
                    <br/>
                    <br/>
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