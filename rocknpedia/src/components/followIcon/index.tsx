import React from "react";
import { myFetch } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { IAccount } from "../../interfaces/IAccount";

interface IGlobalStateProps {
    account: IAccount | any;
  }

interface IState {    
    iconColor: string;
  }

  interface IProps {
      user_id: number;

  } 

  type TProps = IGlobalStateProps & IProps;


  class followIcon extends React.PureComponent<TProps, IState> {
    
    constructor(props: TProps) {
      super(props);
      this.state = { 
        iconColor: ""
      };
    }
  
    followUser(follow_id: number) {
      const { iconColor } = this.state;
      const token = localStorage.getItem("token");
      const account_id = this.props.account.user_id;
      if (iconColor === iconColor) {
        this.setState({ iconColor: "#6084AD" });
        myFetch({
          path: `/users/followers/${account_id}/${follow_id}/`,
          method: "POST",
          token
        });
      } else {
        this.setState({ iconColor: "" });
        myFetch({
          path: `/users/followers/${account_id}/${follow_id}/`,
          method: "DELETE",
          token
        });
      }
    }
  
  
    render() {
      const {  iconColor } = this.state;
      const { user_id } = this.props;
      return (
        <>      
 <FontAwesomeIcon className="followIcon fas fa-user-plus d-flex float-left" style={{ color: iconColor, width: 40, height: 40 }} icon={faUserPlus} onClick={() => this.followUser(user_id)} />                           
        </>
      );
    }
  }

  
  const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
    account
  });
  
  
  export default connect(mapStateToProps)(followIcon);