import React from 'react';
import { connect } from 'react-redux';
import { IBand } from '../../../interfaces/IBand';
import { IStore } from '../../../interfaces/IStore';
import { IAccount } from '../../../interfaces/IAccount'
import "./style.css";
import { API_URL } from '../../../constants'
import EditBand from '../editBand'
const URL_bandupdate = `${API_URL}/avatars/`



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
        var token = localStorage.getItem("token")
        return (
            <div className="container">
                <div className="container bandDivsImage">
<<<<<<< Updated upstream
                    <img style={{ width: 600, height: 190 }} src={URL_bandupdate + band_image} className="card-img" alt="..."></img>
=======
                    <img style={{ width: "100%", height: "100%" }} src={URL_bandupdate + band_image} className="card-img" alt="..."></img>
>>>>>>> Stashed changes
                </div>
                <div className="container bandDivsInfo">
                    <h1 >{name}</h1>
                    <p>{band_id}</p>
                    <p>{foundation_year}</p>
                    {/* ternary to show the button to edit the band */}
                    {token ? (
                        <button
                            type="button"
                            className="btn btn-outline-info boton my-2 my-sm-0"
                            data-toggle="modal"
                            data-target="#exampleModal"
                        >
                            {" "}
                            Editar
                </button>
                    ) : (
                            ""
                        )}

<div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content modalIndex">
                    <div className="modal-header">
                      <h5
                        className="modal-title offset-5"
                        id="exampleModalLabel"
                      >
                        fsdfsdf
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body d-flex justify-content-center mt-5 ">
                      <EditBand band={band} />
                    </div>
                  </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ band, account }: IStore) => ({ band, account });


export default connect(mapStateToProps, null)(BandDetails)