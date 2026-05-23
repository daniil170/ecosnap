import React from "react";

const Footer = () => (
  <footer className="py-12 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 opacity-50 grayscale">
        <div className="w-5 h-5 bg-slate-900 dark:bg-white rounded-md transition-colors duration-300" />
        <span className="font-bold text-slate-900 dark:text-white transition-colors duration-300">
          EcoSnap
        </span>
      </div>

      <p className="text-slate-400 dark:text-slate-500 text-sm transition-colors duration-300">
        Developed by{" "}
        <span className="text-slate-900 dark:text-white font-medium transition-colors duration-300">
          Ivakin Daniil
        </span>
      </p>

      <div className="flex gap-6 text-sm text-slate-400 dark:text-slate-500 transition-colors duration-300">
        <a
          href="https://github.com/repos"
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
        >
          GitHub
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
