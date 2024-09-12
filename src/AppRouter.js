import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import WorkoutProgramsPage from './pages/WorkoutProgramsPage';
import ProgressPage from './pages/ProgressPage';
import LoginPage from './pages/LoginPage';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/clients" component={ClientsPage} />
        <Route path="/workout-programs/:clientId" component={WorkoutProgramsPage} />
        <Route path="/progress/:clientId" component={ProgressPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
