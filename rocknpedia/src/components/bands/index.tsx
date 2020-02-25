import React from "react";
import "./style.css";
import { connect } from "react-redux";
import landingVideo from "../../assets/videos/rocknpedia.mp4"
import { myFetch } from "../../utils";
import { SetBandsAction, SetBandAction } from "../../redux/actions";
import { IBand } from "../../interfaces/IBand";
import { IStore } from "../../interfaces/IStore";
import "./style.css";
import { API_URL } from '../../constants'
import { defaultBandImage } from '../../constants'
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'
const URL_images = `${API_URL}/avatars/`


interface IGlobalStateProps {
  band: IBand;
  bands: IBand[];
  history: any;
}

interface IState {
  currentPage: number;
  review: {
    album_id: number
    review: string,
    review_date: string,
    username: string,
    album_image: string,
    album_name: string,
    user_image: string
  }

}

interface IGlobalActionProps {
  setBand(band: IBand): void;
  setBands(bands: IBand[]): void;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class Bands extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      currentPage: 1,
      review: {
        album_id: 0,
        review: "",
        review_date: "",
        username: "",
        album_image: "",
        album_name: "",
        user_image: ""
      }
    };

    this.bandView = this.bandView.bind(this);
  }

  getBands() {
    myFetch({ path: "/bands/" }).then(json => {
      this.props.setBands(json);
    });
  }

  getLatestReview() {
    myFetch({ method: "POST", path: "/reviews/latest_review/" }).then(json => {
      this.setState({ review: json[0] });
    });
  }


  componentDidMount() {
    this.getBands()
    this.getLatestReview()
  }
  // function to change the view to the specific band components, getting the info by the ID
  bandView(band_id?: number) {
    myFetch({ path: `/bands/${band_id}` }).then(json => {
      this.props.setBand(json)
    })
    this.props.history.push(`/bands/${band_id}`)
  }

  render() {
    const { currentPage } = this.state;
    const { review, username, review_date, album_image, album_name, album_id } = this.state.review
    const { bands } = this.props
    const bandsPerPage = 2;
    const totalPages = Math.round(bands.length / bandsPerPage);
    const bandsToShowPosition = bandsPerPage * (currentPage - 1);
    return (
      <div className="divPadre">
        <video className="video" loop autoPlay muted src={landingVideo}></video>
        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-5">
              <h2 style={{marginTop: 50}}>Ya en Rock 'N' Pedia</h2>
              {bands.slice(bandsToShowPosition, bandsToShowPosition + bandsPerPage).map(({ band_id, band_image }) => (
                <div className="imgDiv" onClick={() => this.bandView(band_id)} style={{ backgroundImage: `url(${band_image ? URL_images + band_image : defaultBandImage})` }}>
                </div>
              ))}
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
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
                </div>
              </div>
            </div>
            <div className="col-5" style={{marginTop: 50}}><h2>Última review añadida por el usuario {username}</h2>
              <p>{new Date(review_date).toLocaleString()}</p>
              <img
                style={{ width: 200 }}
                src={album_image ? URL_images + album_image : defaultBandImage}
                className="albumImage"
              ></img>
              <p>{album_name}</p>
              <div className="reviewCard ml-4">
                <p>{ReactHtmlParser(`${review}`)}</p>
              </div>
              <Link to={`/reviews/${album_id}`} className="btn btn-outline-light">
                Ver reviews</Link>
            </div>
           

          </div>
        </div>
      </ div>
    )
  }
}

const mapStateToProps = ({ bands }: IStore) => ({ bands });

const mapDispatchToProps = {
  setBands: SetBandsAction,
  setBand: SetBandAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Bands);
