import React from "react";
import "./style.css";
import { myFetch } from "../../../utils";
import "./style.css";
import { defaultBandImage, API_URL } from '../../../constants'
import ReactHtmlParser from 'react-html-parser'
const URL_images = `${API_URL}/avatars/`



interface IProps {
  history: any;
  match: any
};

interface reviewsBD {
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
  reviews: reviewsBD[]
  album_image: string | null;
  album_name: string
}

class AlbumDetails extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      reviews: [],
      album_image: "",
      album_name: ""
    };

  }

  getReviews() {
    const album_id = this.props.match.params.id;
    const album_image = this.state
    myFetch({ path: `/reviews/${album_id}` }).then(json => {
      this.setState({ reviews: json })
      console.log(json)
      this.setState({album_image: json[0]})
      console.log(album_image)
    });
  }

  componentDidMount() {
    this.getReviews()
    }
    

render() {
  const { reviews } = this.state;
        return (
            <div className="container">
              <h1 style={{color: "white"}}>Aquí van las reviews</h1>
                {reviews.map(({ review_id, review, review_date, album_image, album_name, username, user_image  }) => (
                   <div className="container-fluid">
                     <div className="row">
                       <div className="col-2"></div>
                   <div className="container-fluid col-8 reviewCard">
                     <p>{ReactHtmlParser(`${review}`)}</p>
                    
                     <div className="userInfo">
                       <div><img className="d-flex logoUser mx-auto" src={`http://localhost:3003/avatars/${user_image}`}></img>
                       </div>
                       <p>{username}</p>
                       <p>{review_date}</p>
                       </div>
                   </div>
                   <div className="col-2"></div>
                   </div>
                   </div>
                ))}
            </ div>

          //    {/* <div
          //   id="carouselExampleSlidesOnly"
          //   className="carousel slide mt-5"
          //   data-ride="carousel"
          // >
          //   <div className="carousel-inner" style={{height: 500}}>
          //   {bands.map(({ name, foundation_year, band_image }, index) => (
          //     <div className="carousel-item active">             
          //         <img className="d-block w-100" src={
          //           band_image ? URL_images + band_image : defaultBandImage
          //         }/>
                
          //     </div>
          //     ))}
          //   </div>
          // </div> */}

        )
    }
}



export default (AlbumDetails);
