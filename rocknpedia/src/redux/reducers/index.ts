import { combineReducers } from "redux";
import { IStore } from "../../interfaces/IStore";
import account from "./accountReducer";
import bands from './bandsReducer';
import band from './bandReducer';
import users from './usersReducers';



export default combineReducers<IStore>({
  account,
  bands,
  band,
  users
});
