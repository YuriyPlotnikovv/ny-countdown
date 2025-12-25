const circleSelector = ".new-year-countdown__progress-ring-circle--front";
const digitSelector = ".new-year-countdown__progress-value-digit";
const textSelector = ".new-year-countdown__progress-value-text";

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
