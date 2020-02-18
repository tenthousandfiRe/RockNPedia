import React from "react";
import Login from "../login/index";
import { myFetch } from "../../utils";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { LogoutAction, SetAccountAction, SetBandsAction } from "../../redux/actions";
import { IAccount } from "../../interfaces/IAccount";
import Register from "../register/index";
import "./style.css";
import { generateAccountFromToken } from "../../utils";
import { IBand } from "../../interfaces/IBand";

interface IGlobalStateProps {
  account: IAccount;
}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
  setBand(band: IBand): void;
  setBands(bands: IBand[]): void;
  logout(): void;
  history: any;
}

interface IState {
  isLogged: boolean;
  name: string;
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
      isLogged: false,
      name: ""
    };

    this.logout = this.logout.bind(this);
    this.vistaProfile = this.vistaProfile.bind(this);
    this.vistaInsertBand = this.vistaInsertBand.bind(this);
    this.onSearchNameChange = this.onSearchNameChange.bind(this);

  }

  onSearchNameChange(event: any) {
    const name = event.target.value;
    this.setState({ name: name });
  }


  searchBand() {
    const { name } = this.state
    myFetch({ method: "POST", path: `/bands/searchByNames/`, json: { name } }).then(
      json => {
        if (json) {
          this.props.setBands(json)
        }
      }
    ).then((this.props.history.push(`/searchByNames/`)));
  }

  logout() {
    const { logout } = this.props;
    localStorage.removeItem("token");
    logout();
    this.props.history.push("/logout");
  }

  vistaProfile() {
    this.props.history.push("/userProfile");
  }

  vistaInsertBand() {
    this.props.history.push("/insertBand");
  }
  vistaUserList() {
    this.props.history.push("/users");
  }

  render() {
    const { account } = this.props;
    const { name } = this.state;
    const token = localStorage.getItem("token");
    return (
      <nav className="navbar navbar-light navbar-expand-lg navie container-fluid">
        
        <a className="navbar-brand" href="/" ><img className="logo ml-2 logoresponsive" style={{cursor: "pointer"}} src="https://i.imgur.com/0MATbvy.png" />
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
         <span className="btn btn-light bg-light navbar-toggler-icon" style={{color:"white !important"}}></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex justify-content-end" style={{width: "100%"}}>
            
        <input className="form-control nav-item offset-3 mr-sm-2 col-2 searchBar" type="text" value={name} onChange={this.onSearchNameChange} aria-label="Search">
        </input>
        <a className="btn btn-outline-light nav-link botonSearch" style={{color: "white"}} onClick={() => this.searchBand()}>Buscar</a>
          <ul className="navbar-nav mr-auto"></ul>
          <a className="nav-item d-flex justify-content-end">
            {/* ternary to show the button to login */}
            {!token ? (
              <button
                type="button"
                className="btn btn-outline-light my-2 my-sm-0 ml-3 d-flex justify-content-end botonSearch"
                data-toggle="modal"
                data-target="#exampleModal"
                
              >
                {""}
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
                  <div className="modal-body d-flex justify-content-center mt-5 zeta">
                    <Login />
                  </div>
                </div>
              </div>
            </div>
          </a>
          <a className="nav-item">
            {/* ternary to show or not the button register */}
            {!token ? (
              <button
                type="button"
                className="btn btn-outline-light my-2 my-sm-0 ml-3 d-flex justify-content-end botonSearch"
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
            <div className="float-left d-flex justify-content-end">
              {account?.user_image ? (
                <img
                  className="d-flex logoUser marcoNav mx-auto"
                  src={`http://localhost:3003/avatars/${account.user_image}`}
                ></img>
              ) : (
                  <img
                    className="d-flex logoUser marcoNav mx-auto"
                    src="https://img.icons8.com/pastel-glyph/2x/user-male.png"
                  ></img>
                )}
            </div>
          ) : (
              ""
            )}
          {token ? (
            <div className="nav-item dropdown dropleft ml-3">
              <a
                className="nav-link dropdown-toggle btn btn-outline-light mt-2"
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
                <a
                  className="dropdown-item"
                  onClick={this.vistaProfile}
                  href=""
                >
                  Perfil
                </a>
                <a
                  className="dropdown-item"
                  onClick={this.vistaInsertBand}
                  href=""
                >
                  Añadir banda
                </a>
                <a className="dropdown-item" href="/users">
                  Usuarios
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
  setAccount: SetAccountAction,
  setBands: SetBandsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
