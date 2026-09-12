
import React from "react";
import { Coins, Gift } from "lucide-react";
import { useXP } from "../context/XPContext";

const RewardShop = () => {
  const { gold, setGold } = useXP();

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");

  const rewards = [
    {
      id: 1,
      name: "30 Min Gaming",
      description: "Enjoy 30 minutes of gaming time.",
      cost: 50,
    },
    {
      id: 2,
      name: "Movie Time",
      description: "Take some time to watch a movie.",
      cost: 100,
    },
    {
      id: 3,
      name: "Favorite Meal",
      description: "Enjoy your favorite meal as a reward.",
      cost: 150,
    },
  ];

  const handleRedeem = (reward) => {
    if (gold < reward.cost) {
      setMessage("Not enough Gold!");
      setMessageType("error");
      return;
    }

    setGold((prev) => prev - reward.cost);

    setMessage(`${reward.name} redeemed successfully!`);
    setMessageType("success");
  };

  return (
    <section className="min-h-screen bg-slate-50 p-5 sm:p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Reward Shop
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Spend your hard-earned Gold on rewards.
            </p>
          </div>

          {/* Gold */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm">
            <Coins
              size={20}
              className="text-orange-500"
            />

            <span className="font-bold text-slate-900">
              {gold} Gold
            </span>
          </div>

        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-5 p-3 rounded-xl border font-medium ${
              messageType === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Rewards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {rewards.map((reward) => (

            <div
              key={reward.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-orange-200 transition"
            >

              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                <Gift
                  size={24}
                  className="text-orange-600"
                />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                {reward.name}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {reward.description}
              </p>

              <div className="flex items-center justify-between mt-6">

                <div className="flex items-center gap-1 text-sm font-semibold text-orange-600">
                  <Coins size={16} />
                  {reward.cost} Gold
                </div>

                <button
                  onClick={() => handleRedeem(reward)}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
                >
                  Redeem
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default RewardShop;

