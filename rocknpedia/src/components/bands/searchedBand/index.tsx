import React, { useState, useEffect } from "react";
import "./style.css";
import { connect } from "react-redux";
import { myFetch } from "../../../utils";
import { SetBandsAction, SetBandAction } from "../../../redux/actions";
import { IBand } from "../../../interfaces/IBand";
import { IStore } from "../../../interfaces/IStore";
import "./style.css";
import { API_URL } from '../../../constants'
import { defaultBandImage } from '../../../constants'
const URL_images = `${API_URL}/avatars/`


interface IGlobalStateProps {
  band: IBand;
  bands: IBand[];
  history: any;
}

interface IState {
}

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
      this.props.setBand(json)
    })
    this.props.history.push(`/bands/${band_id}`)
  }

  render() {
    const { bands } = this.props
    return (
      <>
        <div className="container">


          <div className="row d-flex justify-content-center">
            {bands.length !== 0 ? bands.map(({ band_id, name, foundation_year, band_image }) => (
              <div className="card ml-4 mr-4 mb-5" style={{ width: 180, minHeight: 100 }} id="backAlb">
                <img src={band_image ? URL_images + band_image : defaultBandImage} className="card-img-top" style={{
                    minHeight: 100,
                    minWidth: 60,
                    maxHeight: 180,
                    maxWidth: 180
                  }} />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{foundation_year}</p>
                  <a onClick={() => this.bandView(band_id)} className="btn btn-outline-dark boton">Ver historia</a>
                </div>
              </div>

            )) : <div className="container-fluid"><h2 style={{ color: "white" }}>Esta banda no existe, date de alta o loguéate y añádela</h2></div>}
          </div>
        </div>
      </>

    )
  }
}

const mapStateToProps = ({ bands }: IStore) => ({ bands });

const mapDispatchToProps = {
  setBand: SetBandAction,
  setBands: SetBandsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchedBand);
