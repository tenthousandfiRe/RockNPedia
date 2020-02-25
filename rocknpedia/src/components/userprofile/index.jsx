import React from "react";
import StarRatings from 'react-star-ratings';
import "./style.css";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { IAccount } from "../../interfaces/IAccount";
import { myFetch, generateAccountFromToken } from "../../utils";
import { SetAccountAction, SetBandAction } from "../../redux/actions";
import jwt from "jsonwebtoken";
import ReactHtmlParser from 'react-html-parser'
import { API_URL, defaultBandImage } from "../../constants";
import { IBand } from "../../interfaces/IBand";
import Swal from 'sweetalert2';
import Unfollow from '../unfollowIcon'
const URL_images = `${API_URL}/avatars/`;

class UserProfile extends React.PureComponent {


  inputFileRef;
  constructor(props) {
    super(props);
    this.inputFileRef = React.createRef();
    this.onUsernameChange = this.onUsernameChange.bind(this);

    this.onRolChange = this.onRolChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      username: this.props.account?.username,
      user_image: this.props.account?.user_image,
      rol: this.props.account?.rol,
      is_admin: 0,
      error: "",
      bandsLikes: [],
      reviews: [],
      followers: [],
      currentPage: 1,
      showFullReview: "reviewDiv",
      reviewsShowed: [],
      rating: 1
    };

