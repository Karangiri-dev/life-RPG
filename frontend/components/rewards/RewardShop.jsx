import React, { useEffect, useRef } from "react";
import { Coins, Gift } from "lucide-react";
import { useAuth } from "../context/Authcontext";
import gsap from "gsap";

const RewardShop = () => {
  const { currentUser, setCurrentUser } = useAuth();

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");

  const gold = currentUser?.gold || 0;

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const goldRef = useRef(null);
  const messageRef = useRef(null);
  const rewardCardsRef = useRef([]);

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

  // Page animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        pageRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      )
        .fromTo(
          headerRef.current,
          {
            opacity: 0,
            y: -15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .fromTo(
          goldRef.current,
          {
            opacity: 0,
            x: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        );

      // Reward cards
      gsap.fromTo(
        rewardCardsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 30,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Message animation
  useEffect(() => {
    if (!message || !messageRef.current) return;

    gsap.fromTo(
      messageRef.current,
      {
        opacity: 0,
        y: -10,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      }
    );
  }, [message]);

  const handleRedeem = (reward) => {
    if (gold < reward.cost) {
      setMessage("Not enough Gold!");
      setMessageType("error");
      return;
    }

    const updatedUser = {
      ...currentUser,
      gold: currentUser.gold - reward.cost,
    };

    localStorage.setItem(
      "lifeRPGCurrentUser",
      JSON.stringify(updatedUser)
    );

    setCurrentUser(updatedUser);

    setMessage(`${reward.name} redeemed successfully!`);
    setMessageType("success");
  };

  return (
    <section
      ref={pageRef}
      className="min-h-screen bg-slate-50 px-4 py-6 sm:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Reward Shop
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Spend your hard-earned Gold on rewards.
            </p>
          </div>

          {/* Gold */}
          <div
            ref={goldRef}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm"
          >
            <Coins size={20} className="text-orange-500" />

            <span className="font-bold text-slate-900">
              {gold} Gold
            </span>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            ref={messageRef}
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
          {rewards.map((reward, index) => (
            <div
              key={reward.id}
              ref={(el) => (rewardCardsRef.current[index] = el)}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-orange-200 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                <Gift size={24} className="text-orange-600" />
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
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold cursor-pointer hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition"
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