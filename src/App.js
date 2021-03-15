import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <HomePage />
      <AppFooter />
    </div>
  );
}

export default App;
