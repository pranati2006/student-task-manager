import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

export default function App() {
  return <><Navbar /><Routes>
    <Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}><Route path="/" element={<Navigate to="/dashboard" replace />} /><Route path="/dashboard" element={<Dashboard />} /><Route path="/tasks" element={<Tasks />} /><Route path="/tasks/:id" element={<TaskDetails />} /><Route path="/profile" element={<Profile />} /></Route>
    <Route path="*" element={<NotFound />} />
  </Routes></>
}