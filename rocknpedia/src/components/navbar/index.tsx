import React from "react";
import Login from "../login/index";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { LogoutAction, SetAccountAction } from "../../redux/actions";
import { IAccount } from "../../interfaces/IAccount";
import Register from "../register/index";
import "./style.css";
import { generateAccountFromToken } from "../../utils";
interface IGlobalStateProps {
  account: IAccount | null;
}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
  logout(): void;
  history: any;
}

interface IState {
  isLogged: boolean;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class Navbar extends React.PureComponent<TProps, IState> {
  componentDidMount() {
    const { setAccount } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      setAccount(generateAccountFromToken(token));
    }
  }

  constructor(props: TProps) {
    super(props);

    this.state = {
      isLogged: false
    };

    this.logout = this.logout.bind(this);
    this.vistaProfile = this.vistaProfile.bind(this);
    this.vistaInsertBand = this.vistaInsertBand.bind(this);
  }

  logout() {
    const { logout } = this.props;
    localStorage.removeItem("token");
    logout();
    this.props.history.push("/");
  }
  vistaProfile() {
    this.props.history.push("/userProfile");
  }

  vistaInsertBand() {
    this.props.history.push("/insertBand");
  }

  render() {
    const { account } = this.props;
    const { isLogged } = this.state;
    
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(account);

    return (
      <nav className="navbar navbar-expand-lg navbar-light navie">
        <a className="navbar-brand" href="/">
          Rock 'N' Pedia
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            
          </ul>
          <a className="nav-item">
            {/* ternary to show the button to login */}
            {!account ? (
              <button
                type="button"
                className="btn btn-outline-dark my-2 my-sm-0"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                {" "}
                Log In
              </button>
            ) : (
              ""
            )}

            <div
              className="modal fade"
              id="exampleModal"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content modalIndex">
                  <div className="modal-header">
                    <h5 className="modal-title offset-5" id="exampleModalLabel">
                      Loguéate
                    </h5>
                    <button
                      type="button"
                      className="close light"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body d-flex justify-content-center mt-5 ">
                    <Login />
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a className="nav-item">
            {/* ternary to show or not the button register */}
            {!account ? (
              <button
                type="button"
                className="btn btn-outline-dark my-2 my-sm-0 ml-3"
                data-toggle="modal"
                data-target="#exampleModal2"
              >
                {" "}
                Register
              </button>
            ) : (
              ""
            )}

            <div
              className="modal fade"
              id="exampleModal2"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content  modalIndex">
                  <div className="modal-header">
                    <h5 className="modal-title offset-5" id="exampleModalLabel">
                      Registrate
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
                  <div className="modal-body d-flex justify-content-center mt-5">
                    <Register />
                  </div>
                </div>
              </div>
            </div>
          </a>
          {token ? (
          <div className="float-left ">{account?.user_image ? 
              <img className="d-flex logoUser marcoNav mx-auto" src={`http://localhost:3003/avatars/${account.user_image}`}></img>
             : 
              <img
                className="d-flex logoUser marcoNav mx-auto"
                src="https://img.icons8.com/pastel-glyph/2x/user-male.png"
              ></img>
            }</div>
            ) : (
              ""
            )}
          {token ? (           
            <div className="nav-item dropdown dropleft ml-3">             
              <a
                className="nav-link dropdown-toggle btn btn-outline-dark"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                
                {account?.username}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" onClick={this.vistaProfile} href="">
                  Perfil
                </a>
                <a className="dropdown-item" onClick={this.vistaInsertBand} href="">
                  Añadir banda
                </a>
                <a className="dropdown-item" href="#">
                  Reviews
                </a>

                <a className="dropdown-item" href="#">
                  Lists
                </a>
                <div className="dropdown-divider"></div>
                <div className="">
                  <a
                    type="button"
                    className="dropdown-item btn"
                    onClick={this.logout}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

const mapDispatchToProps = {
  logout: LogoutAction,
  setAccount: SetAccountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
