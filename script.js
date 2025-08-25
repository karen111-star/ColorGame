const colors = ['Rojo', 'Verde', 'Azul', 'Amarillo', 'Morado', 'Naranja', 'Rosa', 'Cian', 'Gris'];
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


let score = 0;
const colorNameEl = document.getElementById('color-name');
const container = document.getElementById('circle-container');
const scoreEl = document.getElementById('score');

function startGame() {
  container.innerHTML = '';

  const correctColor = colors[Math.floor(Math.random() * colors.length)];
  const wrongColors = colors.filter(c => c !== correctColor);
  const options = [correctColor, ...wrongColors.sort(() => 0.5 - Math.random()).slice(0, 3)];
  const shuffled = options.sort(() => 0.5 - Math.random());

  // Mostrar palabra con color aleatorio (truco visual)
  const randomWrong = wrongColors[Math.floor(Math.random() * wrongColors.length)];
  colorNameEl.textContent = correctColor;
  colorNameEl.style.color = colorValues[randomWrong];

  shuffled.forEach(color => {
    const circle = document.createElement('div');
    circle.classList.add('circle', 'neon');
    circle.style.backgroundColor = colorValues[color];
    circle.style.color = colorValues[color]; // para efecto "currentColor" en CSS

    circle.addEventListener('click', () => {
      if (color === correctColor) {
        score++;
        scoreEl.textContent = `Puntos: ${score}`;
      } else {
        alert('¡Fallaste! Puntuación final: ' + score);
        score = 0;
        scoreEl.textContent = `Puntos: 0`;
      }
      startGame();
    });

    container.appendChild(circle);
  });
}

startGame();
