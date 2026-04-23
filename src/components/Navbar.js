import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onAuthClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[80] border-b border-slate-100 bg-white/80 backdrop-blur-xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Логотип */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">EcoSnap</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-emerald-600 transition-colors">Возможности</a>
          <button onClick={onAuthClick} className="text-slate-900 font-semibold hover:text-emerald-600 transition-colors">Войти</button>
          <button 
            onClick={onAuthClick}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-slate-200"
          >
            Создать аккаунт
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
          <a href="#features" className="text-lg font-medium text-slate-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>Возможности</a>
          <div className="h-px bg-slate-100 w-full" />
          <button 
            onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }}
            className="text-lg font-medium text-slate-900 py-2 text-left"
          >
            Войти
          </button>
          <button 
            onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold"
          >
            Создать аккаунт
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;