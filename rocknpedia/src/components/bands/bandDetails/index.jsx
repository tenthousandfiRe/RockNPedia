import React from "react";
import { connect } from "react-redux";
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import CKEditor from 'ckeditor4-react';
import { myFetch } from "../../../utils";
import { SetBandAction } from "../../../redux/actions";
import "./style.css";
import { API_URL } from "../../../constants";
import { defaultBandImage } from "../../../constants";
import { faHeart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactHtmlParser from 'react-html-parser';
import Swal from 'sweetalert2'
import Youtube from '../../Youtube'
const URL_bandupdate = `${API_URL}/avatars/`;

class BandDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      albumes: [],
      album_name: "",
      record_label: "",
      album_image: "",
      album_id: null,
      error: "",
      iconColor: "white",
      review: "",
      reviews: [],
      selectedAlbum: 0,
      rating: 1

    };
    this.inputFileRef = React.createRef();
    this.onAlbumNameChange = this.onAlbumNameChange.bind(this);
    this.onRecordLabelChange = this.onRecordLabelChange.bind(this);
    this.addAlbum = this.addAlbum.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);


  }

  onChangeRating(newRating) {
    const { rating } = this.state
    this.setState({
      rating: newRating
    });
  }

  onAlbumNameChange(event) {
    const album_name = event.target.value;
    this.setState({ album_name, error: "" });
  }

  onRecordLabelChange(event) {
    const record_label = event.target.value;
    this.setState({ record_label, error: "" });
  }

  bandEdit(band_id) {
    myFetch({ path: `/update/${band_id}` }).then(json => {
    });
    this.props.history.push(`/bands/update/${band_id}`);
  }

  deleteAlbum(album_id) {
    const band_id = this.props.match.params.id;
    const token = localStorage.getItem("token");
    myFetch({
      path: `/bands/${band_id}/albumes/delete/${album_id}`,
      method: "DELETE",
      token
    });
    this.props.history.push(`/`);
  }

  removeAlbumAlert(album_id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      background: 'black',
      title: 'Estás seguro de borrar el álbum?',
      text: "No podrás volver atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí!',
      margin: '5px',
      cancelButtonText: 'No, no!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.deleteAlbum(album_id)
        swalWithBootstrapButtons.fire({
          background: 'black',
          title: 'Borrado!',
          text: 'El álbum ha sido borrado.',
          icon: 'success'}
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          background: 'black',
          title: 'Cancelado',
          text:'Aquí no ha pasao ná',
          icon: 'error'
        }
          
        )
      }
    })
    
  }

  addAlbum() {
    const { album_name, record_label } = this.state;
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
          this.props.history.push(`/bands/${band_id}`);
        }
      });
      this.inputFileRef.current.value = "";
    }
  }

  getAlbum(band_id) {
    myFetch({
      path: `/bands/${band_id}/albumes`,
    }).then(json => {
      if (json) {
        this.setState({ albumes: json });
      }
    });
  }



  insertReview(album_id) {
    const { review, rating } = this.state;
    const { user_id } = this.props.account
    const token = localStorage.getItem("token")
    myFetch({ method: "POST", path: `/reviews/${user_id}/${album_id}`, token, json: { review, rating } }).then(
      json => {
        if (json) {
        }
      }
    );
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
      title: 'Review añadida!'
    })
    this.props.history.push(`/`);
  }

  onReviewChange(e) {
    this.setState({
      review: e.editor.getData()
    });
  }

  getReviews(album_id) {
    myFetch({
      path: `/reviews/${album_id}`,
    }).then(json => {
      if (json) {
        this.setState({ reviews: json });
      }
    });
  }

  likesBand() {
    const token = localStorage.getItem("token");
    const { iconColor } = this.state;
    const band_id = this.props.match.params.id;
    const { user_id } = this.props.account;
    if (iconColor === iconColor) {
      this.setState({ iconColor: "red" });
      myFetch({
        method: "POST",
        path: `/bands/user_likes/${band_id}/${user_id}/`,
        token
      });
      if (iconColor === "red") {
        this.setState({ iconColor: "white" });
        myFetch({
          method: "DELETE",
          path: `/bands/user_unlikes/${band_id}/${user_id}/`,
          token
        });
      }
    }

  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const band_id = this.props.match.params.id;
    const { user_id } = this.props.account;
    myFetch({ path: `/bands/${band_id}` }).then(json => {
      this.props.setBand(json);
    });
    setTimeout(() => {myFetch({ path: `/bands/user_likes/${band_id}/${user_id}/`, token }).then(
      json => {
        if (json) {
          if (json.length === 0) {
            this.setState({ iconColor: "white" });
          } else {
            this.setState({ iconColor: "red" });
          }
        }
      }
    )}, 1000)
    this.getAlbum(band_id);
  }

  render() {
    const { album_name, record_label, iconColor, review, selectedAlbum, bandHistoryDiv, buttonShowMore } = this.state;
    const { albumes } = this.state;
    const { name, foundation_year, band_image, band_history } = this.props.band;
    const band_id = this.props.match.params.id;
    var token = localStorage.getItem("token");
    return (
      
      <>
      <div className="separationDiv" />
        <div className="container">
          <div className="row d-flex text-align-center">
          <div className="col-12 bandDivsImage">
            <img
              src={band_image ? URL_bandupdate + band_image : defaultBandImage}
              className="img imagenLogo"
              alt="..."
            ></img>
            {token ? (
              <div className="buttonsDiv">
              <FontAwesomeIcon className="heartIcon" style={{ color: iconColor }} icon={faHeart} onClick={() => this.likesBand()} />
              <button
                type="button"
                className="btn mt-3 buttonBandDetails"
                onClick={() => this.bandEdit(band_id)}
              >
                Editar
                  </button>
              </div>
            ) : ("")}
          </div>
          </div>
          <div className="row d-flex text-align-center"> 
          <div className="col-12 bandDivsInfo mt-5 mb-5">
            <div className="col-12"><h1>{name}</h1>
            <p>{foundation_year}</p></div>
            {band_history ? (
                <>
                  <div
                    className="historyBackgroundEditBandFull"
                    style={{ borderRadius: 20 }}
                  >
                    <p>{ReactHtmlParser(`${band_history}`)}</p>
                  </div>
                </>
              ) : (
                  ""
                )}
          </div>
          </div>
            <div className="row d-flex text-align-center">
            <div className="col-12 accordion" style={{marginBottom: "20px"}}id="accordionExample">
            <div id="out"className="card collapseColor">
              <div
                className="card-header d-flex justify-content-center backAlb"
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
                    <h5>Albumes</h5>
                  </button>
                  <button
                    className="btn btn-outline-dark ml-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="true"
                    aria-controls="collapseThree"
                  >
                    <h5>Videos</h5>
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body col-12" id="out">
                  <div className="d-flex justify-content-end">
                    {token ? <button
                      className=" btn btn-outline-light"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      Añadir Album
                    </button> : ""}
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
                      <div className="modal-content backModal">
                        <div className="modal-header">
                          <h5
                            className="modal-title offset-4"
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
                                <label className="label mb-3">
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
                                <label className="label mt-4 mb-4">
                                  <strong>Año</strong>
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
                                    className="btn btn-outline-light mt-3 offset-5"
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
                  <div className="row">
                  {albumes.map(
                    ({ album_name, record_label, album_image, album_id }) => (
                      <div className="card cuerpoCardAlbum mt-4 ml-5 mr-1 backAlb row ">
                        <img
                          className="card-img-top imgSize"
                          src={
                            album_image
                              ? URL_bandupdate + album_image
                              : defaultBandImage
                          }
                        />

                        <div className="card-body">
                          <h5 className="card-title">{album_name}</h5>
                          {token ? <FontAwesomeIcon
                            className="trashIcon d-flex float-right"
                            icon={faTrashAlt}
                            onClick={() => this.removeAlbumAlert(album_id)}
                          /> : ""}
                          <p className="card-text">{record_label}</p>
                          {token ? <a href="#" data-toggle="modal" onClick={() => this.setState({ selectedAlbum: album_id })} data-target="#Review" className="btn btn-outline-dark mr-2">
                            Añadir review
                          </a> : ""}
                          <Link to={`/reviews/${album_id}`} className="btn btn-outline-dark">
                            Ver reviews</Link>
                        </div>
                      </div>
                    )
                  )}
                  </div>
                </div>
                <div className="control">
                  <div className="modal fade" id="Review" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content modalBackground">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Añade una review</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body justify-content-center">
                          <CKEditor
                            type="inline"
                            style={{ borderBottom: "1px solid black"}}
                            config={{
                              toolbar: [['Bold', 'Italic', 'Cut', 'Copy', 'Paste']]
                            }}
                            data={review}
                            onChange={e => this.onReviewChange(e)}
                          />
                        </div>
                        <div className="container">
                            <div className="row">
                              <div className="col-12">
                                <h5>...y puntúalo</h5>
                                <StarRatings
                                  starDimension="30px"
                                  starSpacing="5px"
                                  rating={this.state.rating}
                                  starRatedColor="red"
                                  changeRating={this.onChangeRating}
                                  numberOfStars={5}
                                  name='rating'
                                />
                              </div>
                            </div>
                          </div>
                        <div class="modal-footer">
                          <button type="button" className="btn btn-outline-dark mt-3 buttonsEditBand"
                            data-dismiss="modal" onClick={() => this.insertReview(selectedAlbum)}>Guardar</button>
                        </div>
                      </div>
                    </div>
                  </div>

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
                <div className="card-body">
                  <Youtube/>
                  
                </div>
              </div>
            </div>
          </div>
          </div>
          
        </div>
        
      </>
    );
  }
}

const mapStateToProps = ({ band, account }) => ({ band, account });
const mapDispatchToProps = {
  setBand: SetBandAction
};

export default connect(mapStateToProps, mapDispatchToProps)(BandDetails);
