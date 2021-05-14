import firebase from 'firebase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const AuthState = () => {
  const [user, setUser] = useContext(AuthContext);
  return () => {
    firebase.auth().onAuthStateChanged((user) => {
      async function getUserInfo(uid) {
        const result = (
          await firebase.database().ref(`users/${uid}`).once('value')
        ).val();
        setUser(result);
      }
      if (user) {
        getUserInfo(user.uid);
      } else {
        setUser(null);
      }
    });
  };
};
