class Timer {
	constructor(durationInput, startBtn, pauseBtn, callbacks) {
		this.durationInput = durationInput;
		this.startBtn = startBtn;
		this.pauseBtn = pauseBtn;
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
		this.startBtn.addEventListener('click', this.start);
		this.pauseBtn.addEventListener('click', this.pause);
	}

	start = () => {
		if (this.onStart) {
			this.onStart(this.timeLeft);
		}
		this.tick();
		//invoke tick every 1000 ms
		this.intervalId = setInterval(this.tick, 50);
	};

	pause = () => {
		//stops interval function with id
		clearInterval(this.intervalId);
	};

	tick = () => {
		if (this.timeLeft <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		}
		else {
			this.timeLeft = this.timeLeft - 0.05;
			if (this.onTick) {
				this.onTick(this.timeLeft);
			}
		}
	};

	get timeLeft() {
		return parseFloat(this.durationInput.value);
	}

	set timeLeft(time) {
		//fix timer to 2 decimal places
		this.durationInput.value = time.toFixed(2);
	}
}
