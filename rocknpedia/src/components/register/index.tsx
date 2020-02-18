import React from "react";
import { myFetch } from "../../utils";
import "./style.css";

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
  constructor(props: IProps) {
    super(props);

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
    this.onRolChange = this.onRolChange.bind(this);
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
    const rol = event.target.selectedOptions[0].value;
    this.setState({ rol, error: "" });
  }


  register() {
    const { username, password, rol, is_admin } = this.state;
    myFetch({
      path: "/users",
      method: "POST",
      json: { username, password, rol, is_admin }
    }).then(json => {
      if (!json) {
        this.setState({ error: "Usuario ya registrado" });
      }
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="">
        <div className="card-content">
          <div className="form">
            <label className="label"><strong>Username</strong></label>
            <div className="control">
              <input
                className="form-control"
                type="text"
                value={username}
                onChange={this.onUsernameChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label"><strong>Password</strong></label>
            <div className="control">
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={this.onPasswordChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label"><strong>Rol</strong></label>
            <div className="control">
              <div className="select">
                <select className="custom-select" onChange={this.onRolChange}>
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
          <div className="field is-grouped">
            <div className="control">
              <button
                className="btn btn-outline-light mt-3"
                disabled={username.length === 0 || password.length === 0}
                onClick={this.register}
                data-dismiss="modal"
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
