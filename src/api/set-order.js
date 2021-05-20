import firebase from 'firebase';

export const setOrder = () => {
  const db = firebase.database();

  return async (order, user) => {
    try {
      if (user) {
        await db.ref(`/orders/${order.id}`).set({ order, user: user.uid });
        await db
          .ref(`/users/${user.uid}/history/${order.id}`)
          .set({ order: order.order, date: Date.now(), status: 'awaiting' });
      } else {
        await db.ref(`/orders/${order.id}`).set(order);
      }
    } catch (error) {
      throw error;
    }
  };
};
