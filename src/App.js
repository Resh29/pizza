import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { getData } from './api/get-data';

import { useRoutes } from './routes';
import { useEffect } from 'react';

function App() {
  const routes = useRoutes();
  const fetchData = getData();

  useEffect(() => {
    async function getSome() {
      console.log(await fetchData());
    }
    getSome();
  });
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
