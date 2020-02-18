import React, { useState, useEffect } from "react";
import "./style.css";
import { connect } from "react-redux";
import { myFetch } from "../../../utils";
import { SetBandsAction, SetBandAction } from "../../../redux/actions";
import { IBand } from "../../../interfaces/IBand";
import { IStore } from "../../../interfaces/IStore";
import "./style.css";
import { API_URL } from "../../../constants";
import { defaultBandImage } from "../../../constants";
const URL_images = `${API_URL}/avatars/`;

interface IGlobalStateProps {
  band: IBand;
  bands: IBand[];
  history: any;
}

interface IState {}

interface IGlobalActionProps {
  setBand(band: IBand): void;
  setBands(bands: IBand[]): void;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class SearchedBand extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.bandView = this.bandView.bind(this);
  }
  // function to change the view to the specific band components, getting the info by the ID
  bandView(band_id?: number) {
    myFetch({ path: `/bands/${band_id}` }).then(json => {
      this.props.setBand(json);
    });
    setTimeout(() => {this.props.history.push(`/bands/${band_id}`)}, 100);
  }



  render() {
    const { bands } = this.props;
    return (
      <>
        <div className="separationDiv"></div>
        <div className="container">
          <div className="row d-flex justify-content-center">
              {bands.length !== 0 ? (
                bands.map(({ band_id, name, band_image }) => (
                    <div
                      className="col-3 imgDiv d-flex justify-content-center float-left mb-5 mr-5 ml-5 cursor animated zoomIn"
                      style={{
                        backgroundImage: `url(${
                          band_image
                            ? URL_images + band_image
                            : defaultBandImage
                        })`, color: "white"
                      }}
                      onClick={() => this.bandView(band_id)}
                    >
                    </div>                
                ))
              ) : (
                <div className="container">
                  <h2 style={{ color: "white" }}>
                    Esta banda no existe, date de alta o loguéate y añádela
                  </h2>
                </div>
              )}
            
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ bands }: IStore) => ({ bands });

const mapDispatchToProps = {
  setBand: SetBandAction,
  setBands: SetBandsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchedBand);
