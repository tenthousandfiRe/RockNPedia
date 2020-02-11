import React from 'react';

// const VideoListItem = (props) => {
//     const video = props.video;
//same thing but in shorter version
const VideoListItem = ({video, onVideoSelect}) => {
    // const video = props.video;
    // const onVideoSelect = props.onVideoSelect;

    const imageUrl = video.snippet.thumbnails.default.url;
    return (

        <li  style={{background: "unset", color: "white", border: "unset"}}onClick={() => onVideoSelect(video)} className="list-group-item">
            <div className="video-list media" style={{background: "unset"}}>
                <div className="media-left">
                    <img className="media-object" src={imageUrl}/>
                </div>
                <div className="media-body">
                    <div className="media-heading ml-3">{video.snippet.title}</div>
                </div>
            </div>
        </li>
    );
    
    
    
    
};

export default VideoListItem;