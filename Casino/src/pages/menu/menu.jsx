// App.jsx
import React, { useState } from "react";
import "./menu.css";

function Home() {
  return <div className="screen"><h2>🏠 Home Screen</h2><p>Bienvenido a la pantalla principal.</p></div>;
}

function Profile() {
  return <div className="screen"><h2>👤 Profile Screen</h2><p>Esta es tu pantalla de perfil.</p></div>;
}

function Settings() {
  return <div className="screen"><h2>⚙️ Settings Screen</h2><p>Ajustes y configuraciones.</p></div>;
}

const screens = {
  home: <Home />,
  profile: <Profile />,
  settings: <Settings />,
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");

  return (
    <div className="app-container">
      <nav className="menu">
        {Object.keys(screens).map((screenKey) => (
          <button
            key={screenKey}
            className={`menu-button ${activeScreen === screenKey ? "active" : ""}`}
            onClick={() => setActiveScreen(screenKey)}
          >
            {screenKey.charAt(0).toUpperCase() + screenKey.slice(1)}
          </button>
        ))}
      </nav>

      <main className="screen-container">
        {screens[activeScreen]}
      </main>
    </div>
  );
}
