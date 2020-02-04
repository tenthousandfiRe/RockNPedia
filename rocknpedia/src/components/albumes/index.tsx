import React from "react";
import { myFetch } from "../../utils";
import "./style.css";
import {match, RouteComponentProps} from "react-router-dom"


interface IProps {
  match: any
}



interface IState {
  name: "",
  record_label: "",
  album_image: ""    
}




class Album extends React.PureComponent<IProps, IState> {
  componentDidMount() {
    this.getAlbum();
  }
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: "",
      record_label: "",
      album_image: ""    
    };

  
    this.getAlbum = this.getAlbum.bind(this);
  }


  getAlbum() {
    const band_id = this.props.match.params.id
    const { name, record_label, album_image } = this.state;
    myFetch({
      path: `/band/${band_id}/albumes`,
      method: "GET",
    }).then(json => {
      if (json) {
        console.log(json)
        this.setState(json);
      }
    });
  }

  render() {
    const { name, record_label, album_image } = this.state;
    return (
      <>
      <div className="container">

        <div className="col-6">
          <div className="col-3">
            <div className="row">
            <a>{name}</a>
            <a>{record_label}</a>
            <a></a>
            </div>
          </div>
        </div>
      </div>
       </>
    )
  }
}

export default Album;
