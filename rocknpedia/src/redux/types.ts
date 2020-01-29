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


export type TAction =
  | ISetAccountAction
  | ILogoutAction
  | IBandsAction
  | IBandAction