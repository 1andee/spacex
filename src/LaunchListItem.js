import React, { Component } from 'react';
import './App.css';

class LaunchListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {
        return (
            <div>
                {this.props.detail.launch_date_unix} - Mission {this.props.detail.mission_name} ({this.props.detail.rocket.rocket_name})
            </div>
        );
    };
}

export default LaunchListItem;