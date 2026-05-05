import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesListPage from './pages/courses/CoursesListPage';
import CourseFormPage from './pages/courses/CourseFormPage';
import StudentsListPage from './pages/students/StudentsListPage';
import StudentFormPage from './pages/students/StudentFormPage';
import EnrollmentsListPage from './pages/enrollments/EnrollmentsListPage';
import EnrollmentCreatePage from './pages/enrollments/EnrollmentCreatePage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/courses" element={<ProtectedRoute><CoursesListPage /></ProtectedRoute>} />
          <Route path="/courses/new" element={<ProtectedRoute><CourseFormPage /></ProtectedRoute>} />
          <Route path="/courses/:id/edit" element={<ProtectedRoute><CourseFormPage /></ProtectedRoute>} />

          <Route path="/students" element={<ProtectedRoute><StudentsListPage /></ProtectedRoute>} />
          <Route path="/students/new" element={<ProtectedRoute><StudentFormPage /></ProtectedRoute>} />
          <Route path="/students/:id/edit" element={<ProtectedRoute><StudentFormPage /></ProtectedRoute>} />

          <Route path="/enrollments" element={<ProtectedRoute><EnrollmentsListPage /></ProtectedRoute>} />
          <Route path="/enrollments/new" element={<ProtectedRoute><EnrollmentCreatePage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
