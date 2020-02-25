import React, { PureComponent } from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import { connect } from "react-redux";

// const APIYoutube = "AIzaSyBa0GSoND22D8Rht2Op9zB7xjR92JSi0fc"
const API_KEY = "AIzaSyBa0GSoND22D8Rht2Op9zB7xjR92JSi0fc";
// const API_KEY = "AIzaSyBd0pAc-1ayarsVv9gW2cj0JVAeiW7Oop0";
// const API_KEY = "AIzaSyDrHn1Dq1Rb8n_i9iApNilK87T8MA_463w";
// 'https://www.googleapis.com/youtube/v3/search?key=[AIzaSyBa0GSoND22D8Rht2Op9zB7xjR92JSi0fc]'

class Youtube extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,          
    };
    
    
  }

componentDidMount() {
  setTimeout(() => {this.videoSearch(this.props.band.name)}, 1000);
  }
  

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      
     
    });
  }

  render() {
    return (
      <div className="container col-12 ">
        <div className="row">
          <VideoDetail video={this.state.selectedVideo} className="mt-5" />

          <VideoList 
            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ band }) => ({ band });

export default connect(mapStateToProps, _)(Youtube);
