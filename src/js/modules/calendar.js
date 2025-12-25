const countdownElement = document.querySelector(".new-year-countdown");

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

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
