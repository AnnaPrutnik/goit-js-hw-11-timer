class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
    this.start();
  }
  getRefs() {
    const container = document.querySelector(this.selector);
    const days = container.querySelector('[data-value="days"]');
    const hours = container.querySelector('[data-value="hours"]');
    const mins = container.querySelector('[data-value="mins"]');
    const secs = container.querySelector('[data-value="secs"]');
    return { container, days, hours, mins, secs };
  }
  updateTimer({ container, days, hours, mins, secs }) {
    const time = this.targetDate - Date.now();
    days.textContent = Math.floor(time / (1000 * 60 * 60 * 24));
    hours.textContent = Math.floor(
      (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, "0");
    mins.textContent = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    secs.textContent = Math.floor((time % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
    if (time < 0) {
      this.stop();
      days.textContent = "00";
      hours.textContent = "00";
      mins.textContent = "00";
      secs.textContent = "00";
    }
  }

  start() {
    this.intervalId = setInterval(() => {
      this.updateTimer(this.getRefs());
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Nov 30, 2021"),
});
