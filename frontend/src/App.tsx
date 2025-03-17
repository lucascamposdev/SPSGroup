import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "@/components/layouts/AuthLayout";
import AppLayout from "@/components/layouts/AppLayout";

// Pages
import Users from "@/components/pages/users";
import Login from "@/components/pages/login";

// Context
import { AuthProvider } from "./context/useAuth";
import { UserProvider } from "./context/useUsers";
import { ModalProvider } from "./context/modalContext";

function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <ModalProvider>
          <Router>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
              </Route>

              <Route element={<AppLayout />}>
                <Route path="/" element={<Users />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ModalProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
