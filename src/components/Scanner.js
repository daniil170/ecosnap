import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; // Добавили для перехода на главную
import { X, RefreshCw, Zap, Image as ImageIcon } from "lucide-react";

const Scanner = () => {
  // Убрали onClose из пропсов, так как теперь используем роутинг
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const startCamera = useCallback(async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setStream(newStream);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Не удалось получить доступ к камере.");
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startCamera, stream]);

  const handleCapture = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        title: "Стеклянная бутылка",
        type: "GL 70",
        instructions:
          "Снимите крышку и этикетку. Сдайте в пункт приема стекла.",
        points: "+20 XP",
      });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
        {/* ЗАМЕНА КНОПКИ: теперь это ссылка на главную */}
        <Link
          to="/"
          className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white active:scale-90 transition"
        >
          <X size={24} />
        </Link>

        <div className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md rounded-full text-emerald-400 text-xs font-bold border border-emerald-500/30">
          EcoSnap AI Vision
        </div>
        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white">
          <Zap size={24} />
        </button>
      </div>

      {/* Viewport */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-72 h-72 border-2 border-emerald-500/30 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] animate-scan" />
          </div>
        </div>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-30">
            <RefreshCw
              size={50}
              className="animate-spin text-emerald-500 mb-4"
            />
            <p className="text-xl font-bold tracking-wide">
              Анализ нейросетью...
            </p>
          </div>
        )}

        {result && (
          <div className="absolute bottom-0 w-full bg-white rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-500 z-40 shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {result.title}
                </h3>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold mt-2">
                  {result.type}
                </span>
              </div>
              <div className="bg-yellow-400 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
                {result.points}
              </div>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {result.instructions}
            </p>
            <button
              onClick={() => setResult(null)}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg active:scale-95 transition shadow-xl"
            >
              Понятно
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      {!result && !isAnalyzing && (
        <div className="bg-black p-10 flex justify-around items-center">
          <button className="text-white/50 hover:text-white transition">
            <ImageIcon size={28} />
          </button>
          <button onClick={handleCapture} className="group relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition"></div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center relative border-4 border-white/20 active:scale-90 transition shadow-2xl">
              <div className="w-16 h-16 bg-white border-4 border-slate-900 rounded-full" />
            </div>
          </button>
          <button className="text-white/50 hover:text-white transition">
            <RefreshCw size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
