import React from 'react';
import './style.css';
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { myFetch } from "../../utils";
import { SetBandsAction, SetBandAction } from '../../redux/actions'
import { IBand } from '../../interfaces/IBand'
import { IStore } from '../../interfaces/IStore'
import BandDetails from './bandDetails/'
import "./style.css";

interface IGlobalStateProps {
    band: IBand
    bands: IBand[];
}

interface IGlobalActionProps {
    setBand(band: IBand): void
    setBands(bands: IBand[]): void,
    history: any
}

type TProps = IGlobalStateProps & IGlobalActionProps;


class Bands extends React.PureComponent<TProps> {
    constructor(props: TProps) {
        super(props)

        this.bandView = this.bandView.bind(this);


    }

    getBands() {
        myFetch({ path: "/bands/" }).then(json => {
            this.props.setBands(json);
        })
    }

    componentDidMount() {
        this.getBands()
    }
    // changing to the specific band view, getting the info by the ID
    bandView(band_id?: number){
        myFetch({ path: `/bands/${band_id}` }).then(json => {
            this.props.setBand(json[0])
        })
        this.props.history.push(`/bands/${band_id}`)
    }

    render() {
        const { bands } = this.props
        return (
            <div className="container">
                {bands.map(({ band_id, name, foundation_year, band_image }) => (
                     <div className="card mb-3 bandDivs">
                     <div className="row no-gutters">
                         <div className="col-md-3 d-flex justify-content-center mt-4">
                             <img style={{ width: 100, height: 100 }} src="https://www.stickpng.com/assets/images/5852df4b394e280271f3b491.png" className="card-img" alt="..."></img>
                         </div>
                         <div className="col-md-8">
                             <div className="card-body">
                                 <h5 className="card-title">{name}</h5>
                                 <p className="card-text">{foundation_year}</p>
                                 <p className="card-text"><small className="text-muted">{band_image}</small></p>
                                 <a onClick={() => this.bandView(band_id)} className="btn btn-outline-info boton">Ver historia</a>
                             </div>
                         </div>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Bands);