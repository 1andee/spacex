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
            <div>
                <div onClick={this.openModal.bind(this, mission)}>
                    {launchDate} - {mission.mission_name} ({mission.rocket.rocket_name})
                </div>
                {(this.state.showingModal) &&
                    <div>
                        <Modal
                            data={this.state.selectedMission}
                            closeCB={this.closeModal}
                        />
                    </div>
                }
            </div>
        );
    };
}

export default LaunchListItem;