import firebase from 'firebase';

export const setFileAndData = () => {
  const dsr = firebase.storage();
  const db = firebase.database();

  return async (data) => {
    const ref = dsr.ref().child(`images/${data.fileName}`);
    await ref.put(data.file).then((m) => console.log('Uploading complete!'));
    const imageRef = await dsr.ref(`images/${data.fileName}`).getDownloadURL();
    const currentData = {
      ...data,
      image: imageRef,
    };
    await db
      .ref(`products/${data._id}`)
      .set(currentData)
      .then((m) => console.log('Data successfull saved'));

    try {
    } catch (error) {
      console.error(error);
    }
  };
};
