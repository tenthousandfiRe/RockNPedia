import React from 'react';
import { connect } from 'react-redux';
import { IBand } from '../../../interfaces/IBand';
import { IStore } from '../../../interfaces/IStore';
import "./style.css";


interface IProps {
    band: IBand
}

interface IGlobalActionProps {
}

interface IState {}

type TProps = IProps & IGlobalActionProps;

class BandDetails extends React.PureComponent<TProps, IState> {
    constructor(props: TProps) {
        super(props)
    }

    render() {
        const { band } = this.props
        const { band_id, name, foundation_year, band_image } = band
        return(
            <div className="container">
                     <div className="card mb-3 bandDivs">
                     <div className="row no-gutters">
                     <div className="col-md-3 d-flex justify-content-center mt-4">
                             <img style={{ width: 100, height: 100 }} src="https://www.stickpng.com/assets/images/5852df4b394e280271f3b491.png" className="card-img" alt="..."></img>
                         </div>
                         <div className="col-md-8">
                             <div className="card-body">
                                 <h5 className="card-title">{name}</h5>
                                 <p className="card-text">{band_id}</p>
                                 <p className="card-text">{foundation_year}</p>
                                 <p className="card-text">{band_image}</p>
                                 <p className="card-text"><small className="text-muted">History</small></p>
                             </div>
                         </div>
                     </div>
                 </div>
            </ div>
        )
    }
}

const mapStateToProps = ({ band }: IStore) => ({ band });


export default connect(mapStateToProps, null)(BandDetails)