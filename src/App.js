import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';

import { useRoutes } from './routes';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { Toast } from './components/Toast';
import { useMessage } from './helpers/message';
import { MessageContext } from './context/MessageContext';

function App() {
  const routes = useRoutes();
  const [user, setUser] = useContext(AuthContext);
  const [messages, setMessages] = useContext(MessageContext);
  const message = useMessage();

  useEffect(() => {
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
  }, []);

  return (
    <div className="App">
      <Router>
        <AppHeader />
        <Toast />
        <div>{routes}</div>
        <AppFooter />
      </Router>
    </div>
  );
}

export default App;
