import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { ShoppingBag, Zap, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SHOP_ITEMS = [
  {
    id: "gradient_midnight",
    name: 'Градиент "Полночь"',
    price: 100,
    category: "digital",
    icon: "🌌",
    desc: "Эксклюзивный стиль для профиля",
  },
  {
    id: "golden_frame",
    name: "Золотая рамка",
    price: 500,
    category: "digital",
    icon: "✨",
    desc: "Рамка VIP-пользователя",
  },
  {
    id: "eco_tote",
    name: "Эко-сумка",
    price: 1000,
    category: "real",
    icon: "🛍️",
    desc: "Стильный шопер из хлопка",
  },
  {
    id: "tree_donation",
    name: "Посадка дерева",
    price: 2000,
    category: "charity",
    icon: "🌳",
    desc: "Реальный вклад в экологию",
  },
];

const Shop = ({ user, profile }) => {
  const [loading, setLoading] = useState(null);

  const handlePurchase = async (item) => {
    if (!user?.uid || (profile.ozone || 0) < item.price) return;

    setLoading(item.id);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ozone: increment(-item.price),
        inventory: arrayUnion(item.id),
      });
      alert("Покупка успешна!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">
              Назад в профиль
            </span>
          </Link>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center">
              <Zap size={18} className="fill-orange-500" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">
                Ваш баланс
              </p>
              <p className="text-lg font-black text-slate-900">
                {profile.ozone || 0} O3
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-2 italic uppercase">
          EcoMarket
        </h1>
        <p className="text-slate-500 mb-10 text-sm">
          Трать накопленные баллы на эксклюзивные бонусы
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {SHOP_ITEMS.map((item) => {
            const isOwned = profile.inventory?.includes(item.id);
            const canAfford = (profile.ozone || 0) >= item.price;

            return (
              <div
                key={item.id}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
              >
                <div className="flex justify-between items-start relative z-10">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-slate-100 rounded-full text-slate-500">
                      {item.category === "digital"
                        ? "Цифровой"
                        : item.category === "real"
                          ? "Товар"
                          : "Миссия"}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-slate-500 text-sm mb-6">{item.desc}</p>

                <button
                  disabled={isOwned || !canAfford || loading === item.id}
                  onClick={() => handlePurchase(item)}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2
                    ${
                      isOwned
                        ? "bg-emerald-50 text-emerald-500 cursor-default"
                        : canAfford
                          ? "bg-slate-900 text-white hover:shadow-xl hover:-translate-y-1 active:scale-95"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  {isOwned ? (
                    <>
                      <CheckCircle size={18} /> Куплено
                    </>
                  ) : (
                    <>
                      <Zap
                        size={18}
                        className={canAfford ? "fill-white" : ""}
                      />{" "}
                      {item.price} O3
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
