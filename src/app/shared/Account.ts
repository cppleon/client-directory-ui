import { Client } from './Client';

export class Account {
  _id: string;
  type: 1 | 2 | 3;
  currency: 'GEL' | 'USD' | 'EUR' | 'RUB';
  status: 0 | 1;
  client: Client;

  constructor(init?: Partial<Account>) {
    Object.assign(this, init);
  }
}
