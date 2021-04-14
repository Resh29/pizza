import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { getData } from './api/get-data';

import { useRoutes } from './routes';

function App() {
  const routes = useRoutes();
  return (
    <div className="App">
      <Router>
        <AppHeader />

        <div>{routes}</div>

        <AppFooter />
      </Router>
    </div>
  );
}

export default App;
