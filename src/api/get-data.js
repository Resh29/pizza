import firebase from 'firebase';

export const getData = () => {
  const db = firebase.database();
  return async (path) => {
    try {
      const result = (await db.ref(path).once('value')).val();
      if (result) {
        const data = Object.keys(result).map((key) => {
          return { ...result[key] };
        });
        console.log(data);
        return data;
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
};
