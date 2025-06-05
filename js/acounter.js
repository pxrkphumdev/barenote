class aCounter {
  constructor(el, TIME_LIMIT) {
    this.el = el
    this.elId = this.el.getAttribute('id')
    this.TIME_LIMIT = TIME_LIMIT
    this.timePassed = 0
    this.timeLeft = this.TIME_LIMIT
    this.rawTimeFraction = 1
    this.play = true

    this.FULL_DASH_ARRAY = 283
    this.WARNING_THRESHOLD = this.TIME_LIMIT * 0.66
    this.ALERT_THRESHOLD = this.TIME_LIMIT * 0.33
    this.COLOR_CODES = {
      info: {
        color: "green"
      },
      warning: {
        color: "orange",
        threshold: this.WARNING_THRESHOLD
      },
      alert: {
        color: "red",
        threshold: this.ALERT_THRESHOLD
      }
    }
    this.remainingPathColor = this.COLOR_CODES.info.color


    this.el.innerHTML = `
    <div class="counter_base-timer">
      <svg class="counter_base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="counter_base-timer__circle">
          <circle class="counter_base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="counter_base-timer__path-remaining ${this.remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="counter_base-timer__label">${this.formatTime()}</span>
    </div>
    `
  }

  // Format timeLeft
  formatTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    let seconds = this.timeLeft % 60

    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  // Start countdown timer
  startTimer() {
    // console.log(el.getAttribute('id'))
    // console.log(this.TIME_LIMIT)
    this.elId = setInterval(() => {
      this.timePassed = this.timePassed += 1
      this.timeLeft = this.timePassed;
      this.el.querySelector(".counter_base-timer").querySelector("#base-timer-label").innerHTML = this.formatTime()
      this.setCircleDasharray()
      this.setRemainingPathColor();

      if (this.timeLeft === 0) {
        clearInterval(this.elId)
        // const audio = new Audio('sound/mixkit-melodical-flute-music-notification-2310.wav')
        // audio.play()
      }

      if (this.timeLeft <= this.ALERT_THRESHOLD && this.play === true) {
        // const audio = new Audio('sound/Beep.mp3')
        // audio.play()
        // this.play = false
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.elId)
  }

  continueTimer() {
    this.startTimer()
  }

  resetTimer() {
    clearInterval(this.elId)
    this.timePassed = 0
    new aCounter(this.el, this.TIME_LIMIT)

  }

  // Calculate Fraction
  calculateTimeFraction() {
    const rawTimeFraction = this.timePassed / this.TIME_LIMIT
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction)
  }

  // Set remaining path color
  setRemainingPathColor() {
    let el = this.el.querySelector(".counter_base-timer").querySelector("svg").querySelector("g").querySelector("path")
    const { alert, warning, info } = this.COLOR_CODES
    if (this.timePassed <= 0) {
      el
        .classList.remove(info.color)
      el
        .classList.add('grey')
    } else if (this.timePassed >= alert.threshold) {
      el
        .classList.remove(alert.color)
      el
        .classList.add(warning.color)
    } else if (this.timePassed >= warning.threshold) {
      el
        .classList.remove(warning.color)
      el
        .classList.add(alert.color);
    }
  }

  // Set remaining path circle
  setCircleDasharray() {
    let el = this.el.querySelector(".counter_base-timer").querySelector("svg").querySelector("g").querySelector("path")
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    el
      .setAttribute("stroke-dasharray", circleDasharray);
  }

}

// Instantiate Counter
const cd5 = new aCounter(document.getElementById('cd5'), 30 * 60)
