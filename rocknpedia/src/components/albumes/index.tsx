import React from "react";
import { myFetch } from "../../utils";
import "./style.css";

interface IProps {}

interface IState {
  name: "",
  record_label: "",
  album_image: ""    
}

class Album extends React.PureComponent<IProps, IState> {
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
    const { name, record_label, album_image } = this.state;
    myFetch({
      path: "/users",
      method: "GET",
    }).then(json => {
      if (json) {
        
      }
    });
  }

  render() {
    const { name, record_label, album_image } = this.state;
    return (
      <>
      
       </>
    )
  }
}

export default Album;
