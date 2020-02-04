import { IUser } from './../interfaces/IUsers';
import { IAccount } from './../interfaces/IAccount';
import { IBand, IBands } from './../interfaces/IBand'


interface ISetAccountAction {
  type: "SET_ACCOUNT";
  payload: IAccount;
}

interface ILogoutAction {
  type: "LOGOUT";
}

interface IBandsAction {
  type: "SET_BANDS";
  payload: IBand[];
}

interface IBandAction {
  type: "SET_BAND";
  payload: IBand;
}
interface ISetUsersAction {
  type: "SET_USERS";
  payload: IUser[];
}


export type TAction =
  | ISetAccountAction
  | ILogoutAction
  | IBandsAction
  | IBandAction
  | ISetUsersAction