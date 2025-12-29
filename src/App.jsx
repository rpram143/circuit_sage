import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import ModuleViewer from './pages/ModuleViewer';
import LabSimulator from './pages/LabSimulator';
import LabTestRunner from './pages/LabTestRunner';
import MyCourses from './pages/MyCourses';
import LearnTube from './pages/LearnTube';
import Settings from './pages/Settings';
import ProfessorDashboard from './pages/ProfessorDashboard';
import ManageStudents from './pages/ManageStudents';
import AssignModules from './pages/AssignModules';
import Solution from './pages/Solution';
import Journey from './pages/Journey';
import Teachers from './pages/Teachers';

// Layouts
import PublicLayout from './components/PublicLayout';
import StudentLayout from './components/StudentLayout';
import ProfessorLayout from './components/ProfessorLayout';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
          <Route path="/solution" element={<PageWrapper><Solution /></PageWrapper>} />
          <Route path="/journey" element={<PageWrapper><Journey /></PageWrapper>} />
          <Route path="/teachers" element={<PageWrapper><Teachers /></PageWrapper>} />
        </Route>

        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />

        {/* Student Routes */}
        <Route element={<StudentLayout />}>
          <Route path="/dashboard" element={<PageWrapper><StudentDashboard /></PageWrapper>} />
          <Route path="/courses" element={<PageWrapper><MyCourses /></PageWrapper>} />
          <Route path="/learntube" element={<PageWrapper><LearnTube /></PageWrapper>} />
          <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
        </Route>

        {/* Professor Routes */}
        <Route element={<ProfessorLayout />}>
          <Route path="/professor" element={<PageWrapper><ProfessorDashboard /></PageWrapper>} />
          <Route path="/professor/students" element={<PageWrapper><ManageStudents /></PageWrapper>} />
          <Route path="/professor/assign" element={<PageWrapper><AssignModules /></PageWrapper>} />
          <Route path="/professor/settings" element={<PageWrapper><Settings role="professor" /></PageWrapper>} />
        </Route>

        {/* Specialized Views (No persistent sidebar for immersive experience) */}
        <Route path="/module/:moduleId" element={<PageWrapper><ModuleViewer /></PageWrapper>} />
        <Route path="/lab" element={<PageWrapper><LabSimulator /></PageWrapper>} />
        <Route path="/lab/test/:testId" element={<PageWrapper><LabTestRunner /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App;
