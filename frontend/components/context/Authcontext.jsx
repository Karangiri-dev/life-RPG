import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("lifeRPGLoggedIn") === "true"
  );

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("lifeRPGCurrentUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 👇 ADD THIS WHOLE useEffect
  useEffect(() => {
    const handleUserUpdate = () => {
      const savedUser = localStorage.getItem("lifeRPGCurrentUser");

      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener(
        "userUpdated",
        handleUserUpdate
      );
    };
  }, []);

  // Login
  const login = (user) => {
    localStorage.setItem("lifeRPGLoggedIn", "true");

    localStorage.setItem(
      "lifeRPGCurrentUser",
      JSON.stringify(user)
    );

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
        setCurrentUser, // 👈 ye bhi expose kar de
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);