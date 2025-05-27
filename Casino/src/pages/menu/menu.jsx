import React, { useState } from "react";
import "./menu.css";

// Pantalla Games (puedes reemplazar o agregar tu código)
function Games() {
  return (
    <div className="screen">
      <h2>🎮 Games Screen</h2>
      <p>Esta es la pantalla de juegos. Aquí irá tu contenido de juegos.</p>
    </div>
  );
}

// Pantalla Clients (puedes reemplazar o agregar tu código)
function Clients() {
  return (
    <div className="screen">
      <h2>👥 Clients Screen</h2>
      <p>Esta es la pantalla de clientes. Aquí irá tu contenido de clientes.</p>
    </div>
  );
}

const screens = {
  games: <Games />,
  clients: <Clients />,
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState("games");

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

      <main className="screen-container">{screens[activeScreen]}</main>
    </div>
  );
}
