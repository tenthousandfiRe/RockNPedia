import React, { createRef } from "react";
import { myFetch } from "../../../utils";
import { connect } from "react-redux";
import { IStore } from "../../../interfaces/IStore";
import { IAccount } from "../../../interfaces/IAccount";
import iziToast from 'izitoast'
import './style.css'

interface IProps {
  account: IAccount;
  history: any
}

interface IGlobalActionProps {}

interface IState {
  name: string;
  foundation_year: any;
  band_image: string;
  created_by: number;
  error: string;
  history: string;
}

type TProps = IProps & IGlobalActionProps;

class InsertBand extends React.PureComponent<TProps, IState> {
  inputFileRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);

    this.inputFileRef = createRef();

    this.state = {
      name: "",
      foundation_year: null,
      band_image: "",
      created_by: 0,
      error: "",
      history: ""
    };

    this.insertBand = this.insertBand.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onFoundationYearChange = this.onFoundationYearChange.bind(this);
    this.insertBand = this.insertBand.bind(this);
  }

  onNameChange(event: any) {
    const name = event.target.value;
    this.setState({ name });
    console.log(name);
  }

  onFoundationYearChange(event: any) {
    const foundation_year = event.target.value;
    this.setState({ foundation_year });
    console.log(foundation_year);
  }

  insertBand() {
    const { name, foundation_year, created_by } = this.state;
    if (this.inputFileRef.current?.files) {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      const band_image = this.inputFileRef.current.files[0];
      console.log(band_image);
      formData.append("band_image", band_image);
      formData.append("name", name);
      formData.append("foundation_year", foundation_year);
      formData.append("created_by", created_by as any);
      myFetch({ method: "POST", path: "/bands/", token, formData }).then(
        json => {
          if (json) {
            console.log(json);
          }
        }
      );
      this.inputFileRef.current.value = "";
    }
    iziToast.show({
          title: 'Hey',
          message: 'Banda insertada correctamente',
      backgroundColor: "grey",
      position: "topLeft"
      })
      setTimeout(this.props.history.push('/'), 2000);
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
                  style={{ visibility: "hidden", backgroundColor: "transparent" }}
                  type="number"
                  value={created_by}
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
                      className="custom-file-input"
                      ref={this.inputFileRef}
                    />
                  </div>

                  <div className="row"></div>
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="btn btn-outline-dark mt-3 boton"
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
