import React from 'react';
import { connect } from 'react-redux';
import { IBand } from '../../../interfaces/IBand';
import { IStore } from '../../../interfaces/IStore';
import { IAccount } from '../../../interfaces/IAccount'
import "./style.css";
const URL_images = 'http://localhost:3003/avatars/'


interface IProps {
    account: IAccount
    band: IBand
}

interface IGlobalActionProps {
}

interface IState {
    is_logged: boolean
}

type TProps = IProps & IGlobalActionProps;

class BandDetails extends React.PureComponent<TProps, IState> {
    constructor(props: TProps) {
        super(props)

        this.state = {
            is_logged: false
        }
    }

    render() {
        const { band } = this.props
        const { band_id, name, foundation_year, band_image } = band
        const isLogged = this.state.is_logged === true
        return(
            <div className="container">
                     <div className="card mb-3 bandDivs">
                     <div className="row no-gutters">
                     <div className="col-md-3 d-flex justify-content-center mt-4">
                             <img style={{ width: 100, height: 100 }} src={URL_images+band_image} className="card-img" alt="..."></img>
                         </div>
                         <div className="col-md-8">
                             <div className="card-body">
                                 <h5 className="card-title">{name}</h5>
                                 <p className="card-text">{band_id}</p>
                                 <p className="card-text">{foundation_year}</p>
                                 <p className="card-text">{band_image}</p>
                                 <p className="card-text"><small className="text-muted">History</small></p>
                             </div>
                             <button type="button" className="btn btn-dark">Añadir review</button>
                         </div>
                     </div>
                 </div>
            </ div>
        )
    }
}

const mapStateToProps = ({ band, account }: IStore) => ({ band, account });


export default connect(mapStateToProps, null)(BandDetails)