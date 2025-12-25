document.addEventListener("DOMContentLoaded", function () {
  const targetTime = new Date("December 30, 2025 18:00:00").getTime();

  const MS_IN_DAY = 86400000;
  const MS_IN_HOUR = 3600000;
  const MS_IN_MINUTE = 60000;
  const MS_IN_SECOND = 1000;

  const DAY_FORMS = ["день", "дня", "дней"];
  const HOUR_FORMS = ["час", "часа", "часов"];
  const MINUTE_FORMS = ["минута", "минуты", "минут"];
  const SECOND_FORMS = ["секунда", "секунды", "секунд"];

  const countdownElement = document.querySelector(".new-year-countdown");
  let countdownInterval;

  function updateHolidayCountdown() {
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

      updateRing("holidayDaysRing", "holidayDaysText", days, 45, getPluralForm(days, DAY_FORMS));
      updateRing("holidayHoursRing", "holidayHoursText", hours, 24, getPluralForm(hours, HOUR_FORMS));
      updateRing("holidayMinutesRing", "holidayMinutesText", minutes, 60, getPluralForm(minutes, MINUTE_FORMS));
      updateRing("holidaySecondsRing", "holidaySecondsText", seconds, 60, getPluralForm(seconds, SECOND_FORMS));
    }
  }

  if (countdownElement) {
    countdownInterval = setInterval(updateHolidayCountdown, 1000);
    updateHolidayCountdown();
  }
});
