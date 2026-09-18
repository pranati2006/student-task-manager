import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { TaskDetails } from './pages/TaskDetails';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import './styles/global.css';

const Layout = ({ children }) => (
    <div className="app-container">
        <Navbar />
        <div className="main-layout">
            <Sidebar />
            <main className="content-area">{children}</main>
        </div>
    </div>
);

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                        <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
                        <Route path="/tasks/:id" element={<Layout><TaskDetails /></Layout>} />
                        <Route path="/profile" element={<Layout><Profile /></Layout>} />
                    </Route>

                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}