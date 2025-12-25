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
  const ballInner = document.querySelector('.new-year-countdown__magic-ball-inner');
  const predictionDisplay = document.getElementById('predictionDisplay');
  const predictButton = document.getElementById('predictButton');
  const loading = document.getElementById('loading');

  if (!magicBall || !ballInner || !predictionDisplay || !predictButton || !loading) {
    console.warn('Magic ball elements not found');
    return;
  }

  function getRandomPrediction() {
    const randomIndex = Math.floor(Math.random() * predictions.length);
    return predictions[randomIndex];
  }

  function showPrediction() {
    if (loading.classList.contains('show')) return;

    loading.classList.add('show');
    ballInner.classList.add('thinking');
    predictionDisplay.textContent = '?';

    setTimeout(() => {
      const prediction = getRandomPrediction();

      loading.classList.remove('show');
      ballInner.classList.remove('thinking');
      ballInner.classList.add('reveal');

      predictionDisplay.textContent = prediction;

      setTimeout(() => {
        ballInner.classList.remove('reveal');
      }, 800);

    }, 2000);
  }

  predictButton.addEventListener('click', showPrediction);

  magicBall.addEventListener('click', () => {
    if (!loading.classList.contains('show')) {
      showPrediction();
    }
  });

  magicBall.addEventListener('mouseenter', () => {
    if (!loading.classList.contains('show')) {
      predictionDisplay.style.transform = 'scale(1.1)';
    }
  });

  magicBall.addEventListener('mouseleave', () => {
    predictionDisplay.style.transform = 'scale(1)';
  });
});
