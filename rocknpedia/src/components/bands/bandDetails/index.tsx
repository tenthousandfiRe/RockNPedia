import React from 'react';
import { connect } from 'react-redux';
import { IBand, IBands } from '../../../interfaces/IBand';
import { IStore } from '../../../interfaces/IStore';
import { myFetch } from "../../../utils";
import { SetBandAction } from '../../../redux/actions'
import "./style.css";
import { API_URL } from '../../../constants'
import { defaultBandImage } from '../../../constants'
import Album from '../../albumes';
const URL_bandupdate = `${API_URL}/avatars/`


interface IProps {
  band: IBand
  history: any
  match: any
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
    console.log(json)})
    this.props.history.push(`/bands/update/${band_id}`)
}

componentDidMount(){
  const band_id  = this.props.match.params.id
    console.log(band_id)
    myFetch({ path: `/bands/${band_id}` }).then(json => {
        this.props.setBand(json)
        console.log(json)
    })
}

  render() {
    const { name, foundation_year, band_image, band_history } = this.props.band;
    const band_id = this.props.match.params.id
    var token = localStorage.getItem("token")
    return (
      <>
      
      <div className="container">
        <div className="container bandDivsImage">
          <img src={band_image ? URL_bandupdate + band_image : defaultBandImage} className="card-img" alt="..."></img>
        </div>
        <div className="container bandDivsInfo">
          <h1 >{name}</h1>
          <p>{foundation_year}</p>
          {band_history ? <div className="historyBackgroundEditBand">
            <p>{band_history}</p>
            {/* ternary to show the button to edit the band */}
          {token ? (
            <button
              type="button"
              className="btn mt-3 buttonBandDetails"
              onClick={() => this.bandEdit(band_id)}
            >
              Editar
                </button>
          ) : (
              ""
            )}
            </div> : ""}
          
        </div>
        </div>
        <div className="container">
          <div className="accordion" id="accordionExample">
            <div className="card collapseColor">
              <div
                className="card-header d-flex justify-content-center"
                id="headingOne"
              >
                <h2 className="mb-0">
                  <button
                    className="btn btn-outline-dark mr-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <h2>Albumes</h2>
                  </button>
                  <button
                    className="btn btn-outline-dark ml-5 mr-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    <h2></h2>
                  </button>
                  <button
                    className="btn btn-outline-dark ml-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="true"
                    aria-controls="collapseThree"
                  >
                    <h2></h2>
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  <p>hola</p>
                 <Album match={this.props.match} />
                </div>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">Lista de amigos</div>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">Lista de grupos favoritos</div>
              </div>
            </div>
          </div>
        </div>
        </>
        )
      }
    }
    
const mapStateToProps = ({band, account}: IStore) => ({band, account});

const mapDispatchToProps = {
  setBand: SetBandAction
}        
        
export default connect(mapStateToProps, mapDispatchToProps)(BandDetails)