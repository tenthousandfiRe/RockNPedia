import React from "react";
import Login from "../login/index";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { LogoutAction } from "../../redux/actions";
import { IAccount } from "../../interfaces/IAccount";
import Register from "../register/index";
import "./style.css"
interface IGlobalStateProps {
  account: IAccount | null;
  
}


interface IGlobalActionProps {
  logout(): void;
  history: any;
}


interface IState {
  isLogged: boolean;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class Navbar extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      isLogged: false,
      
    };

    this.logout = this.logout.bind(this);
    this.vistaProfile = this.vistaProfile.bind(this);
    this.vistaInsertBand = this.vistaInsertBand.bind(this);
  }

  logout() {
    const { logout } = this.props;
    localStorage.removeItem("token");
    logout();
    this.props.history.push('/');
  }
  vistaProfile() {
    this.props.history.push("/userProfile")
  }

  vistaInsertBand() {
    this.props.history.push("/insertBand")
  }

  render() {
    const { account } = this.props;
    const { isLogged } = this.state;
    const token = localStorage.getItem("token");
    console.log(token);

    return (
      <nav className="navbar navbar-expand-lg navbar-light navie">
        <a className="navbar-brand" href="#">
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
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>

            
            
          </ul>
          <a className="nav-item">
              {/* ternary to show the button to login */}
              {!account ? (
                <button
                  type="button"
                  className="btn btn-outline-info boton my-2 my-sm-0"
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
                      <h5
                        className="modal-title offset-5"
                        id="exampleModalLabel"
                      >
                        Loguéate
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
                  className="btn btn-outline-info my-2 boton my-sm-0 ml-3"
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
                      <h5
                        className="modal-title offset-5"
                        id="exampleModalLabel"
                      >
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
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                {account?.username}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" onClick={this.vistaProfile}>
                  Perfil
                </a>
                <a className="dropdown-item" onClick={this.vistaInsertBand}>
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

          <div className="col-2">
            <input
              className="form-control mr-sm-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          <button
            className="btn btn-outline-info  boton my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

const mapDispatchToProps = {
  logout: LogoutAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
