import React from "react";
import { connect } from "react-redux";
import { IStore } from "../../interfaces/IStore";
import { IAccount } from "../../interfaces/IAccount";
import { myFetch, generateAccountFromToken } from "../../utils";
import { SetAccountAction } from "../../redux/actions";

interface IGlobalStateProps {
  account: IAccount | any;
}

interface IGlobalActionProps {
  uploadAvatar(id: number): void;
  setAccount(account: IAccount): void;
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
  inputFileRef: React.RefObject<HTMLInputElement>;
  constructor(props: TProps) {
    super(props);
    this.inputFileRef = React.createRef();
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onAvatarChange = this.onAvatarChange.bind(this);
    this.onRolChange = this.onRolChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.state = {
      username: "",
      user_image: "",
      rol: "",
      is_admin: 0,
      error: ""
    };
  }
  onUsernameChange(event: any) {
    const username = event.target.value;
    this.setState({ username, error: "" });
  }

  onAvatarChange(event: any) {
    const user_image = event.target.value;
    this.setState({ user_image, error: "" });
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
    const { setAccount } = this.props;
    const { username, rol, is_admin } = this.state;
    const { user_id } = this.props.account;
    const token = localStorage.getItem("token");
    console.log(token);
    myFetch({
      path: `/users/${user_id}`,
      method: "PUT",
      json: { username, rol, is_admin }
    }).then(json => {
      if (json) {
        const { token } = json;
        localStorage.setItem("token", token);
        setAccount(generateAccountFromToken(token));
      }
    });
  }

  uploadAvatar() {
    const { setAccount } = this.props;
    if (this.inputFileRef.current?.files) {
      let token = localStorage.getItem("token");
      const avatar = this.inputFileRef.current.files[0];
      const formData = new FormData();
      formData.append("avatar", avatar);
      fetch("http://localhost:3003/users/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }).then(json => {
        if (json) {
          console.log(json);
          //TODO
          // const {token} = json;
          // localStorage.setItem("token", token);
          // setAccount(generateAccountFromToken(token));
        }
      });
    }
  }

  render() {
    const { account } = this.props;

    const { username } = this.state;
    console.log(account);
    console.log(this.state);

    return (
      <>
        <div className="col-6">
          <div className="card-content">
            <div className="form">
              <label className="label">
                <strong>Username</strong>
              </label>
              <div className="control">
                <input
                  className="form-control"
                  type="text"
                  placeholder={account?.username}
                  onChange={this.onUsernameChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">
                <strong>Rol</strong>
              </label>
              <div className="control">
                <div className="select">
                  <select
                    className="custom-select"
                    onChange={this.onRolChange}
                    defaultValue={account?.rol}
                  >
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
                  className="btn btn-info mt-3 "
                  disabled={username.length === 0}
                  onClick={this.updateUser}
                  data-dismiss="modal"
                >
                  Actualizar
                </button>
                {this.state.error}
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <label className="mt-3">Avatar</label>
              <br />
              <div className="col-2 border">
                <input
                  type="file"
                  onChange={this.onAvatarChange}
                  className="custom-file-input"
                  ref={this.inputFileRef}
                />
              </div>
              <br />
              <button className="btn btn-primary" onClick={this.uploadAvatar}>
                Upload Avatar
              </button>
              <div className="row"></div>
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
