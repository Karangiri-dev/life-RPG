
import React, { useState } from "react";
import {
  Plus,
  X,
  Check,
  CheckCircle,
  Clock,
  Zap,
  Trash2,
} from "lucide-react";

import { useXP } from "../context/XPContext";

const QuestsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showForm, setShowForm] = useState(false);

  const {
    quests,
    completedQuests,
    setQuests,
    completeQuest,
    deleteQuest,
    deleteCompletedQuest,
  } = useXP();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Study",
    xp: "",
    time: "",
  });

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create Quest
  const handleCreateQuest = () => {
    if (!formData.title || !formData.xp || !formData.time) {
      return;
    }

    const newQuest = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      xp: Number(formData.xp),
      time: formData.time,
    };

    setQuests((prev) => [...prev, newQuest]);

    setFormData({
      title: "",
      description: "",
      category: "Study",
      xp: "",
      time: "",
    });

    setShowForm(false);
    setActiveTab("active");
  };

  // Complete Quest
  const handleCompleteQuest = (quest) => {
    completeQuest(quest);
  };

  // Delete Active Quest
  const handleDeleteQuest = (id) => {
    deleteQuest(id);
  };

  // Delete Completed Quest
  const handleDeleteCompletedQuest = (id) => {
    deleteCompletedQuest(id);
  };

  const displayedQuests =
    activeTab === "active"
      ? quests
      : completedQuests;

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">

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
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-semibold transition"
        >
          <Plus size={18} />
          Add Quest
        </button>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200">

        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition ${
            activeTab === "active"
              ? "text-orange-600 border-orange-500"
              : "text-slate-500 border-transparent"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition ${
            activeTab === "completed"
              ? "text-orange-600 border-orange-500"
              : "text-slate-500 border-transparent"
          }`}
        >
          Completed
        </button>

      </div>

      {/* Quest List */}
      {displayedQuests.length === 0 ? (

        <div className="w-full min-h-[300px] flex flex-col items-center justify-center text-center border border-dashed border-slate-300 rounded-2xl bg-white">

          {/* Empty State Icon */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
              activeTab === "active"
                ? "bg-orange-50"
                : "bg-green-50"
            }`}
          >
            {activeTab === "active" ? (
              <Plus
                size={25}
                className="text-orange-500"
              />
            ) : (
              <CheckCircle
                size={28}
                className="text-green-500"
              />
            )}
          </div>

          {/* Empty State Title */}
          <h2 className="text-xl font-bold text-slate-800">
            {activeTab === "active"
              ? "Create a task"
              : "No Task completed"}
          </h2>

          {/* Empty State Description */}
          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            {activeTab === "active"
              ? "You don't have any active tasks yet."
              : "You don't have any completed tasks yet."}
          </p>

          {/* Create Button Only For Active */}
          {activeTab === "active" && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
            >
              Create Task
            </button>
          )}

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {displayedQuests.map((quest) => (

            <div
              key={quest.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-3">

                <div>
                  <span className="inline-block text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                    {quest.category}
                  </span>

                  <h2 className="text-lg font-bold text-slate-900 mt-3">
                    {quest.title}
                  </h2>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() =>
                    activeTab === "active"
                      ? handleDeleteQuest(quest.id)
                      : handleDeleteCompletedQuest(quest.id)
                  }
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  title="Delete task"
                >
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
              <div className="flex items-center gap-4 mt-5">

                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock size={16} />
                  {quest.time}
                </div>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-600">
                  <Zap size={16} />
                  +{quest.xp} XP
                </div>

              </div>

              {/* Complete */}
              {activeTab === "active" && (
                <button
                  onClick={() => handleCompleteQuest(quest)}
                  className="w-full mt-5 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold transition"
                >
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

            </div>

          ))}

        </div>

      )}

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
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              >
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
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option value="Study">Study</option>
                  <option value="Health">Health</option>
                  <option value="Learning">Learning</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              {/* XP + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    XP
                  </label>

                  <input
                    type="number"
                    name="xp"
                    value={formData.xp}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    min="1"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Time
                  </label>

                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="e.g. 30 min"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">

                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-slate-200 text-slate-700 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateQuest}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-sm font-semibold transition"
                >
                  Create Quest
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

    </main>
  );
};

export default QuestsPage;
