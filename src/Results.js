import React, { Component } from 'react';
import LaunchListItem from './LaunchListItem';
import './App.css';

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    };

    mapSearchResults = () => {
        return this.props.searchResults.map((launch, i) => {
            return (
                <LaunchListItem
                    key={i}
                    detail={launch}
                />
            );
        });
    };

    render() {
        return (
            <div className="resultsContainer">
                <h3 className="heading">Results</h3>
                {(this.props.searchResults) &&
                    <div className="notranslate centerLaunchListItems">
                        {this.mapSearchResults()}
                    </div>
                }
                {(this.props.searchResults && !this.props.searchResults.length) &&
                    <div>
                        <p>No records match these search terms, try again!</p>
                    </div>
                }
            </div>
        );
    };
}

export default Results;