import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { SetAccountAction } from "./redux/actions";
import { IStore } from "./interfaces/IStore";
import { IAccount } from "./interfaces/IAccount";
import { generateAccountFromToken } from "./utils";
import Navbar from "./components/navbar";
import Bands from "./components/bands/";
import BandDetails from "./components/bands/bandDetails/";
import EditBand from "./components//bands/editBand"
import InsertBand from "./components/bands/insertBand/";
import { IBand } from "./interfaces/IBand";
import userProfile from "./components/userprofile/index"
import usersList from "./components/usersList";
import AlbumReviews from './components/albumes/albumReviews/'
import SearchedBand from './components/bands/searchedBand'
import Logout from './components/logout/'




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
    return <>
      <BrowserRouter>
        <Route path='/' component={Navbar} />
        <Route path='/insertBand' exact component={InsertBand} />
        <Route path='/' exact component={Bands} />
        <Route path='/bands/:id' exact component={BandDetails} />
        <Route path='/bands/update/:id' exact component={EditBand} />
        <Route path='/userProfile' exact component={userProfile} />
        <Route path='/users' exact component={usersList} />
        <Route path='/reviews/:id/' exact component={AlbumReviews} />
        <Route path='/searchByNames/' exact component={SearchedBand} />
        <Route path='/logout' exact component={Logout} />
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
