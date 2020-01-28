import React from "react";
import "./App.css";
import "bulma/css/bulma.min.css";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { SetAccountAction } from "./redux/actions";
import { IStore } from "./interfaces/IStore";
import { IAccount } from "./interfaces/IAccount";
import { generateAccountFromToken } from "./utils";

interface IGlobalStateProps {
  account: IAccount | null;
}

interface IGlobalActionProps {
  setAccount(account: IAccount): void;
}

type TProps = IGlobalStateProps & IGlobalActionProps;

class App extends React.PureComponent<TProps> {
  componentWillMount() {
    const { setAccount } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      setAccount(generateAccountFromToken(token));
    }
  }
  render() {
    const { account } = this.props;
    return <>
     <BrowserRouter>
     
     </BrowserRouter>
     </>;
  }
}

const mapStateToProps = ({ account }: IStore): IGlobalStateProps => ({
  account
});

const mapDispatchToProps: IGlobalActionProps = {
  setAccount: SetAccountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
