import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, X, Check, CheckCircle, Clock, Zap, Trash2 } from "lucide-react";

import { useAuth } from "../context/Authcontext";
import { apiFetch } from "../../utils/apifetch.js";

const QuestsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showForm, setShowForm] = useState(false);

  const [quests, setQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "easy",
  });

  const fetchQuests = async () => {
    try {
      const response = await apiFetch("/api/quest", {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      const active = data.quests.filter((quest) => !quest.isCompleted);

      const completed = data.quests.filter((quest) => quest.isCompleted);

      setQuests(active);
      setCompletedQuests(completed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create Quest
  const handleCreateQuest = async () => {
    if (!formData.title) {
      return;
    }

    try {
      const response = await apiFetch("/api/quest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          difficulty: formData.difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      fetchQuests();
      setFormData({
        title: "",
        description: "",
        difficulty: "easy",
      });

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Complete Quest
  const handleCompleteQuest = async (quest) => {
    try {
      const response = await apiFetch(
        `/api/quest/${quest._id}/complete`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      console.log("Quest Completed:", data);

      const updatedUser = {
        ...currentUser,
        level: data.user.level,
        xp: data.user.xp,
        gold: data.user.gold,
      };

      setCurrentUser(updatedUser);

      localStorage.setItem("lifeRPGCurrentUser", JSON.stringify(updatedUser));

      fetchQuests();
    } catch (error) {
      console.log(error);
    }
  };
  // Delete Active Quest
  const handleDeleteQuest = async (id) => {
    try {
      const response = await apiFetch(`/api/quest/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      fetchQuests();
    } catch (error) {
      console.log(error);
    }
  };
  // Delete Completed Quest
  const handleDeleteCompletedQuest = async (id) => {
    try {
      const response = await apiFetch(`/api/quest/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      fetchQuests();
    } catch (error) {
      console.log(error);
    }
  };

  const displayedQuests = activeTab === "active" ? quests : completedQuests;

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Quests & Tasks
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Complete your tasks and earn XP.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
          <Plus size={18} />
          Add Quest
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 cursor-pointer transition ${
            activeTab === "active" ?
              "text-orange-600 border-orange-500"
            : "text-slate-500 border-transparent"
          }`}>
          Active
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 cursor-pointer transition ${
            activeTab === "completed" ?
              "text-orange-600 border-orange-500"
            : "text-slate-500 border-transparent"
          }`}>
          Completed
        </button>
      </div>

      {/* Quest List */}
      {displayedQuests.length === 0 ?
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full min-h-75 flex flex-col items-center justify-center text-center border border-dashed border-slate-300 rounded-2xl bg-white px-6 py-10">
          {/* Empty State Icon */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
              activeTab === "active" ? "bg-orange-50" : "bg-green-50"
            }`}>
            {activeTab === "active" ?
              <Plus size={25} className="text-orange-500" />
            : <CheckCircle size={28} className="text-green-500" />}
          </div>

          {/* Empty State Title */}
          <h2 className="text-xl font-bold text-slate-800">
            {activeTab === "active" ? "Create a task" : "No Task completed"}
          </h2>

          {/* Empty State Description */}
          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            {activeTab === "active" ?
              "You don't have any active tasks yet."
            : "You don't have any completed tasks yet."}
          </p>

          {/* Create Button Only For Active */}
          {activeTab === "active" && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
              Create Task
            </button>
          )}
        </motion.div>
      : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedQuests.map((quest) => (
            <motion.div
              key={quest._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -3,
                boxShadow: "0 12px 26px rgba(15, 23, 42, 0.08)",
              }}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-colors hover:border-orange-200">
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                      quest.difficulty === "easy" ? "bg-green-50 text-green-600"
                      : quest.difficulty === "medium" ?
                        "bg-yellow-50 text-yellow-600"
                      : "bg-red-50 text-red-600"
                    }`}>
                    {quest.difficulty}
                  </span>

                  <h2 className="text-lg font-bold text-slate-900 mt-3">
                    {quest.title}
                  </h2>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() =>
                    activeTab === "active" ?
                      handleDeleteQuest(quest._id)
                    : handleDeleteCompletedQuest(quest._id)
                  }
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  title="Delete task">
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Description */}
              {quest.description && (
                <p className="text-sm text-slate-500 mt-3">
                  {quest.description}
                </p>
              )}

              {/* Info */}
              <div className="flex items-center flex-wrap gap-4 mt-5">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-600">
                  <Zap size={16} />+{quest.xpReward} XP
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-yellow-600">
                  🪙 +{quest.goldReward} Gold
                </div>
              </div>

              {/* Complete */}
              {activeTab === "active" && (
                <button
                  onClick={() => handleCompleteQuest(quest)}
                  className="w-full mt-5 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
                  <Check size={17} />
                  Complete Quest
                </button>
              )}

              {/* Completed */}
              {activeTab === "completed" && (
                <div className="w-full mt-5 flex items-center justify-center gap-2 bg-green-50 text-green-600 py-2.5 rounded-xl text-sm font-semibold">
                  <Check size={17} />
                  Completed
                </div>
              )}
            </motion.div>
          ))}
        </div>
      }

      {/* Create Quest Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Create New Quest
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add a task and earn XP by completing it.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Study Physics"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your task..."
                  rows="3"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Difficulty
                </label>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-slate-200 text-slate-700 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition">
                  Cancel
                </button>

                <button
                  onClick={handleCreateQuest}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold transition">
                  Create Quest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.main>
  );
};

export default QuestsPage;
