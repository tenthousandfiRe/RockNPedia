import React from 'react'
import { connect } from "react-redux";
import { IAccount } from "../../interfaces/IAccount";
import { myFetch, generateAccountFromToken } from "../../utils";
import { SetAccountAction } from "../../redux/actions"
import "./style.css";


interface IProps {}

interface IGlobalActionProps {
    setAccount(account: IAccount): void;
}

interface IState {
    username: string;
    password: string;
    user_image: string;
    confirmation: string;
    rol: string;
    error: string;
}

type TProps = IProps & IGlobalActionProps;

class Login extends React.PureComponent<TProps, IState> {
    componentWillMount() {
        const { setAccount } = this.props;
        const token = localStorage.getItem("token");
        if (token) {
          setAccount(generateAccountFromToken(token));
        }
      }
    constructor(props: TProps) {
        super(props);

        this.state = {
            username: "",
            password: "",
            user_image: "",
            rol: "",
            confirmation: "",
            error: ""
        }

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    onUsernameChange(event: any) {
        const username = event.target.value;
        this.setState({ username, error: "" });
    }

    onPasswordChange(event: any) {
        const password = event.target.value;
        this.setState({ password, error: "" });
    }

    login() {
        const { setAccount } = this.props;
        const { username, password, user_image, rol } = this.state;
        myFetch({
          path: "/users/auth",
          method: "POST",
          json: { username, password, user_image, rol }
        }).then(json => {
          if (json) {
            const { token } = json;
            localStorage.setItem("token", token);
            setAccount(generateAccountFromToken(token));
          } else {
            this.setState({ error: "Credenciales inválidas" });
          }
        });
      }

    render() {
        const { username, password } = this.state;
        return (
            <div className="form-group">
                <div className="form-group">
                    <div className="field">
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
                    <div className="field is-grouped">
                        <div className="control">
                            <button
                                className="btn btn-outline-light mt-3 "
                                disabled={username.length === 0 || password.length === 0}
                                onClick={this.login}
                                data-dismiss="modal"
                            >
                                Login
                  </button>
                            {this.state.error}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

const mapDispatchToProps: IGlobalActionProps = {
    setAccount: SetAccountAction
};

export default connect(null, mapDispatchToProps)(Login);
