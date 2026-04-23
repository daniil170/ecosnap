import React, { useState } from 'react';
import './App.css';

export default function App() {
  // Состояние: авторизован ли пользователь (находится ли в личном кабинете)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [stats, setStats] = useState({
    scans: 15,
    recycled: 42,
    co2: 2.5
  });

  const [language, setLanguage] = useState('RU');

  // --- Компонент: Главная страница (SaaS Landing) ---
  const renderLandingPage = () => (
    <div className="landing-page">
      <header className="navbar">
        <div className="logo">🌿 EcoSnap</div>
        <div className="nav-controls">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-selector">
            <option value="RU">🇷🇺 RU</option>
            <option value="EN">🇬🇧 EN</option>
            <option value="DE">🇩🇪 DE</option>
          </select>
          <button className="login-btn" onClick={() => setIsLoggedIn(true)}>Войти / Кабинет</button>
        </div>
      </header>

      <main>
        {/* Главный блок */}
        <section className="hero-section">
          <h1>Умная сортировка мусора с помощью AI</h1>
          <p>Сканируй отходы камерой смартфона, узнавай правила утилизации и спасай планету вместе с нами.</p>
          <button className="cta-button" onClick={() => setIsLoggedIn(true)}>Начать бесплатно</button>
        </section>

        {/* Блок: Кто мы и что делаем */}
        <section className="about-section">
          <div className="about-card">
            <h3>🌍 Кто мы такие?</h3>
            <p>Мы — команда энтузиастов, создающая удобный инструмент для студентов и эко-осознанных людей. Мы помогаем разобраться в сложных правилах сортировки мусора.</p>
          </div>
          <div className="about-card">
            <h3>📸 Что у нас можно делать?</h3>
            <p>Достаточно навести камеру на предмет, и наш AI подскажет, в какой контейнер его выбросить. Выполняй задания и соревнуйся с друзьями!</p>
          </div>
          <div className="about-card">
            <h3>🎯 Для чего мы?</h3>
            <p>Наша цель — сделать переработку простой привычкой, снизить выбросы CO₂ и сделать мир чище.</p>
          </div>
        </section>
      </main>
    </div>
  );

  // --- Компонент: Личный кабинет (Dashboard) ---
  const renderDashboard = () => (
    <div className="dashboard">
      <header className="navbar">
        <div className="logo">🌿 EcoSnap Dashboard</div>
        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Выйти</button>
      </header>

      <div className="dashboard-content">
        <h2>Привет, Эко-герой! 👋</h2>
        
        {/* Глобальная статистика кабинета */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.scans}</div>
            <div className="stat-name">Всего сканов</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.recycled}</div>
            <div className="stat-name">Переработано</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.co2} кг</div>
            <div className="stat-name">Сэкономлено CO₂</div>
          </div>
        </div>

        {/* Основное действие */}
        <div className="action-area">
          <div className="camera-placeholder">
            📷 Камера (AI сканер)
          </div>
          <button className="scan-button-large">Сканировать предмет</button>
        </div>
      </div>
    </div>
  );

  // Отрисовываем либо кабинет, либо главную страницу
  return (
    <div className="app-wrapper">
      {isLoggedIn ? renderDashboard() : renderLandingPage()}
    </div>
  );
}