import React from "react";
import { myFetch } from "../../utils";

interface IProps {}

interface IState {
  username: string;
  password: string;
  user_image: string;
  rol: string;
  error: string;
}

class Register extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      user_image: "",
      rol: "",
      error: ""
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.register = this.register.bind(this);
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
    const rol = event.target.value;
    this.setState({ rol, error: "" });
  }

  register() {
    const { username, password, user_image, rol } = this.state;
    myFetch({
      path: "/users",
      method: "POST",
      json: { username, password, user_image, rol }
    }).then(json => {
      if (!json) {
        this.setState({ error: "Usuario ya registrado" });
      }
    });
  }

  render() {
    const { username, password, rol, user_image } = this.state;
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
                <select value={rol} onChange={this.onPasswordChange}>
                  <option>Usuario</option>
                  <option>Guitarra</option>
                  <option>Bateria</option>
                  <option>Bajista</option>
                  <option>Teclista</option>
                  <option>Vocal</option>
                  <option>Banda</option>
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
                value={user_image}
                onChange={this.onPasswordChange}
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
