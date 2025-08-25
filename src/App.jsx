import { useEffect, useState } from 'react';
import './App.css';

const colors = [
  'Rojo',
  'Verde',
  'Azul',
  'Amarillo',
  'Morado',
  'Naranja',
  'Rosa',
  'Cian',
  'Gris'
];

const colorValues = {
  Rojo: '#e74c3c',
  Verde: '#2ecc71',
  Azul: '#3498db',
  Amarillo: '#f1c40f',
  Morado: '#9b59b6',
  Naranja: '#e67e22',
  Rosa: '#e91e63',
  Cian: '#00bcd4',
  Gris: '#95a5a6'
};

function App() {
  const [score, setScore] = useState(0);
  const [correctColor, setCorrectColor] = useState('');
  const [options, setOptions] = useState([]);
  const [textColor, setTextColor] = useState('#ffffff');

  const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

  const generateGame = () => {
    const correct = colors[Math.floor(Math.random() * colors.length)];
    const wrongs = colors.filter(c => c !== correct);
    const optionsShuffled = shuffle([correct, ...shuffle(wrongs).slice(0, 3)]);

    const randomWrong = shuffle(wrongs)[0];
    setCorrectColor(correct);
    setOptions(optionsShuffled);
    setTextColor(colorValues[randomWrong]);
  };

  const handleClick = (color) => {
    if (color === correctColor) {
      setScore(prev => prev + 1);
    } else {
      alert('¡Fallaste! Puntuación final: ' + score);
      setScore(0);
    }
    generateGame();
  };

  useEffect(() => {
    generateGame();
  }, []);

  return (
    <div className="App">
      <h2 id="mensaje">¡Presiona el color correcto! ¡A jugar!</h2>
      <h1 id="color-name" style={{ color: textColor }}>{correctColor}</h1>

      <div id="circle-container">
        {options.map((color, i) => (
          <div
            key={i}
            className="circle neon"
            style={{
              backgroundColor: colorValues[color],
              color: colorValues[color],
            }}
            onClick={() => handleClick(color)}
          />
        ))}
      </div>

      <p id="score">Puntos: {score}</p>
      <footer>Hecho con ❤️</footer>
    </div>
  );
}

export default App;
