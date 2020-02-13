import React, { useState, useEffect } from "react";
import "./style.css";
import { connect } from "react-redux";
// import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import landingVideo from "../../assets/videos/rocknpedia.mp4"
import { myFetch } from "../../utils";
import { SetBandsAction, SetBandAction } from "../../redux/actions";
import { IBand } from "../../interfaces/IBand";
import { IStore } from "../../interfaces/IStore";
import "./style.css";
import { API_URL } from '../../constants'
import { defaultBandImage } from '../../constants'
import { Link } from 'react-router-dom';
const URL_images = `${API_URL}/avatars/`


interface IGlobalStateProps {
  band: IBand;
  bands: IBand[];
  history: any;
}

interface IState {
  currentPage: number;

}

interface IGlobalActionProps {
  setBand(band: IBand): void;
  setBands(bands: IBand[]): void;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class Bands extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      currentPage: 0
    };

    this.bandView = this.bandView.bind(this);
  }

  getBands() {
    myFetch({ path: "/bands/" }).then(json => {
      this.props.setBands(json);
    });
  }

    componentDidMount() {
        this.getBands()
    }
    // function to change the view to the specific band components, getting the info by the ID
    bandView(band_id?: number) {
        myFetch({ path: `/bands/${band_id}` }).then(json => {
            this.props.setBand(json)
        })
        this.props.history.push(`/bands/${band_id}`)
    }

render() {
  const { currentPage } = this.state;
  const { bands } = this.props
  const bandsPerPage = 2;
  const totalPages = Math.round(bands.length / bandsPerPage);
  const bandsToShowPosition = bandsPerPage * (currentPage - 1);
        return (
            <div className="divPadre">
              <video className="video" loop autoPlay muted src={landingVideo}></video>
                {bands.map(({ band_id, name, foundation_year, band_image }) => (
                    <div className="container-fluid">
                        <div className="row">
                          <div className="col-1"></div>
                            <div className="col-4 imgDiv" style={{backgroundImage: `url(${band_image ? URL_images + band_image : defaultBandImage})`}}>
                            <h1>{name}</h1>
                            </div>
                            {/* <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{name}</h5>
                                    <p className="card-text">{foundation_year}</p>
                                    <a onClick={() => this.bandView(band_id)} className="btn btn-outline-dark boton">Ver historia</a>
                                </div>
                            </div> */}
                            <div className="col-1"></div>
                        </div>
                    </div>
                ))}
            </ div>
        )
    }
}

const mapStateToProps = ({ bands }: IStore) => ({ bands });

const mapDispatchToProps = {
  setBands: SetBandsAction,
  setBand: SetBandAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Bands);
