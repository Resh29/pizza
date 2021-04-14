import firebase from 'firebase';

const getSingle = () => {
  const db = firebase.database();
  return async (path) => {
    try {
      const result = (await db.ref(path).once('value')).val();
      return result;
    } catch (error) {
      console.error(error);
    }
  };
};

export { getSingle };
