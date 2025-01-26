document.addEventListener("DOMContentLoaded", function () {
  const circleSelector = ".new-year-countdown__progress-ring-circle--front";
  const digitSelector = ".new-year-countdown__progress-value-digit";
  const textSelector = ".new-year-countdown__progress-value-text";
  const targetTime = new Date("January 1, 2026 00:00:00").getTime();
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  const MS_IN_DAY = 86400000;
  const MS_IN_HOUR = 3600000;
  const MS_IN_MINUTE = 60000;
  const MS_IN_SECOND = 1000;

  const DAY_FORMS = ["день", "дня", "дней"];
  const HOUR_FORMS = ["час", "часа", "часов"];
  const MINUTE_FORMS = ["минута", "минуты", "минут"];
  const SECOND_FORMS = ["секунда", "секунды", "секунд"];

  let countdownInterval;
  const countdownElement = document.querySelector(".new-year-countdown");

  function updateCountdown() {
    const now = Date.now();
    const timeRemaining = targetTime - now;

    if (timeRemaining <= 0) {
      countdownElement.style.display = "none";
      clearInterval(countdownInterval);
    } else {
      const days = Math.floor(timeRemaining / MS_IN_DAY);
      const hours = Math.floor((timeRemaining % MS_IN_DAY) / MS_IN_HOUR);
      const minutes = Math.floor((timeRemaining % MS_IN_HOUR) / MS_IN_MINUTE);
      const seconds = Math.floor((timeRemaining % MS_IN_MINUTE) / MS_IN_SECOND);

      updateRing("daysRing", "daysText", days, 45, getPluralForm(days, DAY_FORMS));
      updateRing("hoursRing", "hoursText", hours, 24, getPluralForm(hours, HOUR_FORMS));
      updateRing("minutesRing", "minutesText", minutes, 60, getPluralForm(minutes, MINUTE_FORMS));
      updateRing("secondsRing", "secondsText", seconds, 60, getPluralForm(seconds, SECOND_FORMS));
    }
  }

  function getPluralForm(number, forms) {
    if (number % 100 >= 11 && number % 100 <= 19) {
      return forms[2];
    }

    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1:
        return forms[0];
      case 2:
      case 3:
      case 4:
        return forms[1];
      default:
        return forms[2];
    }
  }

  function updateRing(ringId, textId, value, maxValue, pluralText) {
    const circle = document.querySelector(`#${ringId}`).querySelector(circleSelector);
    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (value / maxValue) * circumference;

      const digitElement = document.getElementById(textId).querySelector(digitSelector);
      const textElement = document.getElementById(textId).querySelector(textSelector);

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = offset;
      digitElement.innerHTML = value.toString();
      textElement.innerHTML = pluralText;
    }
  }

  function toggleScrollButton() {
    const bodyHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    scrollButton.style.display = windowHeight < bodyHeight ? "block" : "none";
  }

  if (countdownElement) {
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  const scrollButton = document.querySelector(".new-year-countdown__scroll-button");
  if (scrollButton) {
    window.addEventListener("load", toggleScrollButton);
    window.addEventListener("resize", toggleScrollButton);
    scrollButton.addEventListener("click", function () {
      window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
    });
  }

  const audioElement = document.querySelector(".new-year-countdown__audio");
  if (audioElement) {
    const audioButton = document.querySelector(".new-year-countdown__audio-button");
    audioElement.volume = 0.3;

    audioButton.addEventListener("click", function () {
      const icon = audioButton.querySelector(".new-year-countdown__scroll-icon");
      audioElement.muted = !audioElement.muted;

      if (icon.dataset.isPaused === "false") {
        audioElement.pause();
        icon.src = icon.dataset.originalSrc;
        icon.dataset.isPaused = "true";
      } else {
        audioElement.play();
        icon.dataset.originalSrc = icon.src;
        icon.src = "/public/assets/icons/audio-icon.gif";
        icon.dataset.isPaused = "false";
      }
    });
  }

  // Создаем отдельный элемент для названия месяца
  const monthContainer = document.createElement("div");
  monthContainer.classList.add("new-year-countdown__month-container");

  // Создаем элемент календаря
  const calendarElement = document.createElement("div");
  calendarElement.classList.add("new-year-countdown__calendar");

  countdownElement.appendChild(monthContainer);
  countdownElement.appendChild(calendarElement);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  const monthElement = document.createElement("div");
  monthElement.classList.add("new-year-countdown__calendar-month");
  monthElement.textContent = `${months[currentMonth]} ${currentYear}`;
  monthContainer.appendChild(monthElement);

  weekdays.forEach(function (weekday) {
    const weekdayElement = document.createElement("div");
    weekdayElement.classList.add("new-year-countdown__calendar-weekday");
    weekdayElement.textContent = weekday;
    calendarElement.appendChild(weekdayElement);
  });

  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDayElement = document.createElement("div");
    calendarElement.appendChild(emptyDayElement);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("new-year-countdown__calendar-day");
    dayElement.textContent = day.toString();
    if (day < currentDay) {
      dayElement.classList.add("new-year-countdown__calendar-past");
    }
    calendarElement.appendChild(dayElement);
  }
});
