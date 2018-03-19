import QueryContext from '../../query-context';

const resolvers = {
  Query: {
    reservations(root: any, { sort }: any, context: QueryContext) {
      return context.reservations.getAll(sort);
    },
    reservation(root: any, { id }: any, context: QueryContext) {
      return context.reservations.getById(id);
    },
  },
  Mutation: {
    reservationSave(root: any, { reservation }: any, context: QueryContext) {
      return context.reservations
        .save(reservation)
        .then(([id]: any) => context.reservations.getById(id));
        // .then(() => context.reservations.getById(reservation.id));
    },
    reservationRemove(root: any, { id }: any, context: QueryContext) {
      return context.reservations
        .getById(id)
        .then((reservation: any) =>
          context.reservations.remove(id).then(() => reservation)
        );

      // return context.reservations.remove(id).then(() => id);
    },
  },
};

export default resolvers;
