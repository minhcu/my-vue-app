import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AppLayout } from './features/app/ui/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { BoardView } from './pages/BoardView';
import { Profile } from './pages/Profile';
import { BlankLayout } from './features/app/ui/BlankLayout';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <BrowserRouter basename="/SGroup-Frontend-Expertise-">
      <Routes>
        <Route path="/auth" element={<BlankLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="board/:boardId" element={<BoardView />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
