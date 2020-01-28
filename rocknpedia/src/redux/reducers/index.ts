import { combineReducers } from "redux";
import { IStore } from "../../interfaces/IStore";
import account from "./accountReducer";
import bands from './bandsReducer'


export default combineReducers<IStore>({
  account,
  bands
});
