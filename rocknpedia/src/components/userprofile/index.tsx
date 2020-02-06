import React from "react";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { IAccount } from "../../interfaces/IAccount";
import { myFetch, generateAccountFromToken } from "../../utils";
import { SetAccountAction } from "../../redux/actions";
import  jwt from "jsonwebtoken";
import "./style.css";

interface IGlobalStateProps {
  account: IAccount | any;
  
}

interface IGlobalActionProps {
  uploadAvatar(id: number): void;
  setAccount(account: any): void;
  history: any;
}
type TProps = IGlobalStateProps & IGlobalActionProps;

interface IState {
  username: string;
  user_image: string;
  rol: string;
  error: string;
  is_admin: number;
  bandsLikes: []
}

class UserProfile extends React.PureComponent<TProps, IState> {
  componentDidMount() {
    const { setAccount } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      setAccount(generateAccountFromToken(token));
    }
    this.getUser();
    const { user_id } = this.props.account;
    myFetch ({
      path: `/bands/user_likes/${user_id}`,
      token
    }).then(json => {
      if (json) {
        const bandsLikes = json
        console.log(bandsLikes)
        this.setState(bandsLikes)}
    });
  }

  inputFileRef: React.RefObject<HTMLInputElement>;
  constructor(props: TProps) {
    super(props);
    this.inputFileRef = React.createRef();
    this.onUsernameChange = this.onUsernameChange.bind(this);

    this.onRolChange = this.onRolChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      username: this.props.account?.username,
      user_image: this.props.account?.user_image,
      rol: this.props.account?.rol,
      is_admin: 0,
      error: "",
      bandsLikes: []
    };
  }
  onUsernameChange(event: any) {
    const username = event.target.value;
    this.setState({ username, error: "" });
  }

  // onPasswordChange(event: any) {
  //   const password = event.target.value;
  //   this.setState({ password, error: "" });
  // }

  onRolChange(event: any) {
    const rol = event.target.selectedOptions[0].value;
    console.log(event.target.selectedOptions[0].value);
    this.setState({ rol, error: "  " });
  }
  getUser() {
    const token = localStorage.getItem("token");
    const { user_id } = this.props.account;
    myFetch({
      path: `/users/${user_id}`,
      token
    }).then(json => {
      if (json) {
        console.log(json);
        // const { username, rol, user_image } = json;
        this.props.setAccount(json);
      }
    });
  }



  updateUser() {
    const { username, rol, is_admin } = this.state;
    if (this.inputFileRef.current?.files) {
      const { user_id } = this.props.account;
      const formData = new FormData();
      const token = localStorage.getItem("token");
      const avatar = this.inputFileRef.current.files[0];   
      formData.append("user_image", avatar);
      formData.append("username", username);
      formData.append("rol", rol);

      myFetch({
        path: `/users/${user_id}`,
        method: "POST",
        // json: { username, rol, is_admin, user_image },
        token,
        formData
      }).then(json => {
        if (json) {
          console.log(json);
          

           console.log(token);
          // const { username, rol, user_image } = token;         
          const { username, rol, user_image, user_id } = generateAccountFromToken(json.token);
          this.props.setAccount({username, rol, user_image, user_id });
          localStorage.setItem("token", json.token);
          this.props.history.push("/")
        }
      });
      // this.inputFileRef.current.value = "";
    }
  }

  // uploadAvatar() {
  //   if (this.inputFileRef.current?.files) {
  //     let token = localStorage.getItem("token");
  //     const avatar = this.inputFileRef.current.files[0];
  //     const formData = new FormData();
  //     formData.append("avatar", avatar);
  //     fetch("http://localhost:3003/users/avatar", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: formData
  //     });
  //   }
  // }

  render() {
    const { account } = this.props;
    const bandsLikes = this.state;
    console.log(bandsLikes)
    const { username, rol, user_image } = this.state;
    
    return (
      <>
        <div className="separationDiv"></div>
        <div className="container backform d-flex justify-content-center mt-5">
          <div className="col-10 mt-3">
            {user_image ? (
              <img className="d-flex logoUser mx-auto" src={`http://localhost:3003/avatars/${user_image}`}></img>
            ) : (
              <img
                className="d-flex logoUser mx-auto"
                src="https://img.icons8.com/pastel-glyph/2x/user-male.png"
              ></img>
            )}

            <label className="label mt-4">
              <strong>Nombre de Usuario</strong>
            </label>
            <div className="control">
              <input
                className="form-control"
                style={{ backgroundColor: "transparent" }}
                type="text"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>
            <div className="field">
              <label className="label">
                <strong>Actualiza tu Rol!</strong>
              </label>
              <div className="control">
                <div className="select">
                  <select
                    style={{ backgroundColor: "transparent" }}
                    className="custom-select"
                    onChange={this.onRolChange}
                    defaultValue={rol}
                  >
                    <option value="usuario">Usuario</option>
                    <option value="guitarra">Guitarra</option>
                    <option value="bateria">Bateria</option>
                    <option value="bajista">Bajista</option>
                    <option value="teclista">Teclista</option>
                    <option value="vocal">Vocal</option>
                    <option value="banda">Banda</option>
                  </select>
                  <label className="mt-3">
                    Clica aquí para actualizar tu avatar!
                  </label>

                  <input
                    type="file"
                    className="custom-file-input"
                    ref={this.inputFileRef}
                  />
                </div>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="btn btn-outline-dark"
                  // disabled={username.length === 1}
                  onClick={() => {
                    this.updateUser();
                    // this.uploadAvatar();
                  }}
                  data-dismiss="modal"
                >
                  Actualizar
                </button>
                {this.state.error}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="accordion" id="accordionExample">
            <div className="card collapseColor">
              <div
                className="card-header d-flex justify-content-center"
                id="headingOne"
              >
                <h2 className="mb-0">
                  <button
                    className="btn btn-outline-dark mr-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <h2>Reviews</h2>
                  </button>
                  <button
                    className="btn btn-outline-dark ml-5 mr-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  >
                    <h2>Amigos</h2>
                  </button>
                  <button
                    className="btn btn-outline-dark ml-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="true"
                    aria-controls="collapseThree"
                  >
                    <h2>Mis Grupos Favoritos</h2>
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  Aqui mostrará las Reviews de este usuario
                </div>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">Lista de amigos</div>
                <p>Hola qué tal</p>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">Lista de grupos favoritos</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 separationDiv"></div>
      </>
    );
  }
}
const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

const mapDispatchToProps = {
  setAccount: SetAccountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
