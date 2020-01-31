import React from "react";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { IAccount } from "../../interfaces/IAccount";
import { myFetch, generateAccountFromToken } from "../../utils";
import { SetAccountAction } from "../../redux/actions";
import "./style.css";

interface IGlobalStateProps {
  account: IAccount | any;
}

interface IGlobalActionProps {
  uploadAvatar(id: number): void;
  setAccount(account: any): void;
}
type TProps = IGlobalStateProps & IGlobalActionProps;

interface IState {
  username: string;
  user_image: string;
  rol: string;
  error: string;
  is_admin: number;
}

class UserProfile extends React.PureComponent<TProps, IState> {
  componentWillMount() {
    const { setAccount } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      setAccount(generateAccountFromToken(token));
    }
  }
  inputFileRef: React.RefObject<HTMLInputElement>;
  constructor(props: TProps) {
    super(props);
    this.inputFileRef = React.createRef();
    // this.uploadAvatar = this.uploadAvatar.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);

    this.onRolChange = this.onRolChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      username: this.props.account?.username,
      user_image: this.props.account?.user_image,
      rol: this.props.account?.rol,
      is_admin: 0,
      error: ""
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

  updateUser() {
    const { username, rol, is_admin } = this.state;
    if (this.inputFileRef.current?.files) {
      const { user_id } = this.props.account;
      const formData = new FormData();
      const token = localStorage.getItem("token");
      const user_image = this.inputFileRef.current.files[0];
      console.log(token);
      formData.append("user_image", user_image);
      formData.append("username", username);
      formData.append("rol", rol);

      myFetch({
        path: `/users/${user_id}`,
        method: "POST",
        json: { username, rol, is_admin },
        token,
        formData
      }).then(json => {
        if (json) {
        console.log(json);
        const { username, rol } = json;
        
          this.props.setAccount({ username, rol });
        }
      });
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

    const { username, rol } = this.state;
    return (
      <>
        <div className="container backform d-flex justify-content-center mt-5">
          <div className="col-10 mt-5">
            <label className="label">
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
                  className="btn btn-info"
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
