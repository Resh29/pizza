import firebase from 'firebase';
import { useHistory } from 'react-router';
import { useMessage } from '../helpers/message';

export const useAuth = () => {
  const auth = firebase.auth();
  const db = firebase.database();
  const message = useMessage();
  const history = useHistory();

  return async (inCase, user) => {
    switch (inCase) {
      case 'login':
        try {
          await auth.signInWithEmailAndPassword(user.email, user.password).then((res) => {
            if (res) {
              message({ text: 'Login successful!', type: 'success' });
              history.push('/');
            }
          });
        } catch (error) {
          message({ text: error.message, type: 'error' });
        }

        break;
      case 'registration':
        try {
          await auth
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((res) =>
              db.ref(`users/${res.user.uid}`).set({ ...user, uid: res.user.uid })
            );
          await auth
            .signInWithEmailAndPassword(user.email, user.password)
            .then(() =>
              message({
                text: `Creating new account succes! Welcome, ${user.name}!`,
                type: 'success',
              })
            )
            .then(() => history.push('/'));
        } catch (error) {
          message({ text: error.message, type: 'error' });
        }

        break;
      case 'logout':
        auth.signOut();
        message({ text: 'Logout successful! See ya later!', type: 'info' });
        break;
      default:
        console.error('incorrect params');
    }
  };
};
