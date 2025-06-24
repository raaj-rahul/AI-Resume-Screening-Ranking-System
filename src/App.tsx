import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import ClassManagement from './components/admin/ClassManagement';
import StudentList from './components/admin/StudentList';
import StudentAnalytics from './components/admin/StudentAnalytics';
import CreateQuiz from './components/admin/CreateQuiz';
import TakeQuiz from './components/student/TakeQuiz';
import ReviewAnalytics from './components/student/ReviewAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout userRole="admin" />}>
          <Route path="classes" element={<ClassManagement />} />
          <Route path="students/:classId" element={<StudentList />} />
          <Route path="analytics/:studentId" element={<StudentAnalytics />} />
          <Route path="create-quiz" element={<CreateQuiz />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<Layout userRole="student" />}>
          <Route path="quiz" element={<TakeQuiz />} />
          <Route path="analytics" element={<ReviewAnalytics />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;