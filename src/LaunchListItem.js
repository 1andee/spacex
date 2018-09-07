import React, { Component } from 'react';
import './App.css';

class LaunchListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {
        const mission = this.props.detail;
        let launchDate = new Date(mission.launch_date_unix * 1000).toDateString();
        return (
            <div>
                {launchDate} - {mission.mission_name} ({mission.rocket.rocket_name})
            </div>
        );
    };
}

export default LaunchListItem;