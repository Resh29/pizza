import firebase from 'firebase';

export const updateUserInfo = () => {
  const db = firebase.database();
  return async (path, info) => {
    const history = info.history || {};
    await db.ref(`/users/${path}`).set({ ...info, history });
  };
};
