import React from "react";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { IAccount } from "../../interfaces/IAccount";
import { myFetch, generateAccountFromToken } from "../../utils";
import { SetAccountAction, SetUsersAction } from "../../redux/actions";
import "./style.css";
import { API_URL } from "../../constants";
import { defaultBandImage } from "../../constants";
import FollowIcon from "../followIcon/index";
const URL_images = `${API_URL}/avatars/`;

interface IGlobalStateProps {
  account: IAccount | any;
  
}

interface IGlobalActionProps {
  setUsers(users: any): void;
  setAccount(account: any): void;
}
type TProps = IGlobalStateProps & IGlobalActionProps;

interface IState {
  users: IUserDB[];
  iconColor: string;
}

interface IUserDB {
  user_id: number;
  user_image: string;
  username: string;
  rol: string;
}

interface followedUSers {}

class userList extends React.PureComponent<TProps, IState> {
  componentDidMount() {
    this.getFollowers()
    const { setAccount } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      setAccount(generateAccountFromToken(token));
    }
    myFetch({
      path: `/users/`,
      token
    }).then(response => {
      if (response) {
        this.setState({ users: response });
      }
    });
   

  }




  constructor(props: TProps) {
    super(props);
    this.state = {
      users: [],
      iconColor: ""
    };
  }

getFollowers() {
  const account_id = this.props.account.user_id;
    const token = localStorage.getItem("token");
  myFetch({ path:`/users/followers/${account_id}`, token }).then(
    json => {
      if (json) {
        if (json.length === 0) {
          this.setState({ iconColor: "" });
        } else {
          this.setState({ iconColor: "#6084AD" });
        }
      }
    }
  );
}

  render() {
    const { users } = this.state;
    return (
      <>
      <div className="separationDiv"></div>
        <div className="offset-2">
          <div className="col-12 mt-5">
            {users.map(({ user_id, username, user_image, rol }) => (
              <div
                className="card d-flex justify-content-center float-left mr-5 ml-4 mb-5 animated zoomIn sombreado"
                style={{ width: 180, minHeight: 100 }}
                id="backie"
              >
                <img
                  src={user_image ? URL_images + user_image : defaultBandImage}
                  className="card-img-top imagenescalada"
                  style={{
                    minHeight: 100,
                    minWidth: 60,
                    maxHeight: 180,
                    maxWidth: 180,
                    background: "unset"
                  }}
                ></img>
                <div className="card-body backie" style={{ maxWidth: 200, maxHeight: 170  }} >               
                  <h5 className="card-title">{username}</h5>               
                  <p className="card-text text-uppercase" style={{color: "#6084AD"}}><strong>{rol}</strong></p>    
                  <FollowIcon user_id={user_id}/>             
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

const mapDispatchToProps = {
  setAccount: SetAccountAction,
  setUsers: SetUsersAction
};

export default connect(mapStateToProps, mapDispatchToProps)(userList);
