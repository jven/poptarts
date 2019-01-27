export class GameClock {
    private timeLeft: number;
    private textController: Phaser.GameObjects.Text;
    private callback: () => void;

    /**
     * Creates a game clock
     *
     * @param time countdown in milleseconds
     */
    constructor(scene: Phaser.Scene,
        x: number,
        y: number,
        totalTime: number,
        callback: () => void) {
        this.timeLeft = totalTime;

        this.textController =
            scene.add.text(x, y, this.timeToDisplayTime(totalTime));
        this.textController.setFontSize(60);

        this.callback = callback;

        scene.time.addEvent({
            startAt: 0,
            delay: 1000,
            callback: this.handleEvent,
            callbackScope: this,
            loop: true
        });
    }

    timeToDisplayTime(n: number) {
        const timeLeftInSeconds = this.timeLeft / 1000;
        const minutes = Math.floor(timeLeftInSeconds / 60);
        const seconds = Math.floor(timeLeftInSeconds) - (60 * minutes);

        let result = (minutes < 10) ? '0' + minutes : '' + minutes;
        result += (seconds < 10) ? ':0' + seconds : ':' + seconds;
        return result;
    }

    handleEvent() {
        if (this.timeLeft < 0) {
            this.callback();
        } else {
            this.textController.setText(this.timeToDisplayTime(this.timeLeft));
            this.timeLeft -= 1000;
        }
    }
}
