import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  // <-- importar
import "./FirstUse.css";

const suits = [
  { suit: "♦", color: "red" },
  { suit: "♥", color: "red" },
  { suit: "♠", color: "black" },
  { suit: "♣", color: "black" },
];

const values = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateCards = (count) => {
  const cardWidthPercent = 7;
  const cardHeightPercent = 10;
  const positions = [];

  const isOverlapping = (x1, y1, x2, y2) => {
    return positions.some(([px1, py1, px2, py2]) => {
      return !(x2 <= px1 || x1 >= px2 || y2 <= py1 || y1 >= py2);
    });
  };

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let top, left;
    let x1, y1, x2, y2;

    do {
      top = Math.floor(Math.random() * (100 - cardHeightPercent));
      left = Math.floor(Math.random() * (100 - cardWidthPercent));
      x1 = left;
      y1 = top;
      x2 = left + cardWidthPercent;
      y2 = top + cardHeightPercent;
      attempts++;
    } while (isOverlapping(x1, y1, x2, y2) && attempts < 1000);

    positions.push([x1, y1, x2, y2]);
  }

  return positions.map(([x1, y1]) => {
    const value = values[getRandomInt(0, values.length - 1)];
    const suitObj = suits[getRandomInt(0, suits.length - 1)];
    return {
      value,
      suit: suitObj.suit,
      color: suitObj.color,
      top: `${y1}%`,
      left: `${x1}%`,
      width: "70px",
      height: "100px",
      animationDelay: Math.random() * 10 + "s",
      opacity: 0.6 + Math.random() * 0.4,
    };
  });
};

const FirstUse = () => {
  const [showButton, setShowButton] = useState(false);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();  // <-- hook para navegación

  useEffect(() => {
    setCards(generateCards(50));
    const timer = setTimeout(() => setShowButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    navigate("/Games"); // <-- ruta a la página de juegos
  };

  return (
    <div className="firstuse-container">
      <div className="cards-background">
        {cards.map(({ value, suit, color, top, left, width, height, animationDelay, opacity }, index) => (
          <div
            key={index}
            className="card-bg"
            data-suit={suit}
            style={{
              color,
              top,
              left,
              width,
              height,
              animationDelay,
              opacity,
            }}
          >
            <span className="card-value">{value}</span>
          </div>
        ))}
      </div>

      <div className="firstuse-content">
        <motion.h1
          className="casino-title"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Colonial Casino
        </motion.h1>

        <motion.p
          className="casino-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          Enjoy a luxurious online experience where you can play slots, table games,
          and bet like a high roller. Earn rewards, challenge friends, and climb the leaderboard.
        </motion.p>

        {showButton && (
          <motion.button
            className="enter-button"
            whileHover={{ scale: 1.1, backgroundColor: "#ffd700" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}  // <-- usa esta función
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            🎟️ Enter the Casino
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default FirstUse;


