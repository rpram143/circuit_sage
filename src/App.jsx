import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import ModuleViewer from './pages/ModuleViewer';
import LabSimulator from './pages/LabSimulator';
import MyCourses from './pages/MyCourses';
import Settings from './pages/Settings';
import ProfessorDashboard from './pages/ProfessorDashboard';
import ManageStudents from './pages/ManageStudents';
import AssignModules from './pages/AssignModules';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/module/:moduleId" element={<ModuleViewer />} />
        <Route path="/courses" element={<MyCourses />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/professor/settings" element={<Settings role="professor" />} />
        <Route path="/professor" element={<ProfessorDashboard />} />
        <Route path="/professor/students" element={<ManageStudents />} />
        <Route path="/professor/assign" element={<AssignModules />} />
        <Route path="/lab" element={<LabSimulator />} />
      </Routes>
    </Router>
  )
}

export default App
