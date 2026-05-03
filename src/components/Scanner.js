import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, RefreshCw, Zap } from "lucide-react";
import { processEcoScan } from "../services/gamification";

const Scanner = ({ user }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // Ключевой элемент для управления камерой
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // 1. Стабильный запуск и остановка камеры
  // Исправленный useEffect с учетом безопасности ref
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
        console.error("Camera access denied:", err);
      }
    }

    startCamera();

    // Функция очистки
    return () => {
      // 1. Создаем локальные копии рефов прямо перед использованием
      const videoNode = videoRef.current;
      const activeStream = streamRef.current;

      // 2. Работаем с локальными переменными, а не напрямую с рефами
      if (videoNode) {
        videoNode.srcObject = null;
      }
      
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
        streamRef.current = null; // Очищаем реф после остановки
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
        const response = await fetch("http://localhost:5000/api/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("API Error");
        const aiData = await response.json();

        // Простой маппинг типов для геймификации
        const type = aiData.type.toLowerCase();
        const gameType = type.includes("plastic")
          ? "plastic"
          : type.includes("glass")
            ? "glass"
            : type.includes("metal")
              ? "metal"
              : "paper";

        let gameResult = { addEcoScore: aiData.ecoPoints, addOzone: 20 };
        if (user?.uid) {
          try {
            gameResult = await processEcoScan(user.uid, gameType);
          } catch (e) {
            console.error(e);
          }
        }

        setIsAnalyzing(false);
        setResult({
          title: aiData.type.toUpperCase(),
          instructions: aiData.advice,
          points: `+${gameResult?.addEcoScore || aiData.ecoPoints} эко-счёта`,
        });
      } catch (error) {
        alert("Ошибка распознавания");
        setIsAnalyzing(false);
      }
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col w-screen h-screen overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        <Link
          to="/"
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white active:scale-90 transition"
        >
          <X size={24} />
        </Link>
        <div className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-400 text-xs font-bold border border-emerald-500/30">
          EcoSnap Vision
        </div>
        <div className="w-12"></div>
      </div>

      {/* Основная область камеры */}
      <div className="relative flex-1 w-full bg-slate-900 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Рамка фокуса */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-emerald-500/50 rounded-3xl" />
        </div>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-30">
            <RefreshCw
              size={50}
              className="animate-spin text-emerald-500 mb-4"
            />
            <p>Анализ...</p>
          </div>
        )}
      </div>

      {/* Результаты (если есть) */}
      {result && (
        <div className="absolute bottom-0 left-0 w-full p-8 bg-white rounded-t-[3rem] z-40 animate-in slide-in-from-bottom">
          <h3 className="text-xl font-bold">{result.title}</h3>
          <p className="text-slate-600 my-4">{result.instructions}</p>
          <button
            onClick={() => setResult(null)}
            className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold"
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Кнопка спуска */}
      {!result && !isAnalyzing && (
        <div className="bg-black p-8 flex justify-center items-center">
          <button
            onClick={handleCapture}
            className="w-20 h-20 bg-white rounded-full border-4 border-emerald-500 flex items-center justify-center active:scale-90 transition"
          />
        </div>
      )}
    </div>
  );
};

export default Scanner;
