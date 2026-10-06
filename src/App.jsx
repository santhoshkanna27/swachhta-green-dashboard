import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Standards from "./pages/Standards";
import Inspections from "./pages/Inspections";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Supervisor from "./pages/Supervisor";
import Faculty from "./pages/Faculty";
import Student from "./pages/Student";

import { InspectionProvider } from "./context/InspectionContext";
import { ComplaintProvider } from "./context/ComplaintContext";
import { AuthProvider, useAuth } from "./context/AuthContext";


function ProtectedLayout() {

  const { user } = useAuth();

  // If user is not logged in,
  // send them to Login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return (
    <>
      {/* Admin gets the Admin sidebar only */}
      {user.role === "admin" && <Sidebar />}


      <Routes>

        {/* =================================================
            ADMIN ROUTES
            ================================================= */}

        <Route
          path="/"
          element={
            user.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to={`/${user.role}`} replace />
            )
          }
        />

        <Route
          path="/standards"
          element={
            user.role === "admin" ? (
              <Standards />
            ) : (
              <Navigate to={`/${user.role}`} replace />
            )
          }
        />

        <Route
          path="/inspections"
          element={
            user.role === "admin" ? (
              <Inspections />
            ) : (
              <Navigate to={`/${user.role}`} replace />
            )
          }
        />

        <Route
          path="/compliance"
          element={
            user.role === "admin" ? (
              <Compliance />
            ) : (
              <Navigate to={`/${user.role}`} replace />
            )
          }
        />

        <Route
          path="/reports"
          element={
            user.role === "admin" ? (
              <Reports />
            ) : (
              <Navigate to={`/${user.role}`} replace />
            )
          }
        />

        <Route
          path="/settings"
          element={
            user.role === "admin" ? (
              <Settings />
            ) : (
              <Navigate to={`/${user.role}`} replace />
            )
          }
        />


        {/* =================================================
            SUPERVISOR
            ================================================= */}

        <Route
          path="/supervisor"
          element={
            user.role === "supervisor" ? (
              <Supervisor />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />


        {/* =================================================
            FACULTY
            ================================================= */}

        <Route
          path="/faculty"
          element={
            user.role === "faculty" ? (
              <Faculty />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />


        {/* =================================================
            STUDENT
            ================================================= */}

        <Route
          path="/student"
          element={
            user.role === "student" ? (
              <Student />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />


        {/* =================================================
            UNKNOWN ROUTE
            ================================================= */}

        <Route
          path="*"
          element={
            user.role === "admin" ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to={`/${user.role}`} replace />
            )
          }
        />

      </Routes>

    </>
  );
}


function App() {

  return (
    <BrowserRouter>

      <AuthProvider>

        <ComplaintProvider>

          <InspectionProvider>

            <Routes>

              {/* Login */}
              <Route
                path="/login"
                element={<Login />}
              />

              {/* Protected application */}
              <Route
                path="/*"
                element={<ProtectedLayout />}
              />

            </Routes>

          </InspectionProvider>

        </ComplaintProvider>

      </AuthProvider>

    </BrowserRouter>
  );
}


export default App;