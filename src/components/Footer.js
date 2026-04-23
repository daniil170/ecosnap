import React from 'react';

const Footer = () => (
  <footer className="py-12 border-t border-slate-100 bg-white">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 opacity-50 grayscale">
        <div className="w-5 h-5 bg-slate-900 rounded-md" />
        <span className="font-bold">EcoSnap</span>
      </div>
      
      <p className="text-slate-400 text-sm">
        Developed by <span className="text-slate-900 font-medium">Ivakin Daniil</span>
      </p>
      
      <div className="flex gap-6 text-sm text-slate-400">
        <a href="#" className="hover:text-emerald-600 transition-colors">GitHub</a>
        <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;