document.addEventListener('DOMContentLoaded', function() {
  const predictions = [
    "Новый год принесёт тебе невероятное счастье! 🎉",
    "Ты встретишь человека, который изменит твою жизнь 💕",
    "Неожиданное приключение ждёт тебя в январе! 🚀",
    "Твоя мечта исполнится раньше, чем ты думаешь ✨",
    "Скоро ты получишь долгожданный подарок! 🎁",
    "Новый год откроет для тебя новые горизонты 🌅",
    "Ты найдёшь то, что потерял много лет назад 🔍",
    "Твоя настойчивость принесёт плоды уже в феврале! 💪",
    "Путешествие изменит твое восприятие мира 🌍",
    "Ты обретёшь внутренний покой и гармонию 🧘‍♀️"
  ];

  const magicBall = document.getElementById('magicBall');
  const ballInner = document.getElementById('ballInner');
  const predictionText = document.getElementById('predictionText');
  const loadingText = document.getElementById('loadingText');
  const ballButton = document.getElementById('ballButton');

  if (!magicBall || !ballInner || !predictionText || !loadingText || !ballButton) {
    console.warn('Magic ball elements not found');
    return;
  }

  let isProcessing = false;

  function getRandomPrediction() {
    const randomIndex = Math.floor(Math.random() * predictions.length);
    return predictions[randomIndex];
  }

  function showPrediction() {
    if (isProcessing) return;

    isProcessing = true;

    ballButton.style.display = 'none';
    predictionText.style.display = 'none';
    loadingText.classList.add('show');
    loadingText.style.display = 'block';

    ballInner.classList.add('thinking');

    setTimeout(() => {
      const prediction = getRandomPrediction();

      loadingText.classList.remove('show');
      loadingText.style.display = 'none';
      ballInner.classList.remove('thinking');
      ballInner.classList.add('reveal');

      predictionText.textContent = prediction;
      predictionText.style.display = 'block';

      setTimeout(() => {
        ballInner.classList.remove('reveal');
        isProcessing = false;

        setTimeout(() => {
          if (!isProcessing) {
            predictionText.style.display = 'none';
            ballButton.style.display = 'block';
          }
        }, 3000);

      }, 800);

    }, 2000);
  }

  ballButton.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrediction();
  });

  magicBall.addEventListener('click', () => {
    if (ballButton.style.display !== 'none') {
      showPrediction();
    }
  });

  predictionText.style.display = 'none';
  loadingText.style.display = 'none';
  ballButton.style.display = 'block';
});
