import { useEffect, useState } from 'react';

const colors = [
  'Rojo', 'Verde', 'Azul', 'Amarillo',
  'Morado', 'Naranja', 'Rosa', 'Cian', 'Gris'
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
  const [message, setMessage] = useState(''); // 👈 Nuevo estado para el mensaje

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
      setMessage('');
    } else {
      setMessage('¡Perdiste!');
      setScore(0);
      setTimeout(() => setMessage(''), 2000); // Quitar mensaje después de 2s
    }
    generateGame();
  };

  useEffect(() => {
    generateGame();
  }, []);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(ellipse at top, #0f2027, #322355ff, #1c1650ff);
          color: #ffffff;
          text-align: center;
          padding: 30px 15px;
          min-height: 100vh;
        }

        #mensaje {
          font-size: 1.3em;
          font-weight: 600;
          margin-top: 10px;
          color: #ffffff;
          text-shadow: 0 0 5px #0ff;
        }

      

        #circle-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 25px;
          margin: 30px 0;
        }

        .circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .circle:hover {
          transform: scale(1.05);
        }

        .circle:active {
          transform: scale(0.95);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
        }

        .circle.neon {
          box-shadow: 0 0 9px currentColor, 0 0 15px currentColor, 0 0 15px currentColor;
        }

        #score {
          font-size: 1.3em;
          font-weight: 500;
          background-color: rgba(255, 255, 255, 0.1);
          padding: 10px 20px;
          border-radius: 10px;
          display: inline-block;
          backdrop-filter: blur(3px);
        }

        .lost {
          font-size: 1.4em;
          color: #ff4d4d;
          font-weight: bold;
          margin-top: 20px;
          text-shadow: 0 0 10px red, 0 0 20px red;
        }

        footer {
          font-size: 0.9em;
          opacity: 0.6;
          margin-top: 30px;
        }

        @media (max-width: 500px) {
          .circle {
            width: 70px;
            height: 70px;
          }

          #color-name {
            font-size: 1.8em;
          }

          #mensaje {
            font-size: 1.1em;
          }
        }
      `}</style>

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

        {/* 👇 Mostrar el mensaje si existe */}
        {message && <p className="lost">{message}</p>}

  
      </div>
    </>
  );
}

export default App;
