class Countdown {
  constructor(el, TIME_LIMIT) {
    this.el = el
    this.elId = this.el.getAttribute("id")
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
        color: "green",
      },
      warning: {
        color: "orange",
        threshold: this.WARNING_THRESHOLD,
      },
      alert: {
        color: "red",
        threshold: this.ALERT_THRESHOLD,
      },
    }
    this.remainingPathColor = this.COLOR_CODES.info.color

    this.el.innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${this.remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${this.formatTime()}</span>
    </div>
    `
  }

  // Format timeLeft
  formatTime() {
    const minutes = Math.floor(this.timeLeft / 60)
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
      this.timeLeft = this.TIME_LIMIT - this.timePassed
      this.el
        .querySelector(".base-timer")
        .querySelector("#base-timer-label").innerHTML = this.formatTime()
      this.setCircleDasharray()
      this.setRemainingPathColor()

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
    new Countdown(this.el, this.TIME_LIMIT)
  }

  // Calculate Fraction
  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction)
  }

  // Set remaining path color
  setRemainingPathColor() {
    let el = this.el
      .querySelector(".base-timer")
      .querySelector("svg")
      .querySelector("g")
      .querySelector("path")
    const { alert, warning, info } = this.COLOR_CODES
    if (this.timeLeft <= 0) {
      el.classList.remove(alert.color)
      el.classList.add("grey")
    } else if (this.timeLeft <= alert.threshold) {
      el.classList.remove(warning.color)
      el.classList.add(alert.color)
    } else if (this.timeLeft <= warning.threshold) {
      el.classList.remove(info.color)
      el.classList.add(warning.color)
    }
  }

  // Set remaining path circle
  setCircleDasharray() {
    let el = this.el
      .querySelector(".base-timer")
      .querySelector("svg")
      .querySelector("g")
      .querySelector("path")
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`
    el.setAttribute("stroke-dasharray", circleDasharray)
  }
}

// Instantiate Countdown
const cd1 = new Countdown(document.getElementById("cd1"), 5 * 60)
const cd2 = new Countdown(document.getElementById("cd2"), 10 * 60)
const cd3 = new Countdown(document.getElementById("cd3"), 20 * 60)
const cd4 = new Countdown(document.getElementById("cd4"), 30 * 60)

// Element
const timestart = document.getElementById("timestart")
const startShow = document.getElementById("startShow")
const timestop = document.getElementById("timestop")
const stopShow = document.getElementById("stopShow")
const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const pauseBtn = document.getElementById("pause")
const continueBtn = document.getElementById("continue")
const clearBtn = document.getElementById("clear")
const resetBtn = document.getElementById("reset")
const cd4el = document.getElementById("cd4")
const cd5el = document.getElementById("cd5")

// Event: Handler
startBtn.addEventListener("click", () => {
  cd1.startTimer()
  cd2.startTimer()
  cd3.startTimer()
  cd4.startTimer()
  cd5.startTimer()
  cd4el.classList.remove("hidden")
  cd5el.classList.remove("hidden")
  startBtn.classList.add("hidden")
  stopBtn.classList.remove("hidden")
  pauseBtn.classList.remove("hidden")

  d = new Date()
  timestart.innerHTML = d
  // startShow.innerHTML = `START: ${Datetime.getFullTime(d)}`
})

stopBtn.addEventListener("click", () => {
  // cd1.pauseTimer()
  // cd2.pauseTimer()
  // cd3.pauseTimer()
  // cd4.pauseTimer()
  cd1.resetTimer()
  cd2.resetTimer()
  cd3.resetTimer()
  cd4.resetTimer()
  cd5.resetTimer()
  cd4el.classList.add("hidden")
  cd5el.classList.add("hidden")
  stopBtn.classList.add("hidden")
  startBtn.classList.remove("hidden")
  pauseBtn.classList.add("hidden")

  d = new Date()
  timestop.innerHTML = d
  // stopShow.innerHTML = `STOP: ${Datetime.getFullTime(d)}`

  // Add new note
  const id =
    Store.getNotes().length == 0
      ? 1
      : parseInt(Store.getNotes()[Store.getNotes().length - 1].id) + 1
  // console.log(id)
  // const text = prompt('What would you like to note ?')
  // const cost = '฿ ' + prompt('How much ?').replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const text = "Please note something!"
  const time = { start: timestart.innerHTML, stop: timestop.innerHTML }
  const cost = 0
  // console.log(cost)

  const note = { id, text, time, cost }

  // Add note to Store
  Store.addNote(note)
  // Add note to UI
  UI.addNoteToList(note)
  // Display total
  UI.displayTotal()
})
pauseBtn.addEventListener("click", () => {
  cd1.pauseTimer()
  cd2.pauseTimer()
  cd3.pauseTimer()
  cd4.pauseTimer()
  cd5.pauseTimer()
  pauseBtn.classList.add("hidden")
  continueBtn.classList.remove("hidden")
})
continueBtn.addEventListener("click", () => {
  cd1.continueTimer()
  cd2.continueTimer()
  cd3.continueTimer()
  cd4.continueTimer()
  cd5.continueTimer()
  continueBtn.classList.add("hidden")
  pauseBtn.classList.remove("hidden")
})
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure ?")) {
    cd1.resetTimer()
    cd2.resetTimer()
    cd3.resetTimer()
    cd4.resetTimer()
    cd5.resetTimer()

    const notes = []
    localStorage.setItem("notes", JSON.stringify(notes))

    // Clear filed
    UI.clearFiled()
  }
})
