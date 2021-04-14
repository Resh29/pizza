import firebase from 'firebase';

export const updateProduct = () => {
  const db = firebase.database();
  return async (path, data) => {
    try {
      await db.ref(path).set(data);
    } catch (error) {
      console.error(error);
    }
  };
};
