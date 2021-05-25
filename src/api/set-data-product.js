import firebase from 'firebase';

export const setFileAndData = () => {
  const dsr = firebase.storage();
  const db = firebase.database();

  return async (data) => {
    const _ = Math.floor(Math.random() * 50);
    const ref = dsr.ref().child(`images/${_}${data.fileName}`);
    await ref.put(data.file).then((m) => console.log('Uploading complete!'));
    const imageRef = await dsr.ref(`images/${_}${data.fileName}`).getDownloadURL();
    const currentData = {
      ...data,
      image: imageRef,
    };
    await db
      .ref(`products/${data.category}/${data._id}`)
      .set(currentData)
      .then((m) => console.log('Data successfull saved'));

    try {
    } catch (error) {
      console.error(error);
    }
  };
};
