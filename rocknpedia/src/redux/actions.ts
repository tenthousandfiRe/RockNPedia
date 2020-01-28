import { TAction } from "./types";
import { IAccount } from "../interfaces/IAccount";

export const SetAccountAction = (account: IAccount): TAction => ({
    type: "SET_ACCOUNT",
    payload: account
  });

  export const LogoutAction = (): TAction => ({ type: "LOGOUT" });