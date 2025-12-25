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

    // Скрываем текст и кнопку, показываем загрузку
    predictionText.style.opacity = '0';
    ballButton.style.opacity = '0';
    ballButton.style.pointerEvents = 'none';
    loadingText.classList.add('show');

    ballInner.classList.add('thinking');

    // Имитируем "размышление"
    setTimeout(() => {
      const prediction = getRandomPrediction();

      // Скрываем загрузку и показываем результат
      loadingText.classList.remove('show');
      ballInner.classList.remove('thinking');
      ballInner.classList.add('reveal');

      predictionText.textContent = prediction;
      predictionText.style.opacity = '1';

      // Убираем анимацию через время
      setTimeout(() => {
        ballInner.classList.remove('reveal');
        isProcessing = false;

        // Показываем кнопку снова через паузу
        setTimeout(() => {
          if (!isProcessing) {
            ballButton.style.opacity = '1';
            ballButton.style.pointerEvents = 'auto';
          }
        }, 1000);

      }, 800);

    }, 2000);
  }

  // Обработчики событий
  ballButton.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrediction();
  });

  magicBall.addEventListener('click', showPrediction);

  // Инициализация
  predictionText.style.opacity = '1';
  ballButton.style.opacity = '1';
  loadingText.style.opacity = '0';
});
