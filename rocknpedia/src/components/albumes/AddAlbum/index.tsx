import React from "react";
import { myFetch } from "../../../utils";
import "./style.css";
import {match, RouteComponentProps} from "react-router-dom"


interface IState {
  name: "",
  record_label: "",
  album_image: ""    
}


class AlbumEdit extends React.PureComponent<any, IState> {
  componentDidMount() {  
  }
  constructor(props: any) { 
    
    super(props);

    this.state = {
      name: "",
      record_label: "",
      album_image: ""    
    };

  
  }


  render() {
    const { name, record_label } = this.state;
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

export default AlbumEdit;
