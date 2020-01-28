import React from "react";
import { myFetch } from "../../utils";

interface IProps {}

interface IState {
  username: string;
  password: string;
  user_image: string;
  rol: string;
  error: string;
  is_admin: number;
}

class Register extends React.PureComponent<IProps, IState> {
    inputFileRef: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.inputFileRef = React.createRef();
   
    this.state = {
      username: "",
      password: "",
      user_image: "",
      rol: "",
      is_admin: 0,
      error: ""
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    //this.onImageChange = this.onImageChange.bind(this);
    this.onRolChange = this.onRolChange.bind(this);
    this.register = this.register.bind(this);
    // this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  onUsernameChange(event: any) {
    const username = event.target.value;
    this.setState({ username, error: "" });
  }

  onPasswordChange(event: any) {
    const password = event.target.value;
    this.setState({ password, error: "" });
  }

  onRolChange(event: any) {
    const rol = event.target.selectedOptions[0].value;
    console.log(event.target.selectedOptions[0].value);
    this.setState({ rol, error: "" });
  }
  onImageChange(event: any) {
    const user_image = event.target.value;
    this.setState({ user_image, error: "" });
  }

//   uploadAvatar() {
//     if (this.inputFileRef.current?.files) {
//       let token = localStorage.getItem("token");
//       const avatar = this.inputFileRef.current.files[0];
//       const formData = new FormData();
//       const {users} = this.props
//       formData.append("avatar", avatar);
//       myFetch({
//           path: "/users",
//         method: "POST",
//         body: formData
//       });
//     }
//   }
  register() {
    const { username, password, user_image, rol, is_admin } = this.state;
    myFetch({
      path: "/users",
      method: "POST",
      json: { username, password, user_image, rol, is_admin }
    }).then(json => {
      if (!json) {
        this.setState({ error: "Usuario ya registrado" });
      }
    });
  }

  render() {
    const { username, password, user_image } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                value={password}
                onChange={this.onPasswordChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Rol</label>
            <div className="control">
              <div className="select">
                <select onChange={this.onRolChange}>
                  <option value="usuario">Usuario</option>
                  <option value="guitarra">Guitarra</option>
                  <option value="bateria">Bateria</option>
                  <option value="bajista">Bajista</option>
                  <option value="teclista">Teclista</option>
                  <option value="vocal">Vocal</option>
                  <option value="banda">Banda</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Imagen</label>
            <div className="control">
              <input
                className="input"
                type="file"
                ref={this.inputFileRef}
                value={user_image}
                onChange={this.onImageChange}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                disabled={username.length === 0 || password.length === 0}
                onClick={this.register}
              >
                Register
              </button>
              {this.state.error}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
