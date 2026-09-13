import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("lifeRPGLoggedIn") === "true",
  );

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("lifeRPGCurrentUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login
  const login = (user) => {
    localStorage.setItem("lifeRPGLoggedIn", "true");

    localStorage.setItem("lifeRPGCurrentUser", JSON.stringify(user));

    setIsLoggedIn(true);
    setCurrentUser(user);
  };
  // Logout
  const logout = () => {
    localStorage.removeItem("lifeRPGLoggedIn");
    localStorage.removeItem("lifeRPGCurrentUser");

    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        setCurrentUser,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
