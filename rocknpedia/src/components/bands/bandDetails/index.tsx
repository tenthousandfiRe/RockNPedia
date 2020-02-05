import React from "react";
import { connect } from "react-redux";
import { IBand, IBands } from "../../../interfaces/IBand";
import { IStore } from "../../../interfaces/IStore";
import { myFetch } from "../../../utils";
import { SetBandAction } from "../../../redux/actions";
import "./style.css";
import { API_URL } from "../../../constants";
import { defaultBandImage } from "../../../constants";
const URL_bandupdate = `${API_URL}/avatars/`;
interface IProps {
  band: IBand;
  history: any;
  match: any;
}
interface IGlobalActionProps {
  setBand(band: IBand): void;
}
interface IAlbum {
  album_name: string;
  record_label: string;
  album_image: string;
  album_id: number;
}
interface IState {
  albumes: IAlbum[];
  album_name: string;
  record_label: string;
  album_image: string;
  album_id: number | null;
  error: string;
}

type TProps = IProps & IGlobalActionProps;
class BandDetails extends React.PureComponent<TProps, IState> {
  inputFileRef: React.RefObject<HTMLInputElement>;
  constructor(props: TProps) {
    super(props);

    this.state = {
      albumes: [],
      album_name: "",
      record_label: "",
      album_image: "",
      album_id: null,
      error: ""
    };
    this.inputFileRef = React.createRef();
    this.onAlbumNameChange = this.onAlbumNameChange.bind(this);
    this.onRecordLabelChange = this.onRecordLabelChange.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
  }

  onAlbumNameChange(event: any) {
    const album_name = event.target.value;
    this.setState({ album_name, error: "" });
  }

  onRecordLabelChange(event: any) {
    const record_label = event.target.value;
    this.setState({ record_label, error: "" });
  }

  bandEdit(band_id?: number) {
    myFetch({ path: `/update/${band_id}` }).then(json => {
      console.log(json);
    });
    this.props.history.push(`/bands/update/${band_id}`);
  }

  deleteAlbum(album_id: number) {
    console.log(album_id);
    const band_id = this.props.match.params.id;
    const token = localStorage.getItem("token");
    myFetch({
      path: `/bands/${band_id}/albumes/delete/${album_id}`,
      method: "DELETE",
      token
    });

    this.props.history.push(`/bands/${band_id}`);
  }

  addAlbum() {
    const { album_name, record_label, album_image } = this.state;
    if (this.inputFileRef.current?.files) {
      const band_id = this.props.match.params.id;
      const formData = new FormData();
      const token = localStorage.getItem("token");
      const album_image = this.inputFileRef.current.files[0];
      formData.append("album_image", album_image);
      formData.append("album_name", album_name);
      formData.append("record_label", record_label);

      myFetch({
        path: `/bands/${band_id}/albumes`,
        method: "POST",
        token,
        formData
      }).then(json => {
        if (json) {
          console.log(json);
          console.log(token);

          this.props.history.push(`/bands/${band_id}`);
        }
      });
      this.inputFileRef.current.value = "";
    }
  }

  getAlbum(band_id?: number) {
    myFetch({
      path: `/bands/${band_id}/albumes`,
      method: "GET"
    }).then(json => {
      if (json) {
        console.log(json);
        // const { name, record_label, album_image } = json;
        this.setState({ albumes: json });
      }
    });
  }

  componentDidMount() {
    const band_id = this.props.match.params.id;
    console.log(band_id);
    myFetch({ path: `/bands/${band_id}` }).then(json => {
      this.props.setBand(json);
      console.log(json);
    });
    this.getAlbum(band_id);
  }
  render() {
    const { album_name, record_label } = this.state;
    const { albumes } = this.state;

    const { name, foundation_year, band_image, band_history } = this.props.band;
    const band_id = this.props.match.params.id;
    var token = localStorage.getItem("token");
    return (
      <>
        <div className="container">
          <div className="container bandDivsImage">
            <img
              src={band_image ? URL_bandupdate + band_image : defaultBandImage}
              className="card-img"
              alt="..."
            ></img>
          </div>
          <div className="container bandDivsInfo">
            <h1>{name}</h1>
            <p>{foundation_year}</p>
            {band_history ? (
              <div
                className="historyBackgroundEditBand"
                style={{ borderRadius: 20 }}
              >
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
              </div>
            ) : (
              ""
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

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
                    className="btn btn-outline-dark ml-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="true"
                    aria-controls="collapseThree"
                  >
                    <h2>Covers</h2>
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body col-12 backgroundCollapse">
                  <div className="  d-flex justify-content-end">
                    <button
                      className=" btn btn-outline-dark"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Añadir Album
                    </button>
                  </div>
                  <div
                    className="modal fade"
                    id="exampleModalCenter"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title"
                            id="exampleModalLongTitle"
                          >
                            Añade un Album!
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
                        <div className="modal-body">
                          <div className="">
                            <div className="card-content">
                              <div className="form">
                                <label className="label">
                                  <strong>Nombre</strong>
                                </label>
                                <div className="control">
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={album_name}
                                    onChange={this.onAlbumNameChange}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="label">
                                  <strong>Sello Discografico</strong>
                                </label>
                                <div className="control">
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={record_label}
                                    onChange={this.onRecordLabelChange}
                                  />
                                </div>
                              </div>
                              <div className="field">
                                <label className="label">
                                  <strong>Imagen del Album!</strong>
                                </label>
                                <div className="control">
                                  <div className="select">
                                    <input
                                      type="file"
                                      ref={this.inputFileRef}
                                    ></input>
                                  </div>
                                </div>
                              </div>
                              <div className="field is-grouped">
                                <div className="control">
                                  <button
                                    className="btn btn-outline-info mt-3 boton "
                                    disabled={
                                      album_name.length === 0 ||
                                      record_label.length === 0
                                    }
                                    onClick={this.addAlbum}
                                    data-dismiss="modal"
                                  >
                                    Guardar
                                  </button>
                                  {this.state.error}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {albumes.map(
                    ({ album_name, record_label, album_image, album_id }) => (
                      <div className="card cuerpoCardAlbum mt-4 ">
                        <img
                          className="card-img-top"
                          src={
                            album_image
                              ? URL_bandupdate + album_image
                              : defaultBandImage
                          }
                        />
                        <div className="card-body">
                          <div className="dropdown show d-flex justify-content-end">
                            <a
                              className="dropdown-toggle"
                              href="#"
                              role="button"
                              id="dropdownMenuLink"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            ></a>

                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <button
                                className="dropdown-item"
                                data-toggle="modal"
                                data-target="#EditModalAlbum"
                              >
                                Editar
                              </button>

                              <button
                                className="dropdown-item"
                                onClick={() => this.deleteAlbum(album_id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                          <h5 className="card-title">{album_name}</h5>
                          <p className="card-text">{record_label}</p>
                          <a href="#" className="btn btn-outline-dark">
                            Go Spotify
                          </a>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div
                className="modal fade"
                id="EditModalAlbum"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Modal title</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">Covers</div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </>
    );
  }
}

const mapStateToProps = ({ band, account }: IStore) => ({ band, account });
const mapDispatchToProps = {
  setBand: SetBandAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BandDetails);
