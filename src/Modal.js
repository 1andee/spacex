import React, { Component } from 'react';
import urlParser from 'parse-youtube-url-1andee';
import YouTube from 'react-youtube';
import './App.css';

class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    };
    
    render() {
        let data = this.props.data;
        let video = '';
        if (data.links.video_link) {
            video = urlParser.parse(data.links.video_link);
        }
        return (
            <div className="overlay">
                <div className="modal">
                    <button onClick={this.props.closeCB} className="modalCloseButton">x</button>
                    {(!data.upcoming) &&
                        <img src={data.links.mission_patch_small} className="missionPatch" alt={data.mission_name}></img>
                    }
                    <div className="superNicelyStyledRocketDeets">
                        <p>Flight No. {data.flight_number}</p>
                        <p>Mission Name: {data.mission_name}</p>
                        <break></break>
                        <p>Upcoming: {data.upcoming ? 'true' : 'false'}</p>
                        <break></break>
                        <p>Rocket Name: {data.rocket.rocket_name}</p>
                        <p>Rocket Type: {data.rocket.rocket_type}</p>
                        <break></break>
                        <p>Launch Date: {new Date(data.launch_date_utc).toString()}</p>
                        <break></break>
                        <p>Launch Site: {data.launch_site.site_name_long}</p>
                        <break></break>
                        {(!data.upcoming) &&
                            <p>Launch Success: {data.launch_success ? 'true' : 'false'}</p>
                        }
                        {(data.details) &&
                            <p style={{ textAlign: "left" }}>Details: {data.details}</p>
                        }
                    </div>
                    {(video.id) &&
                        <div className="videoWrapper">
                            <YouTube videoId={video.id} />
                        </div>
                    }
                </div>
            </div>
        );
    };
}

export default Modal;