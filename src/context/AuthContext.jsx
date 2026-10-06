import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const login = (username, password, role) => {

    // Demo login
    const users = {
      admin: {
        username: "admin",
        password: "admin123",
        role: "admin",
        name: "System Admin"
      },

      supervisor: {
        username: "supervisor",
        password: "super123",
        role: "supervisor",
        name: "Cleaning Supervisor"
      },

      faculty: {
        username: "faculty",
        password: "faculty123",
        role: "faculty",
        name: "Department Faculty"
      },

      student: {
        username: "student",
        password: "student123",
        role: "student",
        name: "Student"
      }
    };

    const selectedUser = users[role];

    if (
      selectedUser &&
      selectedUser.username === username &&
      selectedUser.password === password
    ) {
      setUser({
        username: selectedUser.username,
        role: selectedUser.role,
        name: selectedUser.name
      });

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}