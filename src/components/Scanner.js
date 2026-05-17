import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  RefreshCw,
  CheckCircle2,
  Leaf,
  Coins,
  Sparkles,
  Camera,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { processEcoScan } from "../services/gamification";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useLanguage } from "../context/LanguageContext";
import { recyclingRules } from "../data/regions";

const Scanner = ({ user }) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage(); // Добавили language, чтобы знать текущий язык
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      };
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Доступ к камере отклонен:", err);
      }
    }
    startCamera();
    return () => {
      const activeStream = streamRef.current;
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    setIsAnalyzing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setIsAnalyzing(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", blob, "scan.jpg");
      formData.append("lang", language); // ОТПРАВЛЯЕМ ЯЗЫК НА БЭКЕНД, чтобы ИИ отвечал на нужном языке

      try {
        const response = await fetch("http://localhost:5000/api/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok)
          throw new Error(t("scanner.serverError") || "Server error");

        const aiData = await response.json();
        const annotation = (aiData.type || aiData.object || "").toLowerCase();
        const scanLabel = aiData.type || aiData.object || t("scanner.item");

        const gameType =
          annotation.includes("plastic") || annotation.includes("пластик")
            ? "plastic"
            : annotation.includes("glass") || annotation.includes("стекло")
              ? "glass"
              : annotation.includes("metal") || annotation.includes("металл")
                ? "metal"
                : annotation.includes("paper") ||
                    annotation.includes("бумага") ||
                    annotation.includes("картон")
                  ? "paper"
                  : null;

        if (!gameType) {
          setIsAnalyzing(false);
          setResult({
            title: t("scanner.unrecognizedTitle") || "UNKNOWN OBJECT",
            instructions:
              t("scanner.unrecognizedInstructions") ||
              "Please try again with better lighting.",
            points: 0,
            ozone: 0,
            isUnknown: true,
          });
          return;
        }

        let gameResult = { addEcoScore: aiData.ecoPoints || 20, addOzone: 20 };

        if (user?.uid) {
          gameResult = await processEcoScan(user.uid, gameType);
        }

        const binInstruction =
          recyclingRules[userData?.country]?.[userData?.city]?.[gameType] ||
          t("scanner.defaultBin");

        const harmMessages = {
          plastic: t("scanner.harm.plastic"),
          glass: t("scanner.harm.glass"),
          metal: t("scanner.harm.metal"),
          paper: t("scanner.harm.paper"),
        };

        const harm = harmMessages[gameType] || t("scanner.harm.default");
        const description = `${t("scanner.scannedPrefix") || "Scanned:"} ${scanLabel}. ${t("scanner.takeTo") || "Take to:"} ${binInstruction}.`;

        if (user?.uid) {
          try {
            await updateDoc(doc(db, "users", user.uid), {
              activityHistory: arrayUnion({
                type: "scan",
                description: description,
                date: new Date().toISOString(),
                ecoScore: gameResult?.addEcoScore || 20,
              }),
            });
          } catch (error) {
            console.error("Ошибка при добавлении в историю активности:", error);
          }
        }

        setIsAnalyzing(false);
        setResult({
          title: scanLabel.toUpperCase(),
          instructions: `${t("scanner.takeTo") || "Take to"} ${binInstruction}. ${aiData.advice || ""} ${harm || ""}`,
          points: gameResult?.addEcoScore || 20,
          ozone: gameResult?.addOzone || 20,
          type: gameType,
        });
      } catch (error) {
        console.error("Ошибка при сканировании:", error);
        alert(t("scanner.analysisError") || "Analysis error");
        setIsAnalyzing(false);
      }
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col w-screen h-screen overflow-hidden font-sans text-slate-900 select-none antialiased">
      <style>{`
        @keyframes scan-moving {
          0% { top: 2%; opacity: 0.3; }
          50% { opacity: 1; filter: drop-shadow(0 0 8px #34d399); }
          100% { top: 98%; opacity: 0.3; }
        }
        @keyframes float-glow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.7; filter: blur(32px); }
        }
        .animate-scan-line {
          animation: scan-moving 2.5s ease-in-out infinite;
        }
        .animate-float-glow {
          animation: float-glow 3s ease-in-out infinite;
        }
      `}</style>

      <canvas ref={canvasRef} className="hidden" />

      {/* ТОП-БАР */}
      <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/70 via-black/40 to-transparent pt-8">
        <button
          onClick={() => navigate("/profile")}
          className="p-3.5 bg-black/40 backdrop-blur-2xl rounded-full text-white/90 border border-white/10 active:scale-90 hover:bg-black/60 transition-all duration-200 shadow-xl"
        >
          <X size={24} />
        </button>

        <div className="px-5 py-2.5 bg-emerald-500/15 backdrop-blur-2xl rounded-full text-emerald-400 text-xs font-black tracking-widest border border-emerald-500/30 flex items-center gap-2.5 shadow-2xl shadow-emerald-950/40">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          ECOSNAP VISION v2.0
        </div>

        <div className="w-12 h-12" />
      </div>

      {/* ВИДОИСКАТЕЛЬ */}
      <div className="relative flex-1 w-full bg-black overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
          style={{
            filter: isAnalyzing
              ? "brightness(0.4) blur(4px) scale(1.05)"
              : "none",
          }}
        />

        {/* Подсказка сверху */}
        {!result && !isAnalyzing && (
          <div className="absolute top-28 inset-x-0 flex justify-center px-8 z-20 pointer-events-none">
            <p className="px-5 py-3 bg-black/60 backdrop-blur-xl rounded-2xl text-white text-sm font-semibold tracking-wide border border-white/10 shadow-2xl text-center max-w-xs leading-snug">
              {t("scanner.hint") || "Наведите камеру на объект для анализа"}
            </p>
          </div>
        )}

        {!result && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 p-6">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 max-w-full aspect-square border border-white/10 rounded-[3rem] shadow-[0_0_0_9999px_rgba(0,0,0,0.55)] transition-all duration-500">
              <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-emerald-400 rounded-tl-[1.5rem] filter drop-shadow-[0_0_4px_#34d399]" />
              <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-emerald-400 rounded-tr-[1.5rem] filter drop-shadow-[0_0_4px_#34d399]" />
              <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-emerald-400 rounded-bl-[1.5rem] filter drop-shadow-[0_0_4px_#34d399]" />
              <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-emerald-400 rounded-br-[1.5rem] filter drop-shadow-[0_0_4px_#34d399]" />

              {isAnalyzing && (
                <div className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-line" />
              )}
            </div>
          </div>
        )}

        {/* ЭКРАН ИИ-АНАЛИЗА */}
        {isAnalyzing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 transition-all duration-300">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute w-44 h-44 bg-emerald-500/30 rounded-full blur-3xl animate-float-glow" />
              <div className="p-7 bg-emerald-500/20 border-2 border-emerald-400/40 rounded-full backdrop-blur-3xl shadow-[0_0_50px_rgba(16,185,129,0.3)] relative z-10">
                <RefreshCw
                  size={44}
                  className="animate-spin text-emerald-300 duration-1000"
                />
              </div>
            </div>
            <p className="font-black text-xl tracking-widest text-emerald-300 uppercase bg-black/60 px-6 py-3 rounded-2xl border border-emerald-500/20 backdrop-blur-2xl shadow-2xl">
              {t("scanner.analysis") || "АНАЛИЗ ОБЪЕКТА..."}
            </p>
          </div>
        )}
      </div>

      {/* НИЖНЯЯ ПАНЕЛЬ */}
      {!result && !isAnalyzing && (
        <div className="absolute bottom-0 inset-x-0 pb-14 pt-8 flex justify-center items-center z-30 bg-gradient-to-t from-black/90 via-black/40 to-transparent w-full">
          <button
            onClick={handleCapture}
            className="group relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center focus:outline-none active:scale-90 transition-all duration-300 cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-500/40 scale-125 group-hover:scale-135 transition-transform duration-300 animate-pulse shadow-[0_0_30px_rgba(16,185,129,0.2)]" />
            <span className="absolute inset-1 rounded-full bg-black/40 backdrop-blur-md border-[4px] border-white/70 group-hover:border-white group-hover:scale-105 transition-all duration-300 shadow-2xl" />
            <span className="absolute inset-4 rounded-full bg-white group-hover:bg-emerald-500 shadow-2xl transition-all duration-300 flex items-center justify-center text-slate-900 group-hover:text-white">
              <Camera
                size={34}
                className="transition-transform group-hover:rotate-12 duration-300"
              />
            </span>
          </button>
        </div>
      )}

      {/* ШТОРКА РЕЗУЛЬТАТОВ */}
      {result && (
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-white/95 backdrop-blur-3xl rounded-t-[3rem] z-40 border-t border-white/40 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom duration-500 ease-out flex flex-col max-h-[85vh] overflow-y-auto">
          <div className="w-16 h-1.5 bg-slate-300 rounded-full mx-auto mb-8 opacity-75" />

          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-2xl shadow-xl ${
                  result.isUnknown
                    ? "bg-amber-50 text-amber-600 border border-amber-200"
                    : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                }`}
              >
                {result.isUnknown ? (
                  <AlertTriangle size={30} className="animate-pulse" />
                ) : (
                  <CheckCircle2 size={30} />
                )}
              </div>
              <div>
                {/* Исправлено: Текст заголовка теперь переводится */}
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  {result.isUnknown
                    ? t("scanner.attention") || "Внимание"
                    : t("scanner.successTitle") || "Успешное сканирование"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                  {result.title}
                </h3>
              </div>
            </div>

            {!result.isUnknown && (
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-black rounded-xl border border-emerald-400/20 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 tracking-wider uppercase">
                <Leaf size={14} className="fill-white/20" />+{result.points}{" "}
                {t("scanner.ecoScoreLabel") || "ЭКОСЧЁТ"}
              </div>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6 mb-6 shadow-inner">
            <p className="text-slate-700 text-base font-semibold leading-relaxed">
              {result.instructions}
            </p>
          </div>

          {/* СЕТКА НАГРАД */}
          {!result.isUnknown && (
            <div className="grid grid-cols-2 gap-5 mb-8">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200/60 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
                <div className="absolute -right-3 -bottom-3 text-emerald-500/10 transform group-hover:scale-120 group-hover:rotate-12 transition-all duration-500">
                  <Leaf size={80} className="fill-emerald-500/5" />
                </div>
                <div className="flex items-center gap-2 text-emerald-600 mb-1.5 z-10">
                  <Leaf size={16} className="fill-emerald-200" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    {t("scanner.ecoScoreLabel") || "ЭКООЧКИ"}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-700 z-10 tracking-tight">
                  +{result.points}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 rounded-2xl border border-blue-200/60 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
                <div className="absolute -right-3 -bottom-3 text-blue-500/10 transform group-hover:scale-120 group-hover:rotate-12 transition-all duration-500">
                  <Coins size={80} />
                </div>
                <div className="flex items-center gap-2 text-blue-600 mb-1.5 z-10">
                  <Coins size={16} />
                  <span className="text-xs font-black uppercase tracking-wider">
                    {t("scanner.ozoneLabel") || "ОЗОН"}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-blue-700 z-10 tracking-tight">
                  +{result.ozone}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate("/profile")}
            className="w-full mt-auto bg-slate-900 text-white py-5 rounded-2xl font-black text-base hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/30 active:scale-[0.97] focus:outline-none flex items-center justify-center gap-3 tracking-widest uppercase"
          >
            {t("scanner.finishButton") || "Завершить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
