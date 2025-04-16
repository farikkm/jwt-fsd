import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from '@/features/auth/ui/LoginForm'
import { useAuth } from '@/features/auth/model/store'

const ProfilePage = () => {
  const user = useAuth((s) => s.user)
  return (
    <div className="p-4">
      <h1>Welcome, {user?.email || 'Guest'}!</h1>
    </div>
  )
}

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>
)