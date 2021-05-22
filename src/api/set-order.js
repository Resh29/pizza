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
        for (const product of order.order) {
          const orders =
            +(
              await db
                .ref(`/products/${product.category}/${product._id}/orders`)
                .once('value')
            ).val() || 0;
          await db
            .ref(`/products/${product.category}/${product._id}/orders`)
            .set((orders += 1));
        }
      } else {
        await db.ref(`/orders/${order.id}`).set(order);
        for (const product of order.order) {
          const orders =
            +(
              await db
                .ref(`/products/${product.category}/${product._id}/orders`)
                .once('value')
            ).val() || 0;
          await db
            .ref(`/products/${product.category}/${product._id}/orders`)
            .set((orders += 1));
        }
      }
    } catch (error) {
      throw error;
    }
  };
};
