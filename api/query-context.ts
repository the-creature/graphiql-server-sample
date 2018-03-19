import { Reservations } from './schema/reservation/model';
import * as KnexObj from 'knex';

export default class QueryContext {
  public reservations: Reservations;

  constructor(db: KnexObj) {
    this.reservations = new Reservations(db, this);
  }
}
