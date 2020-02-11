import React from 'react';

const VideoDetail = ({video}) => {
    if(!video) {
        return <div>Loading</div>
    }
    
    const videoId = video.id.videoId;
    const url = `http://www.youtube.com/embed/${videoId}`;


    return (

        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div style={{color: "white"}}> <h4>{video.snippet.title}</h4></div>
                
            </div>
        </div>
    );
};

export default VideoDetail;