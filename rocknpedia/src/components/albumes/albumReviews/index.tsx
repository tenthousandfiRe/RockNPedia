import React from "react";
import "./style.css";
import { myFetch } from "../../../utils";
import "./style.css";
import { defaultBandImage, API_URL } from '../../../constants'
import ReactHtmlParser from 'react-html-parser'
const URL_images = `${API_URL}/avatars/`
const defaultUserImage = "https://img.icons8.com/pastel-glyph/2x/user-male.png"


interface IProps {
  history: any;
  match: any
};

interface IreviewsBD {
  review_id: number;
  review: string;
  review_date: string;
  user_id: number;
  album_name: string;
  album_id: number;
  album_image: string | null;
  username: string;
  user_image: string;
}

interface IState {
  reviews: IreviewsBD[]
  album_selected_image: string | null;
  album_selected_name: string;
  currentPage: number;
  showFullReview: string;
  reviewsShowed: number[];
}

class AlbumDetails extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      reviews: [],
      album_selected_image: "",
      album_selected_name: "",
      currentPage: 0,
      showFullReview: "reviewCard",
      reviewsShowed: [],
    };

    this.changeReviewClassName = this.changeReviewClassName.bind(this)

  }

  getReviews() {
    const album_id = this.props.match.params.id;
    myFetch({ path: `/reviews/${album_id}` }).then(json => {
      this.setState({ reviews: json })
      if (json) {
        this.setState({ album_selected_image: json[0].album_image })
        this.setState({ album_selected_name: json[0].album_name })
      }
    });
  }

  changeReviewClassName(e: any) {
    const { reviewsShowed } = this.state;
    let id_e = e.target.getAttribute("meta-id");

    const flag = reviewsShowed.find((reviewShowedId) => {
      return Number(reviewShowedId)  === Number(id_e);
    });
    console.log(flag)

    if (flag) {
      //elimina
      let newState = reviewsShowed;
      newState.pop();
      this.setState({ reviewsShowed: [...newState]})

    } else {
      //añade
      let newState = reviewsShowed;
      newState.push(id_e as number);
      this.setState({ reviewsShowed: [...newState]})
    }

  }


  componentDidMount() {
    this.getReviews()
  }


  render() {
    const { reviews } = this.state;
    const { album_selected_image, album_selected_name } = this.state;
    const { currentPage, reviewsShowed } = this.state;
    const reviewsPerPage = 3;
    const totalPages = Math.round(reviews.length / reviewsPerPage);
    if (totalPages > 0 && totalPages < currentPage) {
      this.setState({ currentPage: 1 });
    }
    const reviewToShowPosition = reviewsPerPage * (currentPage - 1);
    return (
      <div className="container ReviewsContainer">
        <img
          src={album_selected_image ? URL_images + album_selected_image : defaultBandImage}
          className="albumImage"
        ></img>
        <div><h2>{album_selected_name}</h2></div>
        {reviews.slice(reviewToShowPosition, reviewToShowPosition + reviewsPerPage).map(({ review_id, review, review_date, username, user_image }) => (review ?
          <div className="container-fluid">
            <div className="row">
              <div className="col-2"></div>
              <div className={`col-8 ${reviewsShowed.find((IdReviewShowed) => Number(IdReviewShowed) === Number(review_id)) ? "reviewCardFull" : "reviewCard"}`}>
                <p>{ReactHtmlParser(`${review}`)}</p>
              </div>
              <div className="col-2 d-flex justify-content-center"><div className="userInfo">
                <div><img src={user_image ? URL_images + user_image : defaultUserImage}></img>
                </div>
                <p>{username}</p>
                <p>{new Date(review_date).toLocaleString()}</p>
              </div></div>
              <div className="container">
                <div className="row">
                  <div className="col-8"></div>
                  <div className="col-2"><button className="ButtonShowMore" meta-id={review_id} onClick={this.changeReviewClassName}>Ver {`${reviewsShowed.find((IdReviewShowed) => Number(IdReviewShowed) === Number(review_id)) ? "menos" : "más"}`}</button></div>
                </div>
              </div>
            </div>
          </div>
          : <div><h5 style={{ color: "white" }}>No hay reviews todavía</h5></div>))}
        <div>
          {[...Array(totalPages)].map((_, num) => (
            <button
              className="paginationButton"
              key={num}
              disabled={num + 1 === currentPage}
              onClick={() => this.setState({ currentPage: num + 1 })}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </ div>

    )
  }
}



export default (AlbumDetails);
