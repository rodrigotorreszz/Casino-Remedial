import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Games.css";

// Ejemplo de icono completo para que no falle
const IconBack = () => (
  <svg viewBox="0 0 24 24" >
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// (Define los demás íconos igual)

export default function FirstUse() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", minBet: "", maxBet: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", category: "", minBet: "", maxBet: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  async function fetchGames() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://casino-remedial.onrender.com/api/games");
      if (!res.ok) throw new Error("Error cargando juegos");
      const data = await res.json();
      setGames(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function createGame(e) {
    e.preventDefault();
    const { name, category, minBet, maxBet } = form;
    if (!name || !category || !minBet || !maxBet) {
      alert("Completa todos los campos");
      return;
    }
    try {
      const res = await fetch("https://casino-remedial.onrender.com/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          minBet: Number(minBet),
          maxBet: Number(maxBet),
        }),
      });
      if (!res.ok) throw new Error("Error creando juego");
      setForm({ name: "", category: "", minBet: "", maxBet: "" });
      fetchGames();
    } catch (e) {
      alert(e.message);
    }
  }

  async function deleteGame(id) {
    if (!window.confirm("¿Eliminar este juego?")) return;
    try {
      const res = await fetch(`https://casino-remedial.onrender.com/api/games/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando juego");
      fetchGames();
    } catch (e) {
      alert(e.message);
    }
  }

  function startEdit(game) {
    setEditId(game._id);
    setEditForm({
      name: game.name,
      category: game.category,
      minBet: game.minBet.toString(),
      maxBet: game.maxBet.toString(),
    });
  }

  function cancelEdit() {
    setEditId(null);
    setEditForm({ name: "", category: "", minBet: "", maxBet: "" });
  }

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  async function saveEdit(id) {
    const { name, category, minBet, maxBet } = editForm;
    if (!name || !category || !minBet || !maxBet) {
      alert("Completa todos los campos");
      return;
    }
    try {
      const res = await fetch(`https://casino-remedial.onrender.com/api/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          minBet: Number(minBet),
          maxBet: Number(maxBet),
        }),
      });
      if (!res.ok) throw new Error("Error actualizando juego");
      setEditId(null);
      setEditForm({ name: "", category: "", minBet: "", maxBet: "" });
      fetchGames();
    } catch (e) {
      alert(e.message);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="back-button" onClick={handleBack} title="Volver">
        <IconBack />
        Volver
      </button>

      <h1 className="header">
        <IconGame />
        Casino Royale
      </h1>

      {/* Formulario para crear nuevo juego */}
      <form className="game-form" onSubmit={createGame}>
        <div className="input-wrapper">
          <IconName />
          <input
            className="input-field"
            placeholder="Nombre del juego"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="input-wrapper">
          <IconCategory />
          <input
            className="input-field"
            placeholder="Categoría"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        <div className="input-wrapper">
          <IconBet />
          <input
            className="input-field"
            placeholder="Apuesta mínima"
            type="number"
            min={0}
            name="minBet"
            value={form.minBet}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <IconBet />
          <input
            className="input-field"
            placeholder="Apuesta máxima"
            type="number"
            min={0}
            name="maxBet"
            value={form.maxBet}
            onChange={handleChange}
            required
          />
        </div>

        <button className="submit-button" type="submit" title="Agregar juego">
          <IconAdd />
          Agregar Juego
        </button>
      </form>

      {loading && <p className="loading-text">Cargando juegos...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && games.length === 0 && (
        <p className="no-games-text">No hay juegos registrados aún</p>
      )}

      <div className="games-container">
        {games.map((game) =>
          editId === game._id ? (
            <motion.div
              key={game._id}
              className="game-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="input-wrapper">
                <IconName />
                <input
                  className="input-field"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                />
              </div>

              <div className="input-wrapper">
                <IconCategory />
                <input
                  className="input-field"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                />
              </div>

              <div className="input-wrapper">
                <IconBet />
                <input
                  className="input-field"
                  type="number"
                  min={0}
                  name="minBet"
                  value={editForm.minBet}
                  onChange={handleEditChange}
                />
              </div>

              <div className="input-wrapper">
                <IconBet />
                <input
                  className="input-field"
                  type="number"
                  min={0}
                  name="maxBet"
                  value={editForm.maxBet}
                  onChange={handleEditChange}
                />
              </div>

              <div className="edit-actions">
                <button
                  className="submit-button"
                  onClick={() => saveEdit(game._id)}
                  title="Guardar cambios"
                  type="button"
                >
                  Guardar
                </button>
                <button
                  className="back-button"
                  onClick={cancelEdit}
                  title="Cancelar edición"
                  type="button"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={game._id}
              className="game-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="game-name">{game.name}</h3>
              <p className="game-info">Categoría: {game.category}</p>
              <p className="game-info">Apuesta mínima: ${game.minBet}</p>
              <p className="game-info">Apuesta máxima: ${game.maxBet}</p>

              <button
                className="edit-button"
                onClick={() => startEdit(game)}
                title="Editar juego"
              >
                <IconEdit />
              </button>
              <button
                className="delete-button"
                onClick={() => deleteGame(game._id)}
                title="Eliminar juego"
              >
                <IconDelete />
              </button>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
}

