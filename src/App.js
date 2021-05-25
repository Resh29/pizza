import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { Toast } from './components/Toast';
import { AuthState } from './api/auth-state';
import { useEffect } from 'react';

function App() {
  const routes = useRoutes();

  const auth = AuthState();
  useEffect(() => {
    auth();
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
