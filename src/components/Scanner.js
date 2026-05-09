import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Заменяем Link на useNavigate для гибкости
import { X, RefreshCw, CheckCircle2, Leaf, Coins } from "lucide-react";
import { processEcoScan } from "../services/gamification";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useLanguage } from "../context/LanguageContext";
import { recyclingRules } from "../data/regions";

const Scanner = ({ user }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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

      try {
        // ВАЖНО: Убедись, что этот URL совпадает с адресом твоего сервера в VS Code
        const response = await fetch("http://localhost:5000/api/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error(t("scanner.serverError"));

        const aiData = await response.json();

        // Объект от Gemini может приходить в поле object, а не type.
        const annotation = (aiData.type || aiData.object || "").toLowerCase();
        const scanLabel = aiData.type || aiData.object || t("scanner.item");

        const gameType = annotation.includes("plastic") || annotation.includes("пластик")
          ? "plastic"
          : annotation.includes("glass") || annotation.includes("стекло")
            ? "glass"
            : annotation.includes("metal") || annotation.includes("металл")
              ? "metal"
              : annotation.includes("paper") || annotation.includes("бумага") || annotation.includes("картон")
                ? "paper"
                : null; // Не мусор

        if (!gameType) {
          setIsAnalyzing(false);
          setResult({
            title: t("scanner.unrecognizedTitle"),
            instructions: t("scanner.unrecognizedInstructions"),
            points: 0,
            ozone: 0,
          });
          return;
        }

        let gameResult = { addEcoScore: aiData.ecoPoints || 20, addOzone: 20 };

        if (user?.uid) {
          // Начисляем реальные очки в Firebase
          gameResult = await processEcoScan(user.uid, gameType);
        }

        const binInstruction = recyclingRules[userData?.country]?.[userData?.city]?.[gameType] || t("scanner.defaultBin");

        const harmMessages = {
          plastic: t("scanner.harm.plastic"),
          glass: t("scanner.harm.glass"),
          metal: t("scanner.harm.metal"),
          paper: t("scanner.harm.paper"),
        };

        const harm = harmMessages[gameType] || t("scanner.harm.default");

        const description = `${t("scanner.scannedPrefix")} ${scanLabel}. ${t("scanner.takeTo")} ${binInstruction}.`;

        // Добавляем в историю активности
        if (user?.uid) {
          try {
            await updateDoc(doc(db, "users", user.uid), {
              activityHistory: arrayUnion({
                type: "scan",
                description: description,
                date: new Date().toISOString(),
                ecoScore: gameResult?.addEcoScore || 20
              })
            });
          } catch (error) {
            console.error("Ошибка при добавлении в историю активности:", error);
          }
        }

        setIsAnalyzing(false);
        setResult({
          title: scanLabel.toUpperCase(),
          instructions: `${t("scanner.takeTo")} ${binInstruction}. ${aiData.advice || t("scanner.regionAdvice")} ${t("scanner.harmPrefix")} ${harm}.`,
          points: gameResult?.addEcoScore || 20,
          ozone: gameResult?.addOzone || 20,
        });
      } catch (error) {
        console.error("Ошибка при сканировании:", error);
        alert(t("scanner.analysisError"));
        setIsAnalyzing(false);
      }
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col w-screen h-screen overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header - Кнопка теперь ведет в Профиль */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <button
          onClick={() => navigate("/profile")}
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white"
        >
          <X size={24} />
        </button>
        <div className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-400 text-xs font-bold border border-emerald-500/30">
          EcoSnap Vision
        </div>
        <div className="w-12"></div>
      </div>

      {/* Camera View */}
      <div className="relative flex-1 w-full bg-slate-900 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-emerald-500/50 rounded-3xl" />
        </div>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-30">
            <RefreshCw
              size={50}
              className="animate-spin text-emerald-500 mb-4"
            />
            <p className="font-medium">{t("scanner.analysis")}</p>
          </div>
        )}
      </div>

      {/* Красивое отображение результата */}
      {result && (
        <div className="absolute bottom-0 left-0 w-full p-8 bg-white rounded-t-[3rem] z-40 animate-in slide-in-from-bottom duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {result.title}
            </h3>
          </div>

          <p className="text-slate-600 mb-8 leading-relaxed">
            {result.instructions}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center">
              <div className="flex items-center gap-2 text-emerald-600 mb-1">
                <Leaf size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("scanner.ecoScoreLabel")}
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-700">
                +{result.points}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-col items-center">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Coins size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {t("scanner.ozoneLabel")}
                </span>
              </div>
              <div className="text-2xl font-black text-blue-700">
                +{result.ozone}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            {t("scanner.finishButton")}
          </button>
        </div>
      )}

      {!result && !isAnalyzing && (
        <div className="bg-black p-10 flex justify-center items-center">
          <button
            onClick={handleCapture}
            className="w-20 h-20 bg-white rounded-full border-[6px] border-emerald-500 active:scale-90 transition-transform shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Scanner;