    this.changeReviewClassName = this.changeReviewClassName.bind(this)

  }

  changeReviewClassName(e) {
    const { reviewsShowed } = this.state;
    let id_e = e.target.getAttribute("meta-id");

    const flag = reviewsShowed.find((reviewShowedId) => {
      return Number(reviewShowedId) === Number(id_e);
    });
    if (flag) {
      let newState = reviewsShowed;
      newState.pop();
      this.setState({ reviewsShowed: [...newState] })

    } else {
      let newState = reviewsShowed;
      newState.push(id_e);
      this.setState({ reviewsShowed: [...newState] })
    }

  }

  componentDidMount() {
    const { setAccount } = this.props;
    const { user_id } = this.props.account;
    const token = localStorage.getItem("token");
    if (token) {
      setAccount(generateAccountFromToken(token));
    }
    this.getUser();
    this.getReviews();
    myFetch({
      path: `/bands/user_likes/${user_id}`,
      token
    }).then(response => {
      if (response) {

        this.setState({ bandsLikes: response })
      }
    });
    myFetch({
      path: `/users/followers/${user_id}`,
      token
    }).then(response => {
      if (response) {
        this.setState({ followers: response });
      }
    });
  }

  getReviews() {
    const { user_id } = this.props.account;
    myFetch({
      path: `/reviews/user_reviews/${user_id}`,
    }).then(response => {
      if (response) {

        this.setState({ reviews: response })
      }
    });
  }

  onUsernameChange(event) {
    const username = event.target.value;
    this.setState({ username, error: "" });
  }

  onRolChange(event) {
    const rol = event.target.selectedOptions[0].value;
    this.setState({ rol, error: "  " });
  }
  getUser() {
    const token = localStorage.getItem("token");
    const { user_id } = this.props.account;
    myFetch({
      path: `/users/${user_id}`,
      token
    }).then(json => {
      if (json) {
        // const { username, rol, user_image } = json;
        this.props.setAccount(json);
      }
    });
  }



  updateUser() {
    const { username, rol } = this.state;
    if (this.inputFileRef.current?.files) {
      const { user_id } = this.props.account;
      const formData = new FormData();
      const token = localStorage.getItem("token");
      const avatar = this.inputFileRef.current.files[0];
      formData.append("user_image", avatar);
      formData.append("username", username);
      formData.append("rol", rol);

      myFetch({
        path: `/users/${user_id}`,
        method: "POST",
        token,
        formData
      }).then(json => {
        if (json) {
          const {
            username,
            rol,
            user_image,
            user_id
          } = generateAccountFromToken(json.token);
          this.props.setAccount({ username, rol, user_image, user_id });
          localStorage.setItem("token", json.token);
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
            title: 'Usuario actualizado!'
          })
          this.props.history.push("/");
        }
      });
      this.inputFileRef.current.value = "";
    }
  }

  bandView(band_id) {
    myFetch({ path: `/bands/${band_id}` }).then(json => {
      this.props.setBand(json)
    })
    this.props.history.push(`/bands/${band_id}`)
  }



  render() {
    const { currentPage, reviewsShowed, followers, reviews, bandsLikes, username, rol, user_image } = this.state;
    const reviewsPerPage = 3;
    const totalPages = Math.round(reviews.length / reviewsPerPage);
    const reviewToShowPosition = reviewsPerPage * (currentPage - 1);
    return (
      <>
        <div className="separationDiv"></div>
        <div className="container backform d-flex justify-content-center">
          <div className="col-10 mt-3">
            {user_image ? (
              <img
                className="d-flex logoUser mx-auto"
                src={`http://localhost:3003/avatars/${user_image}`}
              ></img>
            ) : (
                <img
                  className="d-flex logoUser mx-auto"
                  src="https://img.icons8.com/pastel-glyph/2x/user-male.png"
                ></img>
              )}

            <label className="label mt-4">
              <strong>Nombre de Usuario</strong>
            </label>
            <div className="control">
              <input
                className="form-control"
                style={{ backgroundColor: "transparent" }}
                type="text"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>
            <div className="field">
              <label className="label">
                <strong>Actualiza tu Rol!</strong>
              </label>
              <div className="control">
                <div className="select">
                  <select
                    style={{ backgroundColor: "transparent" }}
                    className="custom-select"
                    onChange={this.onRolChange}
                    defaultValue={rol}
                  >
                    <option value="usuario">Usuario</option>
                    <option value="guitarra">Guitarra</option>
                    <option value="bateria">Bateria</option>
                    <option value="bajista">Bajista</option>
                    <option value="teclista">Teclista</option>
                    <option value="vocal">Vocal</option>
                    <option value="banda">Banda</option>
                  </select>
                  <label className="mt-3">
                    Clica aquí para actualizar tu avatar!
                  </label>

                  <input
                    type="file"
                    className="custom-file-input"
                    ref={this.inputFileRef}
                  />
                </div>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="btn btn-outline-dark"
                  disabled={username.length === 1}
                  onClick={() => {
                    this.updateUser();
                  }}
                  data-dismiss="modal"
                >
                  Actualizar
                </button>
                {this.state.error}
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container" id="accordionExample">
          <div className="accordion" id="backie">
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
                    <h5>Reviews</h5>
                  </button>
                  <button
                    className="btn btn-outline-dark ml-5 mr-4"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    <h5>Amigos</h5>
                  </button>
                  <button
                    className="btn btn-outline-dark ml-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="true"
                    aria-controls="collapseThree"
                  >
                    <h5>Mis Grupos Favoritos</h5>
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body reviews">
                  {reviews.slice(reviewToShowPosition, reviewToShowPosition + reviewsPerPage).map(({ review_id, review, review_date, album_name, album_image, rating }) => (reviews ?
                    <div className="row">
                      <div className="col-2 justify-content-center mt-2 mb-5"> <img
                        src={album_image ? URL_images + album_image : defaultBandImage}
                      ></img>
                        <div className="d-block justify-content-left mt-2 mb-3 p-0">
                          <div><h5>{album_name}</h5></div>
                          <div><StarRatings
                            starDimension="15px"
                            starSpacing="1px"
                            rating={rating}
                            starRatedColor="red"
                            numberOfStars={5}
                            name='rating'
                          /></div>
                          <span>{new Date(review_date).toLocaleString()}</span></div>
                      </div>
                      <div className={`col-8 ${reviewsShowed.find((IdReviewShowed) => Number(IdReviewShowed) === Number(review_id)) ? "reviewDivFull" : "reviewDiv"}`}>
                        <p>{ReactHtmlParser(`${review}`)}</p>
                      </div>
                      <div className="col-2 float-left"><button className="ButtonShowMoreProfileView" meta-id={review_id} onClick={this.changeReviewClassName}>Ver {`${reviewsShowed.find((IdReviewShowed) => Number(IdReviewShowed) === Number(review_id)) ? "menos" : "más"}`}</button></div>
                    </div>
                    : <p>No has hecho ninguna review aún</p>))}
                </div>
                <div>
                  {[...Array(totalPages)].map((_, num) => (
                    <button
                      className="paginationButtonProfileView"
                      key={num}
                      disabled={num + 1 === currentPage}
                      onClick={() => this.setState({ currentPage: num + 1 })}
                    >
                      {num + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  {bandsLikes.map(({ band_id, name, band_image }) => (
                    <div className="col-md-6 d-flex justify-content-center mt-2 mb-5 float-left">
                      <div className="row">
                        <img style={{ width: 100, height: 100, borderRadius: 50 }} src={band_image ? URL_images + band_image : defaultBandImage} className="card-img" alt="..."></img>
                        <a onClick={() => this.bandView(band_id)} style={{ height: 40, width: 200, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} className="btn btn-outline-dark boton ml-4 mt-5">{name}</a>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                {followers.map(({ user_id, username, user_image }) => (
                  <div className="col-md-6 d-inline-flex justify-content-center mt-4  float-left">
                    <div className="row">

                      <img
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        src={
                          user_image
                            ? URL_images + user_image
                            : defaultBandImage
                        }
                        className="card-img "
                        alt="..."
                      ></img>
                    </div>
                    <div>
                      <p className="mt-3 ml-3" style={{ fontSize: 20 }}>
                        {username}

                      </p>

                    </div>
                    <div className="ml-2 mt-4" onClick={() => this.props.history.push(`/users/`)}>
                      <Unfollow follow_id={user_id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 separationDiv"></div>


      </>
    );
  }
}
const mapStateToProps = ({ account, band, bands }) => ({
  account,
  band,
  bands
});

const mapDispatchToProps = {
  setAccount: SetAccountAction,
  setBand: SetBandAction
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
