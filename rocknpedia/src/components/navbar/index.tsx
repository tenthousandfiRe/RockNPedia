import React from "react";
import Login from "../login/index";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { LogoutAction } from "../../redux/actions";
import { IAccount } from "../../interfaces/IAccount";
import Register from "../register/index";

interface IGlobalStateProps {
  account: IAccount | null;
}

interface IGlobalActionProps {
  logout(): void;
}

interface IState {
  isLogged: boolean;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class Navbar extends React.PureComponent<TProps, IState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      isLogged: false
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { logout } = this.props;
    localStorage.removeItem("token");
    logout();
  }
  render() {
    const { account } = this.props;
    const { isLogged } = this.state;
    const token = localStorage.getItem("token");
    console.log(token);

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item">
              {!account ? (<button
                type="button"
                className="btn btn-primary mr-3"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                {" "}
                Log In
              </button>) : ""}
              

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
                  <div className="modal-content">
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
                    <div className="modal-body d-flex justify-content-center mt-5">
                      <Login />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              {!account ? (<button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal2"
              >
                {" "}
                Register
              </button>):""}
              

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
                  <div className="modal-content">
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
            </li>
          </ul>
          <div className="navbar-item">{account?.username}</div>
          
          {token ? (
            <div className="buttons">
              <button
                type="button"
                className="btn btn-primary ml-2"
                onClick={this.logout}
              >
                Logout
              </button>
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
            className="btn btn-outline-success my-2 my-sm-0"
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
