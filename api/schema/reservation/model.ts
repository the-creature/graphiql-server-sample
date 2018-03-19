import BaseModel from '../../base-model';
import QueryContext from '../../query-context';
import { ReservationInput } from '../../../gen/schema-type-def';

export class Reservations extends BaseModel {
  constructor(db: any, public context: QueryContext) {
    super(db, 'reservations');
  }

  save(reservation: ReservationInput) {
    if (reservation.id) {
      return this.db('reservations')
        .update(reservation)
        .where('id', reservation.id)
        .returning('id');
    }

    return this.db('reservations').insert(reservation).returning('id');
  }
}
