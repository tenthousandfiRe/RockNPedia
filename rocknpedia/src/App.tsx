import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { SetAccountAction } from "./redux/actions";
import { IStore } from "./interfaces/IStore";
import { IAccount } from "./interfaces/IAccount";
import { generateAccountFromToken } from "./utils";
import Login from './components/login/index'
import Register from "./components/register";
import Navbar from "./components/navbar";
import Bands from "./components/bands/";
import BandDetails from "./components/bands/bandDetails/";
import InsertBand from "./components/bands/insertBand/";
import { IBand } from "./interfaces/IBand";
import userProfile from "./components/userprofile/index"


interface IGlobalStateProps {
  account: IAccount | null;
  band: IBand
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
    const { band } = this.props
    const { band_id } = band
    return <>
     <BrowserRouter>
     <Route path='/' component={Navbar} />
     {/* <Route path='/' component={Login} /> */}
     {/* <Route path='/' component={Register} /> */}
     <Route path='/' exact component={Bands} />
     <Route path={`/bands/${band_id}`} exact component={BandDetails} />
     {/* <Route path='/' exact component={InsertBand} /> */}
     <Route path='/userProfile' exact component={userProfile} />
     </BrowserRouter>
     </>;
  }
}

const mapStateToProps = ({ account, band }: IStore): IGlobalStateProps => ({
  account, band
});

const mapDispatchToProps: IGlobalActionProps = {
  setAccount: SetAccountAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
