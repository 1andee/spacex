import React, { Component } from 'react';
import urlParser from 'js-video-url-parser/lib/base';
import 'js-video-url-parser/lib/provider/youtube';
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
                        <img src={data.links.mission_patch_small} alt={data.mission_name}></img>
                    }
                    Flight No. {data.flight_number}
                    Mission Name: {data.mission_name}
                    Upcoming: {data.upcoming ? 'true' : 'false'}
                    Rocket Name: {data.rocket.rocket_name}
                    Rocket Type: {data.rocket.rocket_type}
                    Launch Date: {data.launch_date_utc}
                    Launch Site: {data.launch_site.site_name}
                    Launch Success: {data.launch_success ? 'true' : 'false'}
                    Details: {data.details}
                    {(video.id) &&
                        <YouTube videoId={video.id} opts={{height: '390', width: '640'}} />
                    }
                </div>
            </div>
        );
    };
}

export default Modal;