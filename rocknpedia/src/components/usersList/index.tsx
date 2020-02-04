import React from "react";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { IAccount } from "../../interfaces/IAccount";
import { myFetch, generateAccountFromToken } from "../../utils";
import { SetAccountAction, SetUsersAction } from "../../redux/actions";
import "./style.css";
import { IUser } from "../../interfaces/IUsers";

interface IGlobalStateProps {
  account: IAccount | any;
  users: IUser [];
}

interface IGlobalActionProps {
  setUsers(users: any): void;
  setAccount(account: any): void;
}
type TProps = IGlobalStateProps & IGlobalActionProps;

interface IState {
 
}

class userList extends React.PureComponent<TProps, IState> {
  componentWillMount() {
    const { setAccount } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      setAccount(generateAccountFromToken(token));
    }
  }
  constructor(props: TProps) {
    super(props);
    this.state = {
      username: "",
      user_image:"",
      rol: "",
      is_admin: 0,
      
    };
  }
 userList() {
    myFetch({
        path: `/users/`,
      }).then(json => {
        if (json) {
          console.log(json);
        

          this.props.setUsers(json);
        }
      });

 }

  render() { 
    return (
      <>
      
      </>
    );
  }
}
const mapStateToProps = ({ account, users }: IStore): IGlobalStateProps => ({
  account,
  users
});

const mapDispatchToProps = {
  setAccount: SetAccountAction,
  setUsers: SetUsersAction
};

export default connect(mapStateToProps, mapDispatchToProps)(userList);
