import { IUser } from './IUsers';
import { IAccount } from './IAccount';
import { IBand } from './IBand'


export interface IStore {
  band: IBand
  account: IAccount;
  bands: IBand[]
  users: IUser[]
}
