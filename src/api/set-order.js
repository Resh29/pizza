import firebase from 'firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useMessage } from '../helpers/message';

export const setOrder = () => {
  const [user] = useContext(AuthContext);
  const db = firebase.database();
  const message = useMessage();
  return async (order) => {
    try {
      if (user) {
        await db.ref('/orders').set(order);
        await db.ref(`/users/${user.uid}/history/${order.id}`).set(order.order);
      } else {
        await db.ref('/orders').set(order);
      }
    } catch (error) {
      message({ text: 'Something gonna wrong!', type: 'error' });
    }
  };
};
