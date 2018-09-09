import React, { Component } from 'react';
import Modal from './Modal';
import './App.css';

class LaunchListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    };

    openModal = (mission) => {
        this.setState({
            showingModal: true,
            selectedMission: mission,
        })
    }

    closeModal = () => {
        this.setState({
            showingModal: false,
            selectedMission: '',
        })
    }

    render() {
        const mission = this.props.detail;
        let launchDate = new Date(mission.launch_date_unix * 1000).toDateString();
        return (
            <div className="resultRow">
                <p className="heading">{launchDate} - {mission.mission_name} ({mission.rocket.rocket_name})</p>
                <p className="openModalIcon" onClick={this.openModal.bind(this, mission)}>ℹ️</p>
                {(this.state.showingModal) &&
                    <Modal
                        data={this.state.selectedMission}
                        closeCB={this.closeModal}
                    />
                }
            </div>
        );
    };
}

export default LaunchListItem;