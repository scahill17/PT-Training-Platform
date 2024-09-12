import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import WorkoutProgramsPage from './pages/WorkoutProgramsPage';
import ProgressPage from './pages/ProgressPage';
import LoginPage from './pages/LoginPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/workout-programs/:clientId" element={<WorkoutProgramsPage />} />
        <Route path="/progress/:clientId" element={<ProgressPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
