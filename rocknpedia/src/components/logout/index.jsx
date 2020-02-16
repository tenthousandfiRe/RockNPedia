import React from 'react'
import audio from '../../assets/audios/08 Keys To The Truck.mp3'
import video from '../../assets/videos/Codehouse.mp4'
import Sound from 'react-sound'
import './style.css'

class Logout extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <>
            <div className="container-fluid d-flex justify-content-center">
                <video className="videoLogout" loop autoPlay muted src={video}></video>
                <Sound
                    url={audio}
                    playStatus={Sound.status.PLAYING}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.handleSongFinishedPlaying}
                />
                </div>

            </>
        );
    }

};


export default (Logout);
