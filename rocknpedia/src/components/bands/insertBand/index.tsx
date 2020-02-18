import React, { createRef } from "react";
import { myFetch } from "../../../utils";
import { connect } from "react-redux";
import { IStore } from "../../../interfaces/IStore";
import { IAccount } from "../../../interfaces/IAccount";
import Swal from 'sweetalert2';
import './style.css'

interface IProps {
  account: IAccount;
  history: any;
}

interface IGlobalActionProps {}

interface IState {
  name: string;
  foundation_year: any;
  band_image: string;
  created_by: any;
  error: string;
  history: string;
}

type TProps = IProps & IGlobalActionProps;

class InsertBand extends React.PureComponent<TProps, IState> {
  inputFileRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);


    this.state = {
      name: "",
      foundation_year: null,
      band_image: "",
      created_by: 0,
      error: "",
      history: ""
    };

    this.inputFileRef = createRef();
    this.insertBand = this.insertBand.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onFoundationYearChange = this.onFoundationYearChange.bind(this);
    this.insertBand = this.insertBand.bind(this);
  }

  onNameChange(event: any) {
    const name = event.target.value;
    this.setState({ name });
  }

  onFoundationYearChange(event: any) {
    const foundation_year = event.target.value;
    this.setState({ foundation_year });
  }

  insertBand() {
    const { name, foundation_year, created_by } = this.state;
    if (this.inputFileRef.current?.files) {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      const band_image = this.inputFileRef.current.files[0];
      formData.append("band_image", band_image);
      formData.append("name", name);
      formData.append("foundation_year", foundation_year);
      formData.append("created_by", created_by as any);
      myFetch({ method: "POST", path: "/bands/", token, formData }).then(
        json => {
          if (json) {
          }
        }
      );
      this.inputFileRef.current.value = "";
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Banda insertada!'
    })
    
      setTimeout(() => {this.props.history.push('/')}, 2000);
  }

  render() {
    const { name, foundation_year, history } = this.state;
    let created_by = this.props.account.user_id;
    this.setState({ created_by: created_by });
    return (
      <div className="container">
        <div className="row">
          <div className="col-6"></div>
        <div className="col-6 backform d-flex justify-content-center" style={{marginTop: 100}}>
          <div className="card-content " style={{marginTop: 40}}>
            <div className="form">
              <label className="label">
                <strong>Nombre de banda</strong>
              </label>
              <div className="control">
                <input
                  className="form-control"
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  value={name}
                  onChange={this.onNameChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">
                <strong>Año de fundación</strong>
              </label>
              <div className="control">
                <input
                  className="form-control"
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  maxLength={4}
                  value={foundation_year}
                  onChange={this.onFoundationYearChange}
                ></input>
              </div>
              <div className="control">
                <input
                  className="form-control"
                  style={{ visibility: "hidden" }}
                  type="number"
                  value={created_by as any}
                ></input>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <label className="mt-3" style={{color: "black"}}>Click aquí para subir una imagen de la banda</label>
                  <br />
                  <div className="col-12 border d-flex justify-content-center">
                    <input
                      type="file"
                      className="inputfile"
                      ref={this.inputFileRef}
                    />
                  </div>

                  <div className="row"></div>
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="btn btn-outline-dark mt-3 boton2"
                    disabled={name.length === 0}
                    onClick={this.insertBand}
                    data-dismiss="modal"
                  >
                    Enviar
                  </button>
                  {this.state.error}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ account }: IStore) => ({ account });

export default connect(mapStateToProps, null)(InsertBand);
