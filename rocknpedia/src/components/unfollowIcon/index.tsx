import React from "react";
import { myFetch } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../constants";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { IAccount } from "../../interfaces/IAccount";
import jwt from 'jsonwebtoken';

interface IGlobalStateProps {
    account: IAccount;
  }

interface IState {    
    iconColor: string;
    
  }

  interface IProps {
      follow_id: number;
      
      
  } 

  type TProps = IGlobalStateProps & IProps;


  class unfollowIcon extends React.PureComponent<TProps, IState> {
    
    constructor(props: TProps) {
      super(props);
      this.state = { 
        iconColor: "#6084AD"
      };
    }
  
    unfollowUser(follow_id: number) {
      const { iconColor } = this.state;
      const token = localStorage.getItem("token");
      if (token) {
        const { user_id } = jwt.decode(token) as any;    
        this.setState({ iconColor: "" });
        myFetch({
          path: `/users/followers/delete/${user_id}/${follow_id}`,
          method: "DELETE",
          token
          
        }); 
    }
    
  }
  
    render() {
      const {  iconColor } = this.state;
      const { follow_id } = this.props;
      return (
        <>      
 <FontAwesomeIcon className="followIcon fas fa-user-minus d-flex float-left" style={{ color: iconColor, width: 20, height: 20 }} icon={faUserMinus} onClick={() => this.unfollowUser(follow_id)} />                           
        </>
      );
    }
  }

  
  const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
    account
  });
  
  
  export default connect(mapStateToProps)(unfollowIcon);