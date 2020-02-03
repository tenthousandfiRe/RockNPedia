import React from 'react';
import { connect } from 'react-redux';
import { IBand, IBands } from '../../../interfaces/IBand';
import { IStore } from '../../../interfaces/IStore';
import { IAccount } from '../../../interfaces/IAccount'
import { myFetch } from "../../../utils";
import { SetBandAction } from '../../../redux/actions'
import "./style.css";
import EditBand from '../editBand'
import { API_URL } from '../../../constants'
import { defaultBandImage } from '../../../constants'
const URL_bandupdate = `${API_URL}/avatars/`



interface IProps {
  account: IAccount
  band: IBand
  history: any
}

interface IGlobalActionProps {
  setBand(band: IBand): void
}

interface IState { }

type TProps = IProps & IGlobalActionProps;

class BandDetails extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props)
  }

  bandEdit(band_id?: number){
    myFetch({ path: `/update/${band_id}` }).then(json => {
        console.log(json)
    })
    this.props.history.push(`/bands/update/${band_id}`)
}

  render() {
    const { band } = this.props
    const { band_id, name, foundation_year, band_image } = band
    var token = localStorage.getItem("token")
    return (
      <div className="container">
        <div className="container bandDivsImage">
          <img src={band_image ? URL_bandupdate + band_image : defaultBandImage} className="card-img" alt="..."></img>
        </div>
        <div className="container bandDivsInfo">
          <h1 >{name}</h1>
          <p>{foundation_year}</p>
          {/* ternary to show the button to edit the band */}
          {token ? (
            <button
              type="button"
              className="btn btn-outline-light mt-3 buttons"
              onClick={() => this.bandEdit(band_id)}
            >
              Editar
                </button>
          ) : (
              ""
            )}
        </div>
        </div>
        )
      }
    }
    
const mapStateToProps = ({band, account}: IStore) => ({band, account});

const mapDispatchToProps = {
  setBand: SetBandAction
}        
        
export default connect(mapStateToProps, null)(BandDetails)