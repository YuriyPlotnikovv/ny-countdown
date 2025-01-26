<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name=viewport content="width=device-width, initial-scale=1.0">

    <title>New Year countdown</title>
    <meta name="description"
          content="Простой новогодний таймер для тех, кто не хочет считать оставшиеся дни до праздников.">
    <meta name="keywords" content="таймер, обратный отсчет, новый год, праздники, снег, ёлка">

    <link rel="preload" href="/public/fonts/TransformaScript_Trial-Regular.woff2" as="font"
          type="font/woff2" crossorigin="anonymous">

    <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon.ico">
    <link rel="manifest" href="/site.webmanifest" crossorigin="use-credentials">
    <meta name="application-name" content="New Year countdown">

    <link rel="stylesheet" href="/public/css/style.min.css?v=<?= time(); ?>">
    <link rel="stylesheet" href="/public/css/vendor/snow.min.css">
</head>
<body>
<main class="new-year-countdown">
    <img class="new-year-countdown__image" src="/public/assets/main-image.webp" width="618" height="1000"
         alt="Новогодняя ёлка">

    <div class="new-year-countdown__content">
        <h1 class="new-year-countdown__title">До начала праздников осталось:</h1>

        <div class="new-year-countdown__progress-rings">
            <div class="new-year-countdown__progress-ring" id="daysRing">
                <svg width="120" height="120">
                    <circle
                        class="new-year-countdown__progress-ring-circle new-year-countdown__progress-ring-circle--back"
                        r="55" cx="60" cy="60"></circle>
                    <circle
                        class="new-year-countdown__progress-ring-circle new-year-countdown__progress-ring-circle--front"
                        stroke-linecap="round" r="55" cx="60" cy="60"></circle>
                </svg>

                <div class="new-year-countdown__progress-value" id="daysText">
                    <span class="new-year-countdown__progress-value-digit"></span>
                    <span class="new-year-countdown__progress-value-text"></span>
                </div>
            </div>

            <div class="new-year-countdown__progress-ring" id="hoursRing">
                <svg width="120" height="120">
                    <circle
                        class="new-year-countdown__progress-ring-circle new-year-countdown__progress-ring-circle--back"
                        r="55" cx="60" cy="60"></circle>
                    <circle
                        class="new-year-countdown__progress-ring-circle new-year-countdown__progress-ring-circle--front"
                        stroke-linecap="round" r="55" cx="60" cy="60"></circle>
                </svg>

                <div class="new-year-countdown__progress-value" id="hoursText">
                    <span class="new-year-countdown__progress-value-digit"></span>
                    <span class="new-year-countdown__progress-value-text"></span>
                </div>
            </div>

            <div class="new-year-countdown__progress-ring" id="minutesRing">
                <svg width="120" height="120">
                    <circle
                        class="new-year-countdown__progress-ring-circle new-year-countdown__progress-ring-circle--back"
                        r="55" cx="60" cy="60"></circle>
                    <circle
                        class="new-year-countdown__progress-ring-circle new-year-countdown__progress-ring-circle--front"
                        stroke-linecap="round" r="55" cx="60" cy="60"></circle>
                </svg>

                <div class="new-year-countdown__progress-value" id="minutesText">
                    <span class="new-year-countdown__progress-value-digit"></span>
                    <span class="new-year-countdown__progress-value-text"></span>
                </div>
            </div>

            <div class="new-year-countdown__progress-ring" id="secondsRing">
                <svg width="120" height="120">
                    <circle
                        class="new-year-countdown__progress-ring-circle new-year-countdown__progress-ring-circle--back"
                        r="55" cx="60" cy="60"></circle>
                    <circle
                        class="new-year-countdown__progress-ring-circle new-year-countdown__progress-ring-circle--front"
                        stroke-linecap="round" r="55" cx="60" cy="60"></circle>
                </svg>

                <div class="new-year-countdown__progress-value" id="secondsText">
                    <span class="new-year-countdown__progress-value-digit"></span>
                    <span class="new-year-countdown__progress-value-text"></span>
                </div>
            </div>
        </div>

        <div class="new-year-countdown__calendar"></div>

        <audio class="new-year-countdown__audio" loop muted>
            <source src="/public/assets/music.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>

        <button class="new-year-countdown__audio-button" type="button">
            <img class="new-year-countdown__scroll-icon" src="/public/assets/icons/audio-icon-stop.png"
                 data-is-paused="true"
                 data-original-src="/src/audio-icon-stop.png" alt="Иконка звука">
        </button>

        <button class="new-year-countdown__scroll-button" type="button">
            <img class="new-year-countdown__scroll-icon" src="/public/assets/icons/scroll-icon.gif"
                 alt="Иконка скролла">
        </button>
    </div>
</main>

<script src="/public/js/script.min.js?v=<?= time(); ?>"></script>
<script src="/public/js/vendor/snow.js"></script>
<script>
    new Snow();
</script>
</body>
</html>