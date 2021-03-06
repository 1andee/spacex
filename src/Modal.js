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
                    <div className="modalLaunchDetails">
                        <p>Flight No. {data.flight_number}</p>
                        <p>Mission Name: {data.mission_name}</p>
                        <p>Upcoming: {data.upcoming ? 'true' : 'false'}</p>
                        <p>Rocket Name: {data.rocket.rocket_name}</p>
                        <p>Launch Date: {new Date(data.launch_date_utc).toString()}</p>
                        <p>Launch Site: {data.launch_site.site_name_long}</p>
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