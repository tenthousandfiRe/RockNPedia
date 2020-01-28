import { IAccount } from './IAccount';
import { IBand } from './IBand'


export interface IStore {

  account: IAccount | null;
  bands: IBand[]
}
