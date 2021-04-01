import firebase from 'firebase';

export const removeData = () => {
  const db = firebase.database();
  return async (path) => {
    try {
      await db.ref(path).remove();
      console.log('removed');
    } catch (error) {
      console.error(error);
    }
  };
};
