import React from "react";
import "./style.css";
import StarRatings from 'react-star-ratings';
import { myFetch } from "../../../utils";
import "./style.css";
import { defaultBandImage, API_URL } from '../../../constants'
import ReactHtmlParser from 'react-html-parser'
const URL_images = `${API_URL}/avatars/`
const defaultUserImage = "https://img.icons8.com/pastel-glyph/2x/user-male.png"




class AlbumDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      album_selected_image: "",
      album_selected_name: "",
      album_recordLabel: 0,
      currentPage: 1,
      showFullReview: "reviewCard",
      reviewsShowed: [],
      average_rating: 0,
      rating: 1
    };

    this.changeReviewClassName = this.changeReviewClassName.bind(this)

  }

  getReviews() {
    const album_id = this.props.match.params.id;
    myFetch({ path: `/reviews/${album_id}` }).then(json => {
      this.setState({ reviews: json })
      if (json[0].rating === undefined) {
        this.setState({ album_selected_image: json[0].album_image })
        this.setState({ album_selected_name: json[0].album_name })
        this.setState({ album_recordLabel: json[0].record_label })

      } else {
        this.setState({ album_selected_image: json[0].album_image })
        this.setState({ album_selected_name: json[0].album_name })
        this.setState({ album_recordLabel: json[0].record_label })
        let rating = 0
        for (let i = 0; i < json.length; i++) {
          rating = rating + json[i].rating
        }
        let average = rating / json.length;
        this.setState({ average_rating: average })
      }
    });
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
    this.getReviews()
  }


  render() {
    const { reviews, average_rating, album_recordLabel } = this.state;
    const { album_selected_image, album_selected_name } = this.state;
    const { currentPage, reviewsShowed } = this.state;
    const reviewsPerPage = 3;
    const totalPages = Math.round(reviews.length / reviewsPerPage)
    const reviewToShowPosition = reviewsPerPage * (currentPage - 1);
    return (
      <>
        <div className="separationDiv"></div>
        <div className="container ReviewsContainer">
          <img
            src={album_selected_image ? URL_images + album_selected_image : defaultBandImage}
            className="albumImage"
          ></img>
          <div><h2>{album_selected_name}</h2><h3>{album_recordLabel}</h3></div>
          <div><StarRatings
            starDimension="30px"
            starSpacing="5px"
            rating={average_rating}
            starRatedColor="red"
            numberOfStars={5}
            name='rating'
          /></div>
          {reviews.slice(reviewToShowPosition, reviewToShowPosition + reviewsPerPage).map(({ review_id, review, review_date, username, user_image, rating }) => (review ?
            <div className="container-fluid">
              <div className="row">
                <div className="col-2"></div>
                <div className={`col-8 ${reviewsShowed.find((IdReviewShowed) => Number(IdReviewShowed) === Number(review_id)) ? "reviewCardFull" : "reviewCard"}`}>
                  <p>{ReactHtmlParser(`${review}`)}</p>
                </div>
                <div className="col-2 d-flex justify-content-center"><div className="userInfo">
                  <div><img src={user_image ? URL_images + user_image : defaultUserImage}></img>
                  </div>
                  <div><StarRatings
                    starDimension="10px"
                    starSpacing="2px"
                    rating={rating}
                    starRatedColor="red"
                    numberOfStars={5}
                    name='rating'
                  /></div>
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
      </>

    )
  }
}



export default (AlbumDetails);
