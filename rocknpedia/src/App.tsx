import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { SetAccountAction } from "./redux/actions";
import { IStore } from "./interfaces/IStore";
import { IAccount } from "./interfaces/IAccount";
import { generateAccountFromToken } from "./utils";
import Reviews from './components/reviews'
import Login from './components/login/index'
import Register from "./components/register";
import Navbar from "./components/navbar";
import Bands from "./components/bands/";
import BandDetails from "./components/bands/bandDetails/";
import EditBand from "./components//bands/editBand"
import InsertBand from "./components/bands/insertBand/";
import { IBand } from "./interfaces/IBand";
import userProfile from "./components/userprofile/index"
import AlbumReviews from './components/albumes/albumReviews/'


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
     {/* <Route path='/' exact component={Reviews} /> */}
     <Route path='/insertBand' exact component={InsertBand} />
     <Route path='/' exact component={Bands} />
     <Route path='/bands/:id' exact component={BandDetails} />
     <Route path='/bands/update/:id' exact component={EditBand} />
    <Route path='/userProfile' exact component={userProfile} />
    <Route path='/reviews/:id/' exact component={AlbumReviews} />

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
