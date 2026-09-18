import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes
} from 'react-router-dom';
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

const AppLayout = () => (
    <div className="app-container">
        <Navbar />

        <div className="main-layout">
            <Sidebar />

            <main className="content-area">
                <Outlet />
            </main>
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
                        <Route element={<AppLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/tasks/:id" element={<TaskDetails />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                    </Route>

                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
