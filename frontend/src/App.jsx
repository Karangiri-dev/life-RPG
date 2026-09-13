import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import QuestsPage from "../components/quests/QuestsPage";
import Navbar from "../components/common/Navbar";
import Dashboard from "../components/dashboard/Dashboard";
import CharacterStats from "../components/character/CharacterStats";
import RewardShop from "../components/rewards/RewardShop";

import { XPProvider } from "../components/context/XPContext";
import LoginPage from "./LoginPage";
import Signup from "./../components/auth/Signup";
import { AuthProvider } from "./../components/context/Authcontext";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import StreaksHistory from './../components/streak/StreaksHistory';
import ProfilePage from './../components/common/profile';

const App = () => {
  return (
    <AuthProvider>
      <XPProvider>
        <BrowserRouter>
          <Routes>

            {/* ================= AUTH PAGES ================= */}

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />


            {/* ================= PROTECTED PAGES ================= */}

            {/* Dashboard */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Character Stats */}
            <Route
              path="/character-stats"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <CharacterStats />
                </ProtectedRoute>
              }
            />

            {/* Quests */}
            <Route
              path="/quests"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <QuestsPage />
                </ProtectedRoute>
              }
            />

            {/* Reward Shop */}
            <Route
              path="/reward-shop"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <RewardShop />
                </ProtectedRoute>
              }
            />
            <Route path="/streaks" element={
               <ProtectedRoute> 
                <Navbar /> 
                <StreaksHistory /> 
                </ProtectedRoute> 
              } 
              />
              <Route path="/profile" element={
                <ProfilePage />
                } 
                />
              

          </Routes>
        </BrowserRouter>
      </XPProvider>
    </AuthProvider>
  );
};

export default App;
